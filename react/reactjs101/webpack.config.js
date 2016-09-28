//这边使用HtmlWebpackPlugin，将bundle好的<script>插入到body。${__dirname}为ES6语法对应到__dirname
const HtmlWebpackPlugin = require('html-webpack-plugin');

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
    template:`${__dirname}/app/index.html`,
    filename:'index.html',
    inject:'body',
});

module.exports = {
    //档案起始点从entry进入，因为是阵列所以也可以是多个档案
    entry:[
        './app/index.js',
    ],
    //output是放入产生出来的结果的相关参数
    output:{
        path:`${__dirname}/dist`,
        filename:'index_bundle.js',
    },
    module:{
        //loaders则是放欲使用的loaders,在这边是使用babel-loader将所有.js（这边用到正则式）
        //相关文档（排除了npm安装的套件位置 node_modules）转译成浏览器可以阅读的 JavaScript。
        //preset 则是使用的 babel 转译规则，这边使用 react、es2015
        loaders:[
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                query:{
                    presets:['es2015','react'],
                },
            }
        ],
    },
    //devServer 则是 webpack-dev-server 设定
    devServer:{
        inline:true,
        port:8080,
    },
    //plugins放置所使用的外挂
    plugins:[HTMLWebpackPluginConfig],
};