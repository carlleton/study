/**
 * 读取百度贴吧前多少个帖子，并输出
 */
 
var express=require('express');
var Readbook=require('./readbook');
var readbook=new Readbook();

var books=[
	{"bookname":"终极教师","top":5,"url":"http://tieba.baidu.com/f/good?kw=%E7%BB%88%E6%9E%81%E6%95%99%E5%B8%88&ie=utf-8&cid=2"},
	{"bookname":"极品驸马","top":5,"url":"http://tieba.baidu.com/f/good?kw=%E6%9E%81%E5%93%81%E9%A9%B8%E9%A9%AC&ie=utf-8&cid=1"},
	{"bookname":"校花的贴身高手","top":5,"url":"http://tieba.baidu.com/f/good?kw=鱼人二代&ie=utf-8&cid=4"}
];

 
var app=express();
app.get('/',function(req,res,next){
	//res.writeHead(200,{'Content-Type':'text/plain'});
	readbooks(res,next);
	//res.end('\n');
});
app.listen(3000,function(){
	console.log('app is running at port 3000');
});


function readbooks(res,next){
	var n=books.length;
	for(var i=0;i<n;i++){
		readbook.read(books[i].url,books[i].top,books[i].bookname,res,next);
	}
}
