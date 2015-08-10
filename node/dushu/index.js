/**
 * 读取百度贴吧前多少个帖子，并输出
 */
 
 var eventproxy=require('eventproxy');
var http=require('http');
var url=require('url');
var Readbook=require('./readbook');
var readbook=new Readbook();

var books=[
	/*{"bookname":"终极教师","top":5,"url":"http://tieba.baidu.com/f/good?kw=%E7%BB%88%E6%9E%81%E6%95%99%E5%B8%88&ie=utf-8&cid=2"},*/
	{"bookname":"终极教师","top":5,"url":"http://tieba.baidu.com/novel/home?forum_name=%E7%BB%88%E6%9E%81%E6%95%99%E5%B8%88&ie=utf-8&forum_id=11650858&ie=utf-8"},
	{"bookname":"极品驸马","top":5,"url":"http://tieba.baidu.com/f/good?kw=%E6%9E%81%E5%93%81%E9%A9%B8%E9%A9%AC&ie=utf-8&cid=1"},
	{"bookname":"校花的贴身高手","top":5,"url":"http://tieba.baidu.com/f/good?kw=鱼人二代&ie=utf-8"}
	
];

 
http.createServer(function(request,res){
	var pathname=url.parse(request.url).pathname;
	if(pathname=='/favicon.ico')return;
	res.writeHead(200,{'Content-Type':'text/html'});
	res.write("<!doctype html>");
	res.write('<html><head><meta charset="utf-8" /><title>readbook</title><body>');
	readbooks(res);
	//res.end();
}).listen(3000);
console.log('app is running at port 3000');


function readbooks(res){
	var n=books.length;
	var ep=new eventproxy();
	ep.after("readed",n,function(names){
		res.end('</body></html>');
	});
	for(var i=0;i<n;i++){
		readbook.read(books[i].url,books[i].top,books[i].bookname,res,ep);
	}
}
