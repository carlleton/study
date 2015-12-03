var board=new Array();
var score=0;//分数
var w=4;
var h=4;
var itemW=100;
var itemH=100;
var itemWj=20;
var itemHj=20;
var move_time=200;
var show_time=50;
var documentWidth = window.screen.availWidth;//屏幕宽度
var pointStart={x:0,y:0};
var pointEnd={x:0,y:0};

var keys={
	left:37,
	up:38,
	right:39,
	down:40
}

$(document).ready(function(){
	newGame();
	$(document).keydown(keydown);
	document.addEventListener('touchstart',function(event){
		pointStart.x=event.touches[0].pageX;
		pointStart.y=event.touches[0].pageY;
	});
	document.addEventListener('touchmove',function(event){
		event.preventDefault();
	});
	document.addEventListener('touchend',function(event){
		pointEnd.x=event.changedTouches[0].pageX;
		pointEnd.y=event.changedTouches[0].pageY;
		var deltax=pointEnd.x-pointStart.x;
		var deltay=pointEnd.y-pointStart.y;
		
		if(Math.abs(deltax)<0.3*documentWidth &&Math.abs(deltay)<0.3*documentWidth)return;
		
		if(Math.abs(deltax)>=Math.abs(deltay)){//x轴
			if(deltax>0){
				if(moveRight())afterMove();
			}else{
				if(moveLeft())afterMove();
			}
		}else{//y轴
			if(deltay>0){
				if(moveDown())afterMove();
			}else{
				if(moveUp())afterMove();
			}
		}
	});
});

function newGame(){
	//初始化棋盘
	init();
	//生成数字
	generateOneNumber();
	generateOneNumber();
}
function init(){
	gridContainerWidth = 0.92 * documentWidth;
	itemW=itemH = 0.18 * documentWidth;
	itemWj=itemHj = 0.04*documentWidth;
	if(documentWidth>=500){
		gridContainerWidth=500;
		itemW=itemH=100;
		itemWj=itemHj=20;
	}
	
	$('#grid-container').css({'width':gridContainerWidth - 2*itemWj,'height':gridContainerWidth - 2*itemHj});
    $('#grid-container').css('padding', itemWj);
    $('#grid-container').css('border-radius',0.02*gridContainerWidth);
	
    $('.grid-cell').css({'width':itemW,'height':itemH,'border-radius':0.02*itemW});
	
	
	
	
	for(var i=0;i<h;i++){
		for(var j=0;j<w;j++){
			var gridCell=$('#grid-cell-'+i+'-'+j);
			gridCell.css({'top':getPosTop(i,j),'left':getPosLeft(i,j)});
		}
	}
	for(var i=0;i<h;i++){
		board[i]=new Array();
		for(var j=0;j<w;j++){
			board[i][j]=0;
		}
	}
	updateBoardView();
	score=0;
}
/**每次操作都要更新**/
function updateBoardView(){
	$('.number-cell').remove();
	for(var i=0;i<w;i++){
		for(var j=0;j<h;j++){
			var value=board[i][j];
			$('#grid-container').append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
			var theNumberCell=$('#number-cell-'+i+'-'+j);
			if(value==0){
				theNumberCell.css({'width':'0px','height':'0px','top':getPosTop(i,j)+itemH/2,'left':getPosLeft(i,j)+itemW/2});
			}else{
				theNumberCell.css({'width':itemW+'px','height':itemH+'px','top':getPosTop(i,j),'left':getPosLeft(i,j)});
				theNumberCell.css({'background-color':getNumberBackgroundColor(value),'color':getNumberColor(value)});
				theNumberCell.text(value);
			}
		}
	}
	$('.number-cell').css('line-height',itemW+'px');
    $('.number-cell').css('font-size',0.6*itemW+'px');
}
/**随机生成一个数字**/
function generateOneNumber(){
	if(nospace(board))return false;
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*w));
	var randy=parseInt(Math.floor(Math.random()*h));
	while(true){
		if(board[randx][randy]==0)break;
		randx=parseInt(Math.floor(Math.random()*w));
		randy=parseInt(Math.floor(Math.random()*h));
	}
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	
	return true;
}

function isGameOver(){
	if(nospace(board)&&nomove(board)){
		gameOver();
	}
}
function gameOver(){
	alert('game over....');
}
/**响应按键**/
function keydown(event){
	switch(event.keyCode){
	case keys.left:
		event.preventDefault();
		if(moveLeft())afterMove();
		break;
	case keys.right:
		event.preventDefault();
		if(moveRight())afterMove();
		break;
	case keys.up:
		event.preventDefault();
		if(moveUp())afterMove();
		break;
	
	case keys.down:
		event.preventDefault();
		if(moveDown())afterMove();
		break;
	default:
		break;
	}
}
function afterMove(){
	setTimeout("generateOneNumber()",210);
	setTimeout("isGameOver()",300);
}
function moveLeft(){
	if(!canMoveLeft(board))return false;
	for(var i=0;i<h;i++){
		var k0=0;
		for(var j=1;j<w;j++){
			if(board[i][j]!=0){
				for(var k=k0;k<j;k++){
					if((board[i][k]==0||board[i][k]==board[i][j])&&noBlockHorizontal(i,k,j,board)){
						var oldval=board[i][k];
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
						if(oldval!=0){
							score+=board[i][k];
							updateScore(score);
							k0=k+1;
						}
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",move_time);
	return true;
}
function moveRight(){
	if(!canMoveRight(board))return false;
	for(var i=0;i<h;i++){
		var k0=w-1;
		for(var j=w-2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=k0;k>j;k--){
					if((board[i][k]==0||board[i][k]==board[i][j])&&noBlockHorizontal(i,j,k,board)){
						var oldval=board[i][k];
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
						if(oldval!=0){
							score+=board[i][k];
							updateScore(score);
							k0=k-1;
						}
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",move_time);
	return true;
}
function moveUp(){
	if(!canMoveUp(board))return false;
	for(var j=0;j<w;j++){
		var k0=0;
		for(var i=1;i<h;i++){
			if(board[i][j]!=0){
				for(var k=k0;k<i;k++){
					if((board[k][j]==0||board[k][j]==board[i][j])&&noBlockVertical(j,k,i,board)){
						var oldval=board[k][j];
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;
						if(oldval!=0){
							score+=board[k][j];
							updateScore(score);
							k0=k+1;
						}
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",move_time);
	return true;
}
function moveDown(){
	if(!canMoveDown(board))return false;
	for(var j=0;j<w;j++){
		var k0=h-1;
		for(var i=h-2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=k0;k>i;k--){
					if((board[k][j]==0||board[k][j]==board[i][j])&&noBlockVertical(j,i,k,board)){
						var oldval=board[k][j];
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;
						if(oldval!=0){
							score+=board[k][j];
							updateScore(score);
							k0=k-1;
						}
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",move_time);
	return true;
}