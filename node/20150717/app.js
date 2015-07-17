/**
 * 事件模块的学习
 * http://www.nodejs.net/a/20121229/123905.html
 */
var events = require("events");

var emitter = new events.EventEmitter();
emitter.on("myEvent",function(msg){
	console.log(msg);
});
emitter.emit("myEvent","Hello World.");
