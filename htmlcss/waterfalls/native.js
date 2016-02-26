window.onload=function(){
	waterfall('main','box');
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