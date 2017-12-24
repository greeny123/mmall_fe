/*
* @Author: greeny123
* @Date:   2017-12-10 22:17:22
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-24 12:51:54
*/
 const path = require('path');

//引入插件 
 var webpack 			= require('webpack');
 var ExtractTextPlugin  = require("extract-text-webpack-plugin");
 var HtmlWebpackPlugin  = require('html-webpack-plugin');

//环境变量配置      dev / online 
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';  //默认dev
console.log(WEBPACK_ENV);

//获取HTML-webpack-plugin参数的方法 封装便于多个文件生成
var getHtmlConfig = function(name,title){
	return {
     		template : './src/view/' + name + '.html',      //模板文件
     		filename : 'view/' + name + '.html',			//生成之后目录
     		title	 : title,
     		inject   : true,
     		hash     : true,
     		chunks   : ['common', name]						//HTML文件需要自动加载引入的文件
     	};
}

//webpack config
 var config = {
     entry: {
     	'common' : ['./src/page/commons/index.js'],        //js脚本的全局设置
     	'index' : ['./src/page/index/index.js'],
    	'login' : ['./src/page/login/index.js'],
    	'result' : ['./src/page/result/index.js']
     },
     output: {
         path: path.resolve('./dist'),
         publicPath : '/dist',              //访问路径 匹配  用于webpack-dev-server访问问题
         filename: 'js/[name].js'
     },
     externals : {      //加载外部 资源模块  模块化开发
     	'jquery' : 'window.jQuery'
     },

     module:{
     	loaders:[
     		//所有以css结尾的文件 选择相应的加载器 【不同的版本 要求格式不一样】
     		{ test: /\.css$/, loader: ExtractTextPlugin.extract({fallbackLoader: 'style-loader', loader: 'css-loader'})},
     		//图片文字加载器  ？？表示后面携带参数    限制100 表示大于100以文件形式显示，小于则以base64码显示 name后面指定目录
     		{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
     		{ test: /\.string$/,  loader: 'html-loader'}
     	]
     },

     //起个别名
     resolve: {
     	alias : {
     		//__dirname 全局变量，存储的是文件所在的文件目录
     		node_modules : __dirname + '/node_modules',
     		util 		 : __dirname + '/src/util',
     		page 		 : __dirname + '/src/page',
     		service 	 : __dirname + '/src/service',
     		image 		 : __dirname + '/src/image',
     	}
     },

     plugins: [
     	//独立通用模块到js/base.js
     	//Webpack提取公共模块 引入此插件 name属性为引入的文件名 filename为输出的文件名
     	//所有的公共模块 导出到base.js文件下
     	new webpack.optimize.CommonsChunkPlugin({
     		name : 'common',
     		filename : 'js/base.js'
     	}),

     	//使用此插件完成把css文件的单独打包  以link形式引入
     	new ExtractTextPlugin("css/[name].css"),

     	//HTML模板的处理   能够自动加载指定的配置
     	new HtmlWebpackPlugin(getHtmlConfig('index','首页')),
     	new HtmlWebpackPlugin(getHtmlConfig('result','操作结果'))
    ]
 };

 if('dev' === WEBPACK_ENV){
 	config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }

 module.exports = config;