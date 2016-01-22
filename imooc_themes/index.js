
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return unescape(r[2]); return null;
}
function resizeIframe(){
	var w=$(window).width();
	var h=$(window).height();
	$("#iframe").attr({'width':w,'height':h});
}
$(document).ready(function(){
	resizeIframe();
	$(window).resize(resizeIframe);
	
	var url=getUrlParam('url');
	$("#iframe").attr('src',url);
	var cssData='';
	$.ajax({
		url:'index.css',
		success:function(data){
			cssData=data;
			setIframeCSS(cssData);
		}
	});
});
function setIframeCSS(data){
	var body=$("#iframe").contents().find("body");
	var head=$("#iframe").contents().find("head");
	var csstag='<style type="text/css">'+data+'</style>';
	head.html(head.html()+csstag);
	body.attr("css","theme");
}