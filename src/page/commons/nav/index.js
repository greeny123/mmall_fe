/*
* @Author: greeny123
* @Date:   2017-12-23 14:57:52
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-23 16:47:27
*/

require('./index.css');
var _mm   = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');

/*通用导航开发*/
var nav = {
	init : function(){
		this.bindEvent();
		this.loadUserInfo();
		this.loadCartCount();
		return this;   //加载时就初始化
	},
	//绑定事件
	bindEvent : function(){
		//登录点击事件
		$('.js-login').click(function(){
			_mm.doLogin();
		});
		//注册点击事件
		$('.js-register').click(function(){
			window.location.href = './user-register.html';
		});
		//退出点击事件  传递参数为两个函数
		$('.js-logout').click(function(){
			_user.logout(function(res){
				window.location.reload();   //退出成功后 刷新此页面
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	//加载用户信息  通过工具类回调实现调用
	loadUserInfo : function(){
		_user.checkLogin(function(res){
			//显示登录信息模块 并且获得username
			$('.user not-login').hide().siblings('.user.login').show().find('.username').text(res.username);
		},function(errMsg){
			// do nothing
		});
	},
	//加载购物车数量
	loadCartCount : function(){
		_cart.getCartCount(function(res){
			$('.nav cart-count').text(res || 0);
		},function(errMsg){
			$('.nav cart-count').text(0);
		});
	}
};

module.exports = nav.init();