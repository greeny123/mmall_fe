/*
* @Author: greeny123
* @Date:   2017-12-26 23:07:53
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-27 00:06:11
*/
'use strict';
require('./index.css');
require('page/commons/nav/index.js');
require('page/commons/header/index.js');
var navSide         = require('page/commons/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    }
};
$(function(){
    page.init();
});