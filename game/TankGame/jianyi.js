/*子弹*/
function Bullet(x,y,direct,speed){
	this.color='';
	this.x=x;
	this.y=y;
	this.direct=direct;
	this.speed=speed;
	this.timer=null;
	this.isLive=false;
	this.run=function(){
		if(this.x<0||this.y<0||this.x>config.allW||this.y>config.allH){
			clearInterval(this.timer);
			this.isLive=false;
			return;
		}
		switch(this.direct){
		case 0:
			this.y-=this.speed;
			break;
		case 1:
			this.x+=this.speed;
			break;
		case 2:
			this.y+=this.speed;
			break;
		case 3:
			this.x-=this.speed;
			break;
		}
	};
}
/*坦克父类*/
function Tank(x,y,direct){
	this.x=x;
	this.y=y;
	this.direct=direct;//方向0上1右2下3左
	this.step=1;
	this.bullet=null;
	this.moveUp=function(){
		this.y-=this.step;
		this.direct=0;
	};
	this.moveRight=function(){
		this.x+=this.step;
		this.direct=1;
	};
	this.moveDown=function(){
		this.y+=this.step;
		this.direct=2;
	};
	this.moveLeft=function(){
		this.x-=this.step;
		this.direct=3;
	};
}
/*自己的坦克*/
function Hero(x,y,direct){
	Tank.call(this,x,y,direct);
	this.backColor='#ded284';
	this.barrelColor='#fef265';
	this.shortEnemy=function(){
		var bulletx=0;
		var bullety=0;
		switch(this.direct){
		case 0:
			bulletx=this.x+9;
			bullety=this.y;
			break;
		case 1:
			bulletx=this.x+30;
			bullety=this.y+9;
			break;
		case 2:
			bulletx=this.x+9;
			bullety=this.y+30;
			break;
		case 3:
			bulletx=this.x;
			bullety=this.y+9;
			break;
		}
		var bullet=new Bullet(bulletx,bullety,this.direct,1);
		bullet.isLive=true;
		bullet.timer=setInterval(function(){
			bullet.run();
		},config.bulletFlashtime);
		this.bullet=bullet;
		bullets.push(this.bullet);
	}
}
Hero.prototype=new Tank();
/*敌人的坦克*/
function EnemyTank(x,y,direct){
	Tank.call(this,x,y,direct);
	this.backColor='#00a284';
	this.barrelColor='#00fefe';
}
EnemyTank.prototype=new Tank();
/*绘制坦克*/
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
/*绘制子弹*/
function drawBullet(bullet){
	cxt.fillStyle='#fef26e';
	cxt.fillRect(bullet.x,bullet.y,2,2);
}