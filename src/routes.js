const express = require('express');
const Router = express.Router;
const Configuration = (require("./data/db").getConnection()).model("Config");
const Measurement = (require("./data/db").getConnection()).model("Measurement");


class MainRouter {
    constructor(app) {
        this.router = Router();
        this.router.post('/settoken', (req, res) => {
            if(req.body.token) {
                Configuration.findByIdAndUpdate('5a943322505b14860e35d91d', {$set: {token: req.body.token}}, (err, result) => {
                    if(result) {
                        res.json({
                            success: true
                        })
                    }
                })
            } else {
                res.json({
                    success: false,
                    message: 'Wrong params'
                })
            }


        });

        this.router.get('/measurements', (req, res) => {
            Measurement.find({}, (err, result) => {
                res.json({
                    success: true,
                    result
                })
            })
        });

        this.router.patch('/changechannelvalue', (req, res) => {
            Configuration.findById('5a943322505b14860e35d91d', (err, result) => {
                if(result) {
                    var request = require('request');
                    var j = request.jar();
                    var cookie = request.cookie(`adamsessionid=${result.token}`);
                    var url = 'http://156.17.114.198/expansion_bit/com_1/ch_0';
                    j.setCookie(cookie, url);
                    request({url: url, jar: j, headers: {Cookie: `adamsessionid=${result.token}`}}, function (error, response, body) {
                        let result = JSON.parse(body);
                        if(Number(result.Val) === 0) {
                            var j = request.jar();
                            var cookie = request.cookie(`adamsessionid=${result.token}`);
                            var url = 'http://156.17.114.198/expansion_bit/com_1/ch_0';
                            j.setCookie(cookie, url);
                            request(
                                {
                                    url: url,
                                    jar: j,
                                    headers: {
                                        Cookie: `adamsessionid=${result.token}`
                                    },
                                    method: 'PATCH',
                                    json: {
                                        Ch:0,
                                        Val:1
                                    }
                                    }, function (error, response, body) {
                                console.log('okok', error, body)
                                    res.json({success: true, result: body})

                            });
                        }
                        console.log(result.Val)

                    });
                }
            })
        })

        this.router.get('/p', (req, res) => {
            const actualPage = '/measurements';
            const queryParams = { value : 683};
            app.render(req, res, actualPage, queryParams);
        });

        this.router.get('*', (req, res) => {
            const handle = app.getRequestHandler();

            return handle(req, res);
        });
    }

    getRouter() {
        return this.router;
    }
}

module.exports = MainRouter;