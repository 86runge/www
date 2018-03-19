//app.js
// var http = require('http');
// http.createServer(function(req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     res.write('<h1>Node.js</h1>');
//     res.end('<p>Hello World</p>');
// }).listen(3000);
// console.log("HTTP server is listening at port 3000.");

var http = require('http');
var server = http.createServer();

// 为request事件绑定处理函数
// 也可以使用server.addListener
server.on('request', function(req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('shiyanlou');
    console.log('shiyanlou');
    res.end();
});

server.listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');