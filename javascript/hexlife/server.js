var http = require('http');
var fs = require("fs");
var url = require("url")

http.createServer(function(request, response) {

	var pathname = url.parse(request.url).pathname;
	response.writeHead(200);

	if (pathname == "/") {
		html = fs.readFileSync("index.html", "utf8");
		response.write(html);
	} else if (pathname == "/hexlife.js") {
		script = fs.readFileSync("hexlife.js", "utf8");
		response.write(script);
	}

	response.end();
}).listen(11080);

console.log("Listening on port 11080...")