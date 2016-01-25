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
$(document).ready(function(){
	resizeIframe();
	$(window).resize(resizeIframe);
	
	var url=getUrlParam('url');
	$("#iframe1").attr('src',url);
	var cssData='';
	$.ajax({
		url:'index.css',
		success:function(data){
			cssData=data;
			setTimeout(function(){
				setIframeCSS(cssData);
			},5000);
		}
	});
});
function setIframeCSS(data){
	var iframe=$(window.frames["iframe1"].document);
	var body=iframe.find("body");
	var head=iframe.find("head");
	var csstag='<style type="text/css">'+data+'</style>';
	head.html(head.html()+csstag);
	body.attr("class","theme");
}