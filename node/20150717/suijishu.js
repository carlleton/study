/**
 * 随机数字生成器（能处理50000个并发用户）
 * study from:http://www.nodejs.net/a/20121226/223902.html
 */
 var http = require("http");
 var url = require("url");
 
 http.createServer(function(request,response){
	 response.writeHead(200,{"Content-Type":"text/plain"});
	 
	 var params = url.parse(request.url,true).query;
	 var input = params.number;
	 
	 var numInput = new Number(input);
	 var numOutput = new Number(Math.random()*numInput).toFixed(0);
	 
	 response.write(numOutput);
	 response.end();
 }).listen(8080);
 console.log("Random Number Generator Runing");