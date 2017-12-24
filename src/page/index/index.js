/*
* @Author: greeny123
* @Date:   2017-12-10 22:06:30
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-24 00:25:50
*/

"use strict";

//模块化开发方式 引入jQuery模块

var $$ = require('jquery');

//$$('body').html('index hello~~~~~~~');



//公共模块的引用
//  ../上级目录  ./同级目录
require('../module.js'); 
require('./index.css');

require('page/commons/nav/index.js');
require('page/commons/header/index.js');

var navSide = require('page/commons/nav-side/index.js');
navSide.init({
	name : 'user-center'
});



// 测试使用请求工具类
var _mm = require('util/mm.js');
//alert(123);

/* 测试使用请求工具类
_mm.request({
	url: './test.do',
	success: function(res){
		console.log(res);
	},
	error: function(errMsg){
		console.log(errMsg);
	}
});
*/

//获取url参数
//console.log(_mm.getUrlParam('test'));

//HTML渲染模板  固定格式{{}}传递数据
var html = '<div>{{data}}</div>';
var data = {
	data : 1235
};
console.log(_mm.renderHtml(html,data));



