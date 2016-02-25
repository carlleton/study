require.config({
	paths:{
		jquery:'jquery-1.12.1.min',
		jqueryUI:'http://code.jquery.com/ui/1.10.1/jquery-ui'
	}
});
require(['jquery','Window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert({
			title:"提示",
			content:"welcome!",
			width:300,
			height:150,
			y:50,
			hasCloseBtn:true,
			text4AlertBtn:"OK",
			dragHandle:".window_header",
			skinClassName:"window_skin_a",
			handler4AlertBtn:function(){
				alert('clicked the button');
			},
			handler4CloseBtn:function(){
				alert('close btn');
			},
		}).on("alert",function(){
			alert("alert1");
		}).on("alert",function(){
			alert("alert2");
		}).on("close",function(){
			alert("close");
		});
	});
	$("#b").click(function(){
		new w.Window().confirm({
			title:"系统消息",
			content:"您确定要删除这个文件吗？",
			width:300,
			height:150,
			y:50,
			text4ConfirmBtn:"是",
			text4CancleBtn:"否",
			dragHandle:".window_header"
		}).on("confirm",function(){
			alert("确定");
		}).on("cancle",function(){
			alert("取消");
		});
	});
	$("#c").click(function(){
		
	});
});