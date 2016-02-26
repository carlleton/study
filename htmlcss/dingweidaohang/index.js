/**
 * jquery实现
 */
/*
$(document).ready(function(){
	//滚动条监听
	$(window).scroll(function(){
		var top = $(document).scrollTop();
		var menu = $("#menu");
		var items = $("#content").find(".item");

		var currentId = "";//当前所在的楼层
		items.each(function(){
			var _this=$(this);
			var itemTop=_this.offset().top;
			if(top>itemTop-200){
				currentId = "#"+_this.attr("id");
			}else{
				return false;
			}
		});
		var currentLink = menu.find(".current");
		if(currentId&&currentLink.attr("href")!=currentId){
			currentLink.removeClass("current");
			menu.find("[href='"+currentId+"']").addClass("current");
		}
	});
});
*/
/**
 * 原生js实现
 */
function getByClassName(obj,cls){
	var elements = obj.getElementsByTagName("*");
	var results=[];
	for(var i=0;i<elements.length;i++){
		if(elements[i].className==cls){
			results.push(elements[i]);
		}
	}
	return results;
}
function hasClass(obj,cls){
	return obj.className.match(new RegExp("(\\s|^)"+cls+"(\\s|$)"));
}
function removeClass(obj,cls){
	if(hasClass(obj,cls)){
		var reg = new RegExp("(\\s|^)"+cls+"(\\s|$)");
		obj.className = obj.className.replace(reg,"");
	}
}
function addClass(obj,cls){
	if(!hasClass(obj,cls)){
		obj.className+=" "+cls;
	}
}

window.onload=function(){
	window.onscroll=function(){
		var top=document.documentElement.scrollTop||document.body.scrollTop;
		var menus = document.getElementById("menu").getElementsByTagName("a");
		var items = getByClassName(document.getElementById("content"),"item");
		var currentId="";
		for(var i=0,n=items.length;i<n;i++){
			var _item=items[i];
			var _itemTop=_item.offsetTop;
			if(top>_itemTop-200){
				currentId=_item.id;
			}else{
				break;
			}
		}

		if(currentId){
			for(var i=0,n=menus.length;i<n;i++){
				var _menu = menus[i];
				var _href=_menu.href.split("#");
				if(_href[_href.length-1]!=currentId){
					removeClass(_menu,"current");
				}else{
					addClass(_menu,"current");
				}
			}
		}
	}
}