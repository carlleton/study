var WINDOW_WIDTH=1024;
var WINDOW_HEIGHT=768;
var MARGIN_TOP=60;
var MARGIN_LEFT=30;
var Radius=8;
var canvas=null;
var cxt=null;
//var endTime=new Date(2015,11,7,12,34,56);
var curShowSeconds=0;

var balls=[];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload=main;

function main(){
	WINDOW_WIDTH=document.body.clientWidth;
	WINDOW_HEIGHT=document.body.clientHeight;
	MARGIN_LEFT=Math.round(WINDOW_WIDTH/10);
	MARGIN_TOP=Math.round(WINDOW_HEIGHT/5);
	Radius=Math.round(WINDOW_WIDTH*4/5/108)-1;
	
	
	canvas=document.getElementById("canvas");
	if(!canvas.getContext){
		document.getElementById('canvas').innerText='您的浏览器不支持该Canvas';
		return;
	}
	canvas.width=WINDOW_WIDTH;
	canvas.height=WINDOW_HEIGHT;
	cxt=canvas.getContext('2d');
	
	curShowSeconds=getCurseconds();
	setInterval(function(){
		flashClock();
		flashBalls();
		draw();
	},50);
}
function flashClock(){//刷新时钟，判断是否变化
	var newCurseconds=getCurseconds();
	var nhours=Math.floor(newCurseconds/3600);
	var nminutes=Math.floor((newCurseconds%3600)/60);
	var nseconds=(newCurseconds%3600)%60;
	
	var hours=Math.floor(curShowSeconds/3600);
	var minutes=Math.floor((curShowSeconds%3600)/60);
	var seconds=(curShowSeconds%3600)%60;
	
	if(nseconds!=seconds){
		addBall(MARGIN_LEFT+(15*5+9*2)*(Radius+1),MARGIN_TOP,nseconds%10);
		if(Math.floor(nseconds/10)!=Math.floor(seconds/10)){
			addBall(MARGIN_LEFT+(15*4+9*2)*(Radius+1),MARGIN_TOP,Math.floor(nseconds/10));
		}
		if(nminutes!=minutes){
			addBall(MARGIN_LEFT+(15*3+9*1)*(Radius+1),MARGIN_TOP,Math.floor(nminutes%10));
			if(Math.floor(nminutes/10)!=Math.floor(minutes/10)){
				addBall(MARGIN_LEFT+(15*2+9*1)*(Radius+1),MARGIN_TOP,Math.floor(nminutes/10));
			}
		}
		if(nhours!=hours){
			addBall(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(nhours%10));
			if(Math.floor(nhours/10)!=Math.floor(hours/10)){
				addBall(MARGIN_LEFT,MARGIN_TOP,Math.floor(nhours/10));
			}
		}
		curShowSeconds=newCurseconds;
	}
	//console.log('balls:'+balls.length);
}
function flashBalls(){
	for(var i=0,n=balls.length;i<n;i++){
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		
		if(balls[i].y>=WINDOW_HEIGHT-balls[i].r){
			balls[i].y=WINDOW_HEIGHT-balls[i].r;
			balls[i].vy=-balls[i].vy*0.75;
		}
	}
	var cnt=0;
	for(var i=0,n=balls.length;i<n;i++){
		if(balls[i].x+balls[i].r>0 && balls[i].x-balls[i].r<WINDOW_WIDTH){
			balls[cnt++]=balls[i];
		}
	}
	while(balls.length>cnt){//Math.min(300,cnt)
		balls.pop();
	}
}
function getCurseconds(){//倒计时的总秒数
	var now=new Date();
	var ret=now.getHours()*3600+now.getMinutes()*60+now.getSeconds();
	return ret;
}
function addBall(x,y,num){
	var r=Radius;
	for(var i=0,n=digit[num].length;i<n;i++){
		for(var j=0,m=digit[num][i].length;j<m;j++){
			if(digit[num][i][j]==1){
				var aBall={
					x:x+j*(r+1)*2+(r+1),
					y:y+i*(r+1)*2+(r+1),
					r:r,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				};
				balls.push(aBall);
			}
		}
	}
}
function draw(){
	var hours=Math.floor(curShowSeconds/3600);
	var minutes=Math.floor((curShowSeconds%3600)/60);
	var seconds=(curShowSeconds%3600)%60;
	
	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
	
	drawDigit(MARGIN_LEFT,MARGIN_TOP,parseInt(hours/10));
	drawDigit(MARGIN_LEFT+15*(Radius+1),MARGIN_TOP,parseInt(hours%10));
	drawDigit(MARGIN_LEFT+15*2*(Radius+1),MARGIN_TOP,10);
	drawDigit(MARGIN_LEFT+(15*2+9*1)*(Radius+1),MARGIN_TOP,parseInt(minutes/10));
	drawDigit(MARGIN_LEFT+(15*3+9*1)*(Radius+1),MARGIN_TOP,parseInt(minutes%10));
	drawDigit(MARGIN_LEFT+(15*4+9*1)*(Radius+1),MARGIN_TOP,10);
	drawDigit(MARGIN_LEFT+(15*4+9*2)*(Radius+1),MARGIN_TOP,parseInt(seconds/10));
	drawDigit(MARGIN_LEFT+(15*5+9*2)*(Radius+1),MARGIN_TOP,parseInt(seconds%10));
	
	for(var i=0,n=balls.length;i<n;i++){
		var ball=balls[i];
		cxt.fillStyle=ball.color;
		cxt.beginPath();
		cxt.arc(ball.x,ball.y,ball.r,0,2*Math.PI);
		cxt.closePath();
		cxt.fill();
	}
}
function drawDigit(x,y,num){//数字
	var r=Radius;
	cxt.fillStyle='rgb(0,102,158)';
	for(var i=0,n=digit[num].length;i<n;i++){
		for(var j=0,m=digit[num][i].length;j<m;j++){
			if(digit[num][i][j]==1){
				cxt.beginPath();
				cxt.arc(x+j*(r+1)*2+(r+1),y+i*(r+1)*2+(r+1),r,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}
