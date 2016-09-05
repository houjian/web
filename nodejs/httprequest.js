var http = require('http');

var options = {
    host: 'www.baidu.com',
    path: '/s?wd=nodejs',
    method: 'GET'
};

var req = http.request(options, function(res) {
    res.setEncoding('utf-8');
    res.on('data', function(data) {
        console.log(data);
    });
});

req.write('');
req.end();
