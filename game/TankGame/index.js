//画布
var myCanvas=document.getElementById('myCanvas');
//画笔
var cxt=myCanvas.getContext('2d');
var hero=null;

function main(){
	init();
}
function init(){
	hero=new Hero(30,30,0);
	draw();
}
function keydown(event){console.log('keycode:'+event.keyCode);
	switch(event.keyCode){
	case keys.left:
	case keys.a:
		hero.moveLeft();
		break;
	case keys.right:
	case keys.d:
		hero.moveRight();
		break;
	case keys.up:
	case keys.w:
		hero.moveUp();
		break;
	case keys.down:
	case keys.s:
		hero.moveDown();
		break;
	case keys.back:
	case keys.q:
		break;
	}
	draw();
}
function draw(){
	cxt.clearRect(0,0,400,300);
	drawTank(hero);
}
function drawTank(tank){
	switch(tank.direct){
	case 0:
	case 2:
		cxt.fillStyle=tank.backColor;
		//左边的矩形
		cxt.fillRect(tank.x,tank.y,5,30);
		//右边的矩形
		cxt.fillRect(tank.x+15,tank.y,5,30);
		//画出中间的矩形
		cxt.fillRect(tank.x+6,tank.y+5,8,20);
		//画出坦克的盖子
		cxt.fillStyle=tank.barrelColor;
		cxt.arc(tank.x+10,tank.y+15,4,0,2*Math.PI,true);
		cxt.fill();
		//画出坦克的炮筒
		cxt.strokeStyle=tank.barrelColor;
		cxt.lineWidth=1.5;
		cxt.beginPath();
		cxt.moveTo(tank.x+10,tank.y+15);
		if(tank.direct==0){
			cxt.lineTo(tank.x+10,tank.y);
		}else{
			cxt.lineTo(tank.x+10,tank.y+30);
		}
		cxt.closePath();
		cxt.stroke();
		break;
	case 1:
	case 3:
		cxt.fillStyle=tank.backColor;
		//左边的矩形
		cxt.fillRect(tank.x,tank.y,30,5);
		//右边的矩形
		cxt.fillRect(tank.x,tank.y+15,30,5);
		//画出中间的矩形
		cxt.fillRect(tank.x+5,tank.y+6,20,8);
		//画出坦克的盖子
		cxt.fillStyle=tank.barrelColor;
		cxt.arc(tank.x+15,tank.y+10,4,0,2*Math.PI,true);
		cxt.fill();
		//画出坦克的炮筒
		cxt.strokeStyle=tank.barrelColor;
		cxt.lineWidth=1.5;
		cxt.beginPath();
		cxt.moveTo(tank.x+15,tank.y+10);
		if(tank.direct==1){
			cxt.lineTo(tank.x+30,tank.y+10);
		}else{
			cxt.lineTo(tank.x,tank.y+10);
		}
		cxt.closePath();
		cxt.stroke();
		break;
	}
	
}

