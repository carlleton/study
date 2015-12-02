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

var keys={
	left:37,
	up:38,
	right:39,
	down:40
}

$(document).ready(function(){
   newGame();
   $(document).keydown(keydown);
});
function newGame(){
	//初始化棋盘
	init();
	//生成数字
	generateOneNumber();
}
function init(){
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
				theNumberCell.css({'width':'0px','height':'0px','top':getPosTop(i,j),'left':getPosLeft(i,j)});
			}else{
				theNumberCell.css({'width':itemW+'px','height':itemH+'px','top':getPosTop(i,j),'left':getPosLeft(i,j)});
				theNumberCell.css({'background-color':getNumberBackgroundColor(value),'color':getNumberColor(value)});
				theNumberCell.text(value);
			}
		}
	}
}
/**随机生成一个数字**/
function generateOneNumber(){
	if(nospace(board))return false;
	//随机一个位置
	var randx=parseInt(Math.floor(Math.random()*4));
	var randy=parseInt(Math.floor(Math.random()*4));
	while(true){
		if(board[randx][randy]==0)break;
		randx=parseInt(Math.floor(Math.random()*4));
		randy=parseInt(Math.floor(Math.random()*4));
	}
	//随机一个数字
	var randNumber=Math.random()<0.5?2:4;
	//在随机位置显示随机数字
	board[randx][randy]=randNumber;
	showNumberWithAnimation(randx,randy,randNumber);
	
	return true;
}

function isGameOver(){
	
}
/**响应按键**/
function keydown(event){
	switch(event.keyCode){
	case keys.left:
		if(moveLeft()){
			generateOneNumber();
			isGameOver();
		}
		break;
	case keys.right:
		if(moveRight()){
			generateOneNumber();
			isGameOver();
		}
		break;
	case keys.up:
		if(moveUp()){
			generateOneNumber();
			isGameOver();
		}
		break;
	
	case keys.down:
		if(moveDown()){
			generateOneNumber();
			isGameOver();
		}
		break;
	default:
		break;
	}
}
function moveLeft(){
	if(!canMoveLeft(board))return false;
	for(var i=0;i<h;i++){
		for(var j=1;j<w;j++){
			if(board[i][j]!=0){
				for(var k=0;k<j;k++){
					if((board[i][k]==0||board[i][k]==board[i][j])&&noBlockHorizontal(i,k,j,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
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
		for(var j=w-2;j>=0;j--){
			if(board[i][j]!=0){
				for(var k=w-1;k>j;k--){
					if((board[i][k]==0||board[i][k]==board[i][j])&&noBlockHorizontal(i,j,k,board)){
						showMoveAnimation(i,j,i,k);
						board[i][k]=board[i][k]+board[i][j];
						board[i][j]=0;
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
		for(var i=1;i<h;i++){
			if(board[i][j]!=0){
				for(var k=0;k<i;k++){
					if((board[k][j]==0||board[k][j]==board[i][j])&&noBlockVertical(j,k,i,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;
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
		for(var i=h-2;i>=0;i--){
			if(board[i][j]!=0){
				for(var k=h-1;k>i;k--){
					if((board[k][j]==0||board[k][j]==board[i][j])&&noBlockVertical(j,i,k,board)){
						showMoveAnimation(i,j,k,j);
						board[k][j]=board[k][j]+board[i][j];
						board[i][j]=0;
					}
				}
			}
		}
	}
	setTimeout("updateBoardView()",move_time);
	return true;
}