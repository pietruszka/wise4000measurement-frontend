const express = require("express");
const config = require("./data/config");
const Middleware = require("./middleware");
const Routes = require("./routes");
const Configuration = (require("./data/db").getConnection()).model("Config");
const Measurement = (require("./data/db").getConnection()).model("Measurement");


class Application {
    constructor(app) {
        this.app = express();
        this.app.use(new Middleware().getRouter());
        this.app.use(new Routes(app).getRouter());
        this.server = this.app.listen(config.PORT, () => {
            console.log('Server started.');
        });
    }
    getServerInstance() {
        return this.server;
    }
}

setInterval(() => {
    if(true) {
        Configuration.findById('5a943322505b14860e35d91d', (err, result) => {
            if(result) {
                var request = require('request');
                var j = request.jar();
                var cookie = request.cookie(`adamsessionid=${result.token}`);
                var url = 'http://156.17.114.198/expansion_word/com_1';
                j.setCookie(cookie, url);
                request({url: url, jar: j, headers: {Cookie: `adamsessionid=${result.token}`}}, function (error, response, body) {
                    let result = JSON.parse(body).ExpWord.filter(e => {
                        return e.Addr !== 0 && e.Ch === 0;
                    });
                    result.map(e => {
                        return new Promise((resolve, reject) => {
                            new Measurement({
                                ch: e.Ch,
                                val: e.Val
                            }).save((err, result) => {
                                resolve(true)
                            })

                        })
                    })

                    Promise.all(result);
                });
            }
        })
        // var request = require('request');
        // var j = request.jar();
        // var cookie = request.cookie('adamsessionid=517BC627BA2');
        // var url = 'http://156.17.114.198/expansion_word/com_1';
        // j.setCookie(cookie, url);
        // request({url: url, jar: j, headers: {Cookie: "adamsessionid=517BC627BA2"}}, function (error, response, body) {
        //     var cookie_string = j.getCookieString(url); // "key1=value1; key2=value2; ..."
        //     var cookies = j.getCookies(url);
        //     console.log('error:', error, cookie_string, cookies); // Print the error if one occurred
        //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        //     console.log('body:', body); // Print the HTML for the Google homepage.
        // });
    }
}, 2000);

module.exports = Application;
