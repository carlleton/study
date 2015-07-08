/**
 * 访问地址http://localhost:8888/a.js,b.js
 */
var fs=require('fs'),
	path=require('path'),
	http=require('http');

var MIME = {
	'.css':'text/css',
	'.js':'application/javascript'
};

function combineFiles(pathnames,callback){
	var output = [];
	
	(function next(i,len){
		if(i<len){
			fs.readFile(pathnames[i],function(err,data){
				if(err){
					callback(err);
				}else{
					output.push(data);
					next(i+1,len);
				}
			});
		}else{
			callback(null,Buffer.concat(output));
		}
	}(0,pathnames.length));
}

function main(argv){
	var text=fs.readFileSync(argv[0],'utf-8');
	var config = JSON.parse(text),
		root = config.root||'.',
		port = config.port||8088;
	
	http.createServer(function(request,response){
		var urlInfo = parseURL(root,request.url);
		console.log(urlInfo);
		combineFiles(urlInfo.pathnames,function(err,data){
			if(err){
				response.writeHead(404);
				response.end(err.message);
			}else{
				response.writeHead(200,{
					'Content-Type':urlInfo.mime
				});
				response.end(data);
			}
		});
	}).listen(port);
}

function parseURL(root,url){
	var base,pathnames,parts;
	
	if(url.indexOf('??')===-1){
		url=url.replace('/','/??');
	}
	
	parts=url.split('??');
	base=parts[0];
	pathnames=parts[1].split(',').map(function(value){
		return path.join(root,base,value);
	});
	
	return {
		mime:MIME[path.extname(pathnames[0])]||'text/plain',
		pathnames:pathnames
	}
}

main(process.argv.slice(2));