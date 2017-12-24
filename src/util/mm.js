/*
* @Author: greeny123
* @Date:   2017-12-20 20:36:57
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-23 22:18:12
*/

'use strict'

var conf = {
	serverHost : ""
};
var Hogan = require('hogan.js');

var _mm = {
	//网络请求
	request : function(param){
		var _this = this;   //引用_mm
		$.ajax({
			type 	 : param.method || 'get',
			url		 : param.url    || '',
			datatype : param.type   || 'json',
			data     : param.data   || '',
			success	 : function(res){
				//请求成功
				if(0 === res.status){
					//如果类型是函数  则调用其回调函数
					typeof param.success === 'function' && param.success(res.data,res.msg);
				}
				//没有登录状态 需要强制登录
				else if( 10 === res.status){
					_this.doLogin();
				}
				//请求数据错误
				else if(1 === res.status){
					typeof param.success === 'function' && param.error(res.msg);
				}
			},
			error	 : function(err){
				typeof param.error === 'function' && param.error(err.statusText);
			}
		});
	},
	
	//统一登录处理  跳转到登录界面 并且需要携带当前url地址，登陆后返回 通过url编码
	doLogin : function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},

	//获取服务器地址
	getServerUrl : function(path){
		return conf.serverHost + path;
	},

	//获取url参数  需要解码处理
	getUrlParam : function(name){
		//使用正则匹配   window.location.search获取到?后面 结果为数组
		var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},

	//渲染HTML模板 参数为模板和数据  步骤为 1.编译+   2.输出
	renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },

    // 成功提示
    successTips : function(msg){
        alert(msg || '操作成功！');
    },
    // 错误提示
    errorTips : function(msg){
        alert(msg || '哪里不对了~');
    },
    // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //返回主页
    goHome : function(){
    	window.location.href = './index.html';
    }
}

module.exports = _mm;