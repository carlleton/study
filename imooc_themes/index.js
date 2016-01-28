(function(){
	var config={
		firstTimeout:1*1000,
		timeout:1*1000,
		isChanging:false,
		domLoading:false,
		url:''
	};
	var cssData='';
	$(document).ready(function(){
		resizeIframe();
		$(window).resize(resizeIframe);
		var url=getUrlParam('url');
		$("#iframe1").attr('src',url);
		
		$.ajax({
			url:'index.css',
			success:function(data){
				cssData=data;
				setInterval(function(){
					setIframeCSS();
				},config.timeout);
			}
		});
	});
	/**获取传入参数**/
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	/**计算iframe的宽高**/
	function resizeIframe(){
		var w=$(window).width()-10;
		var h=$(window).height()-10;
		$("#iframe1").attr({'width':w,'height':h});
	}
	//设置iframe中的样式
	function setIframeCSS(){
		var iframe=$(window.frames["iframe1"].document);
		var url=iframe.context.URL;
		if(!config.domLoading){
			iframe.find("#video-box").css("background-color","#ccc");
			iframe.find("#video-box_controlbar").css({"opacity":"1","background-color":"#ccc"});
			iframe.find("#video-box_caption span").css("background-color","#ccc");
			config.domLoading=true;
		}else{
			config.domLoading=false;
		}
		
		if(config.isChanging)return;
		if(url===config.url)return;

		config.domLoading=false;
		config.isChanging=true;
		config.url=url;

		var head=iframe.find("head");
		var body=iframe.find("body");
		var title=iframe.find("title");
		var csstag='<style type="text/css">'+cssData+'</style>';
		//head.html(head.html()+csstag);
		body.append(csstag);
		

		$(document).attr("title",title.text());
		window.history.pushState(null,null,'index.html?url='+url);
		config.isChanging=false;
	}
})();
