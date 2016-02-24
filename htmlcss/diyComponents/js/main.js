require.config({
	paths:{
		jquery:'jquery-1.12.1.min'
	}
});
require(['jquery','Window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert("welcome");
	});
});