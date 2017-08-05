var express = require('express');
var app = express();
var birds = require('./birds');

app.use('/birds',birds);
app.get('/',function(req,res){
    res.send('Hello World!');
});

app.get('/user/:id',(req,res,next)=>{
    if(req.params.id==0)next('route');
    else next();
},(req,res,next)=>{
    res.send('regular');
});
app.get('/user/:id',(req,res,next)=>{
    res.send('special');
})

var admin = express();
admin.on('mount',(parent)=>{
    console.log('Admin Mounted');
    console.log(parent);
})
admin.get('/',(req,res)=>{
    console.log(admin.mountpath);
    res.send('Admin Homepage');
});
app.use('/admin',admin);

var server=app.listen(3000,function(){
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s',host,port);
})