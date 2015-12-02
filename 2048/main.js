var board=new Array();
var score=0;//����
var w=4;
var h=4;
var itemW=100;
var itemH=100;
var itemWj=20;
var itemHj=20;

$(document).ready(function(){
   newGame(); 
});
function newGame(){
    //��ʼ������
    init();
    //��������
    generateOneNumber();
}
function init(){
    for(var i=0;i<w;i++){
        for(var j=0;j<h;j++){
            var gridCell=$('#grid-cell-'+i+'-'+j);
            gridCell.css({'top':getPosTop(i,j),'left':getPosLeft(i,j)});
        }
    }
    for(var i=0;i<w;i++){
        board[i]=new Array();
        for(var j=0;j<h;j++){
            board[i][j]=0;
        }
    }
    updateBoardView();
}
/**ÿ�β�����Ҫ����**/
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
                theNumberCell.css({'background-color':getNumberBackGroundColor(value),'color':getNumberColor(value)});
                theNumberCell.text(value);
            }
        }
    }
}
/**�������һ������**/
function generateOneNumber(){
    if(nospace(board))return false;
    //���һ��λ��
    var randx=parseInt(Math.floor(Math.random()*4));
    var randy=parseInt(Math.floor(Math.random()*4));
    while(true){
        if(board[randx][randy]==0)break;
        randx=parseInt(Math.floor(Math.random()*4));
        randy=parseInt(Math.floor(Math.random()*4));
    }
    //���һ������
    var randNumber=Math.random()<0.5?2:4;
    //�����λ����ʾ�������
    board[randx][randy]=randNumber;
    showNumberWithAnimation(randx,randy,randNumber);
    
    return true;
}
