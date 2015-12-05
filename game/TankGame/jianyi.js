function Hero(x,y,direct){
	this.x=x;
	this.y=y;
	this.direct=direct;//方向0上1右2下3左
	this.step=15;
	this.backColor='#ded284';
	this.barrelColor='#fef265';
	
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