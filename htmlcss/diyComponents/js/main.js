require.config({
	paths:{
		jquery:'jquery-1.12.1.min'
	}
});
require(['jquery','Window'],function($,w){
	$("#a").click(function(){
		new w.Window().alert({
			title:"提示",
			content:"welcome",
			handler4AlertBtn:function(){
				alert('clicked the button');
			},
			handler4CloseBtn:function(){
				alert('close btn');
			},
			width:300,
			height:150,
			y:50,
			hasCloseBtn:true
		});
	});
});