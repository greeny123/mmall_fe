/*
* @Author: greeny123
* @Date:   2017-12-25 20:34:41
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-26 00:32:33
*/
'use strict';
require('./index.css');
require('page/commons/nav-simple/index.js');
var _user   = require('service/user-service.js');
var _mm     = require('util/mm.js');

// 表单里的错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};

// page 逻辑部分
var page = {
	//封装此页面用到的 数据
	data : {
        username    : '',
        question    : '',
        answer      : '',
        token       : ''
    },
    init: function(){
    	this.onLoad();
        this.bindEvent();
    },
    //页面初始化加载的页面
    onLoad : function(){
    	this.loadStepUsername();
    },
    bindEvent : function(){
        var _this = this;
        //输入用户名后下一步按钮的点击
        $('#submit-username').click(function(){
        	var username = $.trim($('#username').val());
        	//用户名存在
        	if(username){
        		_user.getQuestion(username,function(res){
        			//进入下一页面
        			_this.data.username = username;
        			_this.data.question = res;
        			_thia.loadStepQuestion();
        		},function(errMsg){
        			formError.show(errMsg);
        		});
        	}
        	//用户名不存在
        	else{
        		formError.show('请输入用户名');
        	}
        });
        //输入密码提示问题答案中的按钮操作
        $('#submit-question').click(function(){
        	var answer = $.trim($('#answer').val());
        	//密码提示问题答案存在
        	if(answer){
        		//检查密码提示问题答案
        		_user.checkAnswer({
        			username : _this.data.username,
        			question : _this.data.question,
        			answer   : answer
        		}, function(res){
        			//回答正确 返回一个token
        			_this.data.answer = answer;
        			_this.data.token  = res;
        			_this.loadStepPassword();
        		}, function(errMsg){
        			formError.show(errMsg);
        		});
        	}
        	//未输入答案
        	else{
        		formError.show('请输入密码提示问题答案');
        	}
        });
        //输入新密码后的按钮点击
        $('.submit-password').click(function(){
        	var password = $.trim($('#password').val());
        	//密码存在 且长度需要大于6位
        	if(password && password.length >= 6){
        		//检查问题的答案
        		_user.resetPassword({
        			username 	: _this.data.username,
        			passwordNew : password,
        			forgetToken : _this.data.token
        		},function(res){
        			window.location.href = './result.html?type=pass-reset';
        		},function(errMsg){
        			formError.show(errMsg);
        		});
        	}
        	//不存在
        	else{
        		formError.show('请输入不少于6位的密码');
        	}
        });
    },
    //加载输入用户名的一步
    loadStepUsername : function(){
    	$('.step-username').show();
    },
    //加载输入密码提示问题答案的一步
    loadStepQuestion : function(){
    	//清楚错误提示
    	formError.hide();
    	//做容器的切换
    	$('.step-username').hide().siblings('.step-question').show()
    					.find('.question').text(this.data.question);

    },
    //加载输入密码的一步
    loadStepPassword : function(){
    	//清楚错误提示
    	formError.hide();
    	//做容器的切换
    	$('.step-question').hide().siblings('.step-password').show();
    }
   
};
$(function(){
    page.init();
});