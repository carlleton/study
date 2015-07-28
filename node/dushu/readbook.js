var superagent=require('superagent');
var cheerio=require('cheerio');

var Readbook=function(){};

Readbook.prototype.read=function(url,top,bookname,res,ep){
	var _this=this;
	superagent.get(url).end(function(err,sres){
		if(err)return err;
		//sres.text里面存储着网页的html内容，将它传给cheerio.load之后
		//就可以得到一个实现了jquery接口的变量，我们习惯将它命名为'$'，
		//剩下的就用jquery操作了
		var str="";
		str+="<p><h3>"+bookname+"</h3></p>";
		var text=sres.text;
		if(url.indexOf("tieba.baidu.com/f/good")>0){
			str+=_this.check_baidutieba(text,top);
		}
		if(url.indexOf("tieba.baidu.com/novel/")>0){
			str+=_this.check_baidutieba_batou(text,top);
		}
		
		res.write(str);
		ep.emit('readed',bookname);
		console.log('readend:'+bookname);
	});
};
Readbook.prototype.check_baidutieba=function(text,top){//百度贴吧
	var $=cheerio.load(text);
	var lis=$('#thread_list >li');
	
	var str="";
	for(var i=0;i<top;i++){
		var a=$(lis[i]).find(".threadlist_title a")[0];
		if(!a)continue;
		var href=$(a).attr("href");
		if(href.indexOf('/p')==0){
			href=""+href;
		}
		str+='<p><a href="http://tieba.baidu.com'+href+'" target="_blank">'+$(a).text()+'</a></p>';
	}
	return str;
}
Readbook.prototype.check_baidutieba_batou=function(text,top){//百度贴吧——吧头
	var $=cheerio.load(text);
	var lis=$('.novel-list-body >li');
	
	var str="";
	for(var i=0;i<top&&i<lis.length;i++){
		var a=$(lis[i]).find("a")[0];
		if(!a)continue;
		var href=$(a).attr("href");
		if(href.indexOf('/p')==0){
			href=""+href;
		}
		str+='<p><a href="http://tieba.baidu.com'+href+'" target="_blank">'+$(a).text()+'</a></p>';
	}
	return str;
}

module.exports=Readbook;
