var request = require('request');
var axios = require('axios');
var j = request.jar();
var cookie = request.cookie(`adamsessionid=517BC62A909`);
var url = 'http://156.17.114.198/expansion_bit/com_1/ch_0';
j.setCookie(cookie, url);
request({url: url, jar: j, headers: {Cookie: `adamsessionid=517BC62A909`}}, function (error, response, body) {
    let result = JSON.parse(body);
    console.log(body)
    if (Number(result.Val) === 0) {
        axios({
            method: 'patch',
            url,
            data: {
                Val: '1'
            },
            //xsrfCookieName: 'adamsessionid=517BC62A909'

        }).then(obj => console.log(obj))
    }
    console.log(result.Val)

});