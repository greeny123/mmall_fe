/*
* @Author: greeny123
* @Date:   2017-12-23 18:39:42
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-23 19:56:12
*/

require('./index.css');
var _mm   = require('util/mm.js');


/*通用页面头部*/
var header = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	//初始化加载
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//如果keyword存在 则回填输入框
		if(keyword){
			$('.search-input').val(keyword);
		};
	},
	//绑定事件
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮后 做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后 做搜索提交  keyup表示键盘放开触发
		$('#search-input').keyup(function(e){
			//13是回车键的keycode
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的是时候有key 正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword=' + keyword;
		}else{
			//为空的话 直接返回首页
			_mm.goHome();
		}
	}
};

header.init();