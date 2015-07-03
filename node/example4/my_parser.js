var Parser=require('./parser.js');

var fs = require('fs');
fs.readFile('../example_log.txt',function(err,logData){
	if(err)throw err;
	var text=logData.toString();
	var parser=new Parser();
	console.log(parser.parse(text));
	
});