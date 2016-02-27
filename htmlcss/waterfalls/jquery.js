$(window).on('load',function(){
	waterfall();
	var dataInt={
		"data":[
			{"src":"0.jpg"},
			{"src":"1.jpg"},
			{"src":"2.jpg"},
			{"src":"3.jpg"},
		]
	};
	$(window).on('scroll',function(){
		if(checkScrollSlide()){
			$.each(dataInt.data,function(key,elem){
				$('<div class="box"><div class="pic"><img src="images/'+elem.src+'" /></div></div>').appendTo("#main");
			})
			waterfall();
		}
	});
});
function waterfall(){
	var boxs=$("#main>div.box");
	var w=boxs.eq(0).outerWidth();
	var cols=Math.floor($(window).width()/w);
	$("#main").width(w*cols).css('marin','0 auto');
	var hBoxs=[];
	boxs.each(function(index,elem){
		var h=boxs.eq(index).outerHeight();
		if(index<cols){
			hBoxs[index]=h;
		}else{
			var minH=Math.min.apply(null,hBoxs);
			var minIndex=$.inArray(minH,hBoxs);
			$(elem).css({
				'position':'absolute',
				'top':minH+'px',
				'left':minIndex*w+'px'
			});
			hBoxs[minIndex]+=$(elem).outerHeight();
		}
	});
}
function checkScrollSlide(){
	var lastBox=$("#main>div:last");
	var lastBoxDis=lastBox.offset().top+Math.floor(lastBox.outerHeight()/2);
	var scrollTop=$(window).scrollTop();
	var documentH=$(window).height();
	return lastBoxDis<scrollTop+documentH;

}