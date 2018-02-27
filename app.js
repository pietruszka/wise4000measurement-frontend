const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev});
const handle = app.getRequestHandler();
const bodyParser = require('body-parser')

const WiseApp = require('./src');

app.prepare()
    .then(() => {
        new WiseApp(app);
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });


// setInterval(() => {
//     if(token.length !== 0) {
//
//         var request = require('request');
//         var j = request.jar();
//         var cookie = request.cookie('adamsessionid=517BC627BA2');
//         var url = 'http://156.17.114.198/expansion_word/com_1';
//         j.setCookie(cookie, url);
//         request({url: url, jar: j, headers: {Cookie: "adamsessionid=517BC627BA2"}}, function (error, response, body) {
//             var cookie_string = j.getCookieString(url); // "key1=value1; key2=value2; ..."
//             var cookies = j.getCookies(url);
//             console.log('error:', error, cookie_string, cookies); // Print the error if one occurred
//             console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
//             console.log('body:', body); // Print the HTML for the Google homepage.
//         });
//     }
// }, 2000);

// app.prepare()
//     .then(() => {
//         const server = express();
//         server.use(bodyParser.json())
//         server.get('/p', (req, res) => {
//             const actualPage = '/measurements';
//             const queryParams = { value : 683};
//             app.render(req, res, actualPage, queryParams);
//         });
//
//         server.post('/settoken', (req, res) => {
//             console.log(req.body)
//             if(req.body.token) {
//                 token = req.body.token;
//             }
//
//             console.log(token)
//             res.send('okk');
//         })
//
//         server.get('*', (req, res) => {
//             return handle(req, res);
//         });
//
//         server.listen(3000, (err) => {
//             console.log('server is running')
//         })
//     })
//     .catch(err => {
//         console.error(err.stack);
//         process.exit(1);
//     });