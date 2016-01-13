//使用gulp3.9
//版本号
var version = 'V2.1.1.13';
//输出目录
var outputFolder = 'E:/{version}/project';

//只复制不压缩的文件，以,分隔
var copyFiles = 'js/config.js,*.doc';

var gulp = require('gulp'),					//基础库
	clean = require('gulp-clean'),			//清理
	ignore = require('gulp-ignore'),		//忽略
	jshint = require('gulp-jshint'),		//js检测
	uglify = require('gulp-uglify'),		//压缩混淆js
	minifycss = require('gulp-minify-css'),	//压缩css
	htmlmin = require('gulp-htmlmin'),		//压缩html
	imagemin = require('gulp-imagemin'),	//压缩图片
	pngquant = require('imagemin-pngquant'),//png压缩
	notify = require('gulp-notify');		//命令行提示

var files_js=['js/*.js'];
var files_css=['css/*.css'];
var files_images=['images/*.{png,jpg,gif,ico}'];
var files_html=['*.html'];
var files_copy=[];
outputFolder=outputFolder.replace('{version}',version);
var files=copyFiles.split(',');
for(var i=0,n=files.length,ext;i<n;i++){
	ext=getExt(files[i]);
	if(ext=='js'){
		files_js.push('!'+files[i]);
	}else if(ext=='css'){
		files_css.push('!'+files[i]);
	}else if(ext=='png'||ext=='jpg'||ext=='gif'){
		files_images.push('!'+files[i]);
	}else if(ext=='html'){
		files_html.push('!'+files[i]);
	}
	files_copy.push(files[i]);
}

gulp.task('clean',function(){
	return gulp.src([outputFolder+'/*'],{read: false})
		.pipe(clean({force: true}));
});
gulp.task('check',function(){
	gulp.src('js/*.js')
		.pipe(jshint({
			eqeqeq:true,
			laxbreak:true
		}))
        .pipe(jshint.reporter('default'));
});
gulp.task('minijs',function(){
	gulp.src(files_js)
		.pipe(uglify())
		.pipe(gulp.dest(outputFolder+'/js'));
});
gulp.task('minifycss',function(){
	gulp.src(files_css)
		.pipe(minifycss())
		.pipe(gulp.dest(outputFolder+'/css'));
});
gulp.task('miniimage',function(){
	gulp.src(files_images)
		.pipe(imagemin({
			optimizationLevel: 3,//默认3，取值0~7
			progressive: true,	//默认false，无损压缩jpg
			interlaced: true,	//默认false，隔行扫描gif
			multipass: true, 	//默认false，多次优化svg直到完全优化
			use:[pngquant()]	//使用pngquant深度压缩png图片的imagemin插件
		}))
		.pipe(gulp.dest(outputFolder+'/images'))
		.pipe(notify({ message: 'Images task complete' }));
});
gulp.task('minihtml',function(){
	var options = {
		removeComments: true,//清除HTML注释
		collapseWhitespace: true,//压缩HTML
		 //省略布尔属性的值 <input checked="true"/> ==> <input />
		collapseBooleanAttributes: true,
		 //删除所有空格作属性值 <input id="" /> ==> <input />
		removeEmptyAttributes: true,
		 //删除<script>的type="text/javascript"
		removeScriptTypeAttributes: true,
		 //删除<style>和<link>的type="text/css"
		removeStyleLinkTypeAttributes: true,
		minifyJS: true,//压缩页面JS
		minifyCSS: true//压缩页面CSS
	};
	gulp.src(files_html)
		.pipe(htmlmin(options))
		.pipe(gulp.dest(outputFolder));
});
gulp.task('copy',function(){
	gulp.src(files_copy,{base:'.'})
		.pipe(gulp.dest(outputFolder))
		.pipe(notify({message:'copy...'}));
});
/**总task调用其他的task**/
gulp.task('default',['clean'],function(){
	gulp.start('minijs','minifycss','miniimage','minihtml','copy');
});
/**获取扩展名**/
function getExt(fileName){
	var exts = fileName.split('.');
	if(exts.length>1)return exts[exts.length-1];
	return fileName;
}