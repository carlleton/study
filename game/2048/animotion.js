/**显示数字**/
function showNumberWithAnimation(i,j,randNumber){
	var numberCell=$('#number-cell-'+i+'-'+j);
	
	numberCell.css('background-color',getNumberBackgroundColor(randNumber));
	numberCell.css('color',getNumberColor(randNumber));
	numberCell.text(randNumber);
	
	numberCell.animate({
	   width:'100px',
	   height:'100px',
	   top:getPosTop(i,j),
	   left:getPosLeft(i,j)
	},show_time);
}
/**移动数字**/
function showMoveAnimation(fromX,fromY,toX,toY){
	var numberCell=$('#number-cell-'+fromX+'-'+fromY);
	numberCell.animate({
		top:getPosTop(toX,toY),
		left:getPosLeft(toX,toY)
	},move_time);
}