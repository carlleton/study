var express = require('express');
var router = express.Router();

//中间件
router.use(function timeLog(req,res,next){
    console.log('Time:',Date.now());
    next();
});
//定义网站路由
router.get('/',function(req,res){
    res.send('Birds home page');
});
//定义about页面的路由
router.get('/about',function(req,res){
    res.send('About birds');
});

module.exports = router;