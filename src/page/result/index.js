/*
* @Author: greeny123
* @Date:   2017-12-24 12:47:04
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-24 13:20:54
*/

require('./index.css');
require('page/commons/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	//获取操作类型  然后相应的显示不同的结果
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	//显示对应的提示元素
	$element.show();
})