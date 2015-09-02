var http=require('http');
var fs=require('fs');
var path=require('path');
var mime=require('mime');
var cache={};


//创建HTTP服务器的逻辑
var server=http.createServer(function(request,response){
    var filePath = false;
    if(request.url=='/'){
        filePath='public/index.html';
    }else{
        filePath='public'+request.url;
    }
    var absPath = './'+filePath;
    if(absPath=='./public/favicon.ico')return;
    serverStatic(response,cache,absPath);
    response.end();
});
//启动HTTP服务器
server.listen(3001,function(){
    console.log('Server listening on port 3001.');
});

//用来发送404错误
function send404(response){
    response.writeHead(404,{'Content-Type':'text/plain'});
    response.write('Error 404: resource not found.');
    response.end();
}
//发送文件
function sendFile(response,filePath,fileContents){
    response.writeHead(
        200,
        {"content-type":mime.lookup(path.basename(filePath))}
    );
    response.end(fileContents);
}
//提供静态文件服务
function serverStatic(response,cache,absPath){
    if(cache[absPath]){//检查文件是否缓存在内存中
        sendFile(response,absPath,cache[absPath]);
    }else{
        fs.exists(absPath,function(exists){//检查文件是否存在
            if(exists){
                fs.readFile(absPath,function(err,data){
                    if(err){
                        send404(response);
                    }else{
                        cache[absPath]=data;
                        sendFile(response,absPath,data);
                    }
                });
            }else{
                send404(response);
            }
        });
    }
}