# study-cssSecrets
读css secrets练习demo

### 1、CSS编码技巧
##### 尽量减少代码重复
 * 当某些值相互依赖时，应该把它们的相互关系用代码表达出来。（em,rem）
 * 推荐使用 HSLA 而不是 RGBA 来产生半透明的白色，因为它的字符长度更短，敲起来也更快。这归功于它的重复度更低。
 * 代码以维护 VS. 代码量少
	eg:
		`border-width:10px 10px 10px 0;`
		```
		border-width:10px;
		border-left-width:0;
		```
 * currentColor，颜色变量
 * 继承，inherit
#### 相信你的眼睛，而不是数字
 * 垂直居中时，要稍微向上挪一点
 * 圆形字形看起来比实际尺寸小一些，需要放大一些
 * 字母的形状在顶部和底部往往参差不齐，需要减少顶部和底部的内边距，比如padding值设为.3em .7em
#### 关于响应式网页设计
 * 媒体查询，每个媒体查询都会增加成本。需要把它作为最后的手段
 * 媒体查询的断点不应该由具体的设备来决定，而应该根据设计自身来决定。
 * 减少不必要的媒体查询：
  * 使用百分比长度来取代固定长度。如果实在做不到这一点，也应该使用与视口像个的单位（vw,vh,vmin,vmax）
  * 当需要在较大分辨率下得到固定宽度时，使用max-width而不是width
  * 不要忘记为替换元素（比如img、object、video、iframe等）设置一个max-width，值为100%
  * 背景图片完整平铺，使用`background-size:cover`。——建议剪裁图片，而不是使用缩放
  * 当图片或其他元素，以行列式进行布局时，让视口的宽度来决定列的数量。Flexbox布局或者display:inline-block加上常规的文本这行行为，都可以实现这一点。
#### 合理使用简写
```
background:url(tr.png) no-repeat top right / 2em 2em,
           url(br.png) no-repeat bottom right / 2em 2em,
		   url(bl.png) no-repeat bottom left / 2em 2em;
```
改为
```
background:url(tr.png) top right,
           url(br.png) bottom right,
		   url(bl.png) bottom left;
background-size:2em 2em;
background-repeat:no-repeat;
```
#### 是否应该使用预处理器
 * 如果使用得当，它们在大型项目中可以让代码更加灵活
 * CSS的文件体积和复杂度可能会失控。
 * 调试难度会增加。解决方案：使用SourceMap
 * 预览到代码需要延迟一秒钟
 * 学习成本提高
 * 增加bug的可能性，比如预处理器的bug
 * 可能会滥用预处理器
 * **在引入预处理器的问题上需要冷静决策**

### 2、背景与边框
 * 半透明边框，半透明的边框默认会被背景剪裁掉；需要设置`background-clip:padding-box;`，这样浏览器会用内边距的边沿把背景剪裁掉。
 