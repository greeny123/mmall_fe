/*
* @Author: greeny123
* @Date:   2017-12-23 16:07:23
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-23 16:53:53
*/

var _mm = require('util/mm.js');

var _user = {
	// 登出
    logout : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/user/logout.do'),
            method  : 'POST',
            success : resolve,
            error   : reject
        });
    },

	//检查登录状态
	checkLogin : function(resolve,reject){
		_mm.request({
			url    : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success: resolve,
			error  : reject
		});
	}
}

module.exports = _user;
