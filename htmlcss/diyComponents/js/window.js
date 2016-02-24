define(['jquery'],function($){
	function Window(){
		this.cfg={
			width:500,
			height:300,
			content:"",
			handler:null
		}
	}
	Window.prototype={
		alert:function(cfg){
			var CFG=$.extend(this.cfg,cfg);
			var boundingBox=$('<div class="window_boundingBox"></div>');
			boundingBox.appendTo("body");
			boundingBox.html(CFG.content);
			var btn = $('<input type="button" value="确定">');
			btn.appendTo(boundingBox);
			btn.click(function(){
				CFG.handler&&CFG.handler();
				boundingBox.remove();
			});
			
			boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+"px",
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+"px",
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+"px"
			});
		},
		confirm:function(){},
		prompt:function(){}
	};
	return {
		Window:Window
	};
});