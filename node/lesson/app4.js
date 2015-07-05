var eventproxy=require('eventproxy');
var superagent=require('superagent');
var cheerio=require('cheerio');
//url 模块是Node.js标准库里面的
//http://nodejs.org/api/url.html
var url=require('url');

var cnodeUrl='https://cnodejs.org/';

superagent.get(cnodeUrl).end(function(err,res){
	if(err){
		return console.error(err);
	}
	var topicUrls=[];
	var $=cheerio.load(res.text);
	//获取首页所有的链接
	$('#topic_list .topic_title').each(function(idx,element){
		var $element=$(element);
		var href=url.resolve(cnodeUrl,$element.attr('href'));
		topicUrls.push(href);
	});
	makeTopicUrls(topicUrls);
});
function makeTopicUrls(topicUrls){
	var ep=new eventproxy();
	var cout=0;
	ep.after('topic_html',topicUrls.length-10,function(topics){
		topics=topics.map(function(topicPair){
			var topicUrl=topicPair[0];
			var topicHtml=topicPair[1];
			var $=cheerio.load(topicHtml);
			return ({
				title:$('.topic_full_title').text().html,
				href:topicUrl,
				comment1:$('.reply_content').eq(0).text().trim()
			});
		});
		console.log('final:');
		console.log(topics);
	});
	function checkerr(topicUrl){
		superagent.get(topicUrl).end(function(err,res){
			if(err){
				console.log(err.status);
				checkerr(topicUrl);
				return err;
			};
			cout++;
			console.log('fetch '+topicUrl+' successful,cout:'+cout);
			ep.emit('topic_html',[topicUrl,res.text]);
		});
	}
	console.log('topicUrls.length:'+topicUrls.length);
	topicUrls.forEach(function(topicUrl){
		topicUrl=topicUrl+'#'+cout;
		superagent.get(topicUrl)
			.end(function(err,res){
				if(err){
					cout++;
					console.log(err.status+',cout:'+cout);
					ep.emit('topic_html',[topicUrl,res.text]);
					return err;
				};
				cout++;
				console.log('fetch '+topicUrl+' successful,cout:'+cout);
				ep.emit('topic_html',[topicUrl,res.text]);
			});
	});
}