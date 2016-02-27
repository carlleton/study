window.onload=function(){
	waterfall('main','box');
	var dataInt={
		"data":[
			{"src":"0.jpg"},
			{"src":"1.jpg"},
			{"src":"2.jpg"},
			{"src":"3.jpg"},
		]
	};
	window.onscroll=function(){
		if(checkScrollSlide()){
			var parent=document.getElementById('main');
			//将数据块渲染到页面的尾部
			for(var i=0,n=dataInt.data.length;i<n;i++){
				var box=document.createElement('div');
				box.className='box';
				parent.appendChild(box);
				var pic=document.createElement('div');
				pic.className='pic';
				box.appendChild(pic);
				var img=document.createElement('img');
				img.src="images/"+dataInt.data[i].src;
				pic.appendChild(img);
			}
			waterfall('main','box');
		}
	}
}
function waterfall(parent,box){
	var oParent=document.getElementById(parent);
	var boxs=getByClass(oParent,box);

	var boxW=boxs[0].offsetWidth;
	var cols=Math.floor(document.documentElement.clientWidth/boxW);
	oParent.style.cssText='width:'+(boxW*cols)+'px;margin:0 auto;';

	var hBoxs=[];//每一列的高度
	for(var i=0,n=boxs.length;i<n;i++){
		if(i<cols){
			hBoxs.push(boxs[i].offsetHeight);
		}else{
			var minH=Math.min.apply(null,hBoxs);
			var index=getMinhIndex(hBoxs,minH);
			boxs[i].style.position='absolute';
			boxs[i].style.top=minH+'px';
			boxs[i].style.left=boxs[index].offsetLeft+'px';
			hBoxs[index]+=boxs[i].offsetHeight;
		}
	}

}
function getByClass(parent,clsName){
	var boxs=[],
	childs=parent.getElementsByTagName('*');
	for(var i=0,n=childs.length;i<n;i++){
		if(childs[i].className==clsName){
			boxs.push(childs[i]);
		}
	}
	return boxs;
}
function getMinhIndex(arr,val){
	for(var i=0,n=arr.length;i<n;i++){
		if(arr[i]==val)return i;
	}
	return 0;
}
//检测是否具备了加载数据块的条件
function checkScrollSlide(){
	var oParent=document.getElementById('main');
	var boxs=getByClass(oParent,'box');
	var lastBoxH=boxs[boxs.length-1].offsetTop+Math.floor(boxs[boxs.length-1].offsetHeight/2);
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var height=document.documentElement.clientHeight||document.body.clientHeight;
	return lastBoxH<scrollTop+height;
}	
