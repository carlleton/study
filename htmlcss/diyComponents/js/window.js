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
			text4ConfirmBtn:"确定",
			text4CancleBtn:"取消",
			handler4AlertBtn:null,
			handler4CloseBtn:null,
			handler4ConfirmBtn:null,
			handler4CancleBtn:null,
		}
	}
	Window.prototype=$.extend({},new widget.Widget(),{
		renderUI:function(){
			var footerContent="";
			switch(this.cfg.winType){
				case "alert":
					footerContent='<input type="button" value="'+this.cfg.text4AlertBtn+'" class="window_alertBtn">';
					break;
				case "confirm":
					footerContent='<input type="button" value="'+this.cfg.text4ConfirmBtn+'" class="window_confirmBtn"><input type="button" value="'+this.cfg.text4CancleBtn+'" class="window_cancleBtn">';
					break;
			}
			this.boundingBox=$('<div class="window_boundingBox">'+
				'<div class="window_header">'+this.cfg.title+'</div>'+
				'<div class="window_body">'+this.cfg.content+'</div>'+
				'<div class="window_footer">'+footerContent+'</div>'+
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
			}).delegate(".window_confirmBtn","click",function(){
				that.fire("confirm");
				that.destroy();
			}).delegate(".window_cancleBtn","click",function(){
				that.fire("cancle");
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn){
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn){
				this.on("close",this.cfg.handler4CloseBtn);
			}
			if(this.cfg.handler4ConfirmBtn){
				this.on("confirm",this.cfg.handler4ConfirmBtn);
			}
			if(this.cfg.handler4CancleBtn){
				this.on("cancle",this.cfg.handler4CancleBtn);
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
			$.extend(this.cfg,cfg,{winType:"alert"});
			this.render();
			return this;
		},
		confirm:function(cfg){
			$.extend(this.cfg,cfg,{winType:"confirm"});
			this.render();
			return this;
		},
		prompt:function(){}
	});
	return {
		Window:Window
	};
});