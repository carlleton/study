define(['jquery'],function($){
	function Window(){}
	Window.prototype={
		alert:function(content){
			var boundingBox=$('<div class="window_boundingBox"></div>');
			boundingBox.appendTo("body");
			boundingBox.html(content);
		},
		confirm:function(){},
		prompt:function(){}
	};
	return {
		Window:Window
	};
});