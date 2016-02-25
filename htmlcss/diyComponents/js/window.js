define(['widget','jquery','jqueryUI'],function(widget,$,$UI){
	function Window(){
		this.cfg={
			width:500,
			height:300,
			title:"系统消息",
			content:"",
			hasCloseBtn:false,
			hasMask:true,
			isDraggable:true,
			dragHandle:null,
			skinClassName:"",
			text4AlertBtn:"确定",
			handler4AlertBtn:null,
			handler4CloseBtn:null
		}
	}
	Window.prototype=$.extend({},new widget.Widget(),{
		renderUI:function(){
			this.boundingBox=$('<div class="window_boundingBox">'+
				'<div class="window_header">'+this.cfg.title+'</div>'+
				'<div class="window_body">'+this.cfg.content+'</div>'+
				'<div class="window_footer"><input type="button" class="window_alertBtn" value="'+this.cfg.text4AlertBtn+'"></div>'+
				'</div>');
			if(this.cfg.hasMask){//遮罩
				this._mask=$('<div class="window_mask"></div>');
				this._mask.appendTo("body");
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</span>');
			}
			this.boundingBox.appendTo("body");
		},
		bindUI:function(){
			var that=this;
			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire("alert");
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire("close");
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close",this.cfg.handler4CloseBtn);
			}
		},
		syncUI:function(){
			this.boundingBox.css({
				width:this.cfg.width+"px",
				height:this.cfg.height+"px",
				left:(this.cfg.x||(window.innerWidth-this.cfg.width)/2)+"px",
				top:(this.cfg.y||(window.innerHeight-this.cfg.height)/2)+"px"
			});
			if(this.cfg.skinClassName){
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable){
				if(this.cfg.dragHandle){
					this.boundingBox.draggable({handle:this.cfg.dragHandle});
				}else{
					this.boundingBox.draggable();
				}
			}
		},
		destructor:function(){
			this._mask&&this._mask.remove();
		},
		alert:function(cfg){
			$.extend(this.cfg,cfg);
			this.render();
			return this;
		},
		confirm:function(){},
		prompt:function(){}
	});
	return {
		Window:Window
	};
});