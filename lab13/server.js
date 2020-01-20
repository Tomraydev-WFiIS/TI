var http = require('http');
var server = http.createServer(function (request, response) {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Hello World");
        response.end();
}).listen(4007, "127.0.0.1");
console.log('Server running at http://127.0.0.1:4007/');
