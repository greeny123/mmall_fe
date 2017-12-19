/*
* @Author: greeny123
* @Date:   2017-12-10 22:06:30
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-18 22:37:49
*/

"use strict";

//模块化开发方式 引入jQuery模块

var $$ = require('jquery');

$$('body').html('index hello~~~~~~~');
console.log('hello index');


//公共模块的引用
//  ../上级目录  ./同级目录
require('../module.js'); 
require('./index.css');