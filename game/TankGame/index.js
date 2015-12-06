//画布
var myCanvas=document.getElementById('myCanvas');
//画笔
var cxt=myCanvas.getContext('2d');
var hero=null;
var enemyTanks=new Array();
var bullets=new Array();

function main(){
	init();
}
function init(){
	hero=new Hero(30,30,0);
	for(var i=0,n=enemyNum;i<n;i++){
		var enemyTank=new EnemyTank((i+1)*50,0,2);
		enemyTanks[i]=enemyTank;
	}
	setInterval("draw()",config.flashtime);
}
function draw(){
	cxt.clearRect(0,0,config.allW,config.allH);
	drawTank(hero);
	//敌人的坦克
	for(var i=0,n=enemyTanks.length;i<n;i++){
		drawTank(enemyTanks[i]);
	}
	//if(hero.bullet.isLive)drawBullet(hero.bullet);
	//子弹
	for(var i=0,n=bullets.length;i<n;i++){
		if(bullets[i].isLive){
			drawBullet(bullets[i]);
		}
	}
}
function keydown(event){
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
	case keys.j:
	case keys.enter:
		hero.shortEnemy();
		break;
	case keys.back:
	case keys.q:
		break;
	}
	draw();
}

