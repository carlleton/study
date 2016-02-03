#### 查看效果：
http-server -p 8888
访问http://localhost:8888/html/app.html
> PS：其实直接访问app.html也可以，watchify直接生成的js文件包含react等内容

##### 监控代码自动生成：
watchify -v -o build/js/app.js js/app.js

study from :
 * https://github.com/mking/react-hn