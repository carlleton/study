/**
 * 使用 superagent 与 cheerio 完成简单爬虫
 * 当在浏览器中访问 http://localhost:3000/ 时，输出cnode社区首页的所有帖子标题和链接，
 * 以json的形式
 **/

var express=require('express');
var superagent=require('superagent');
var cheerio=require('cheerio');

var app=express();
app.get('/',function(req,res,next){
	superagent.get('https://cnodejs.org').end(function(err,sres){
		if(err)return next(err);
		//sres.text里面存储着网页的html内容，将它传给cheerio.load之后
		//就可以得到一个实现了jquery接口的变量，我们习惯将它命名为'$'，
		//剩下的就用jquery操作了
		var $=cheerio.load(sres.text);
		var items=[];
		$('#topic_list .topic_title').each(function(idx,element){
			var $element=$(element);
			items.push({
				title:$element.attr('title'),
				href:$element.attr('href')
			});
		});
		res.send(items);
	});
});
app.listen(3000,function(){
	console.log('app is running at port 3000');
});