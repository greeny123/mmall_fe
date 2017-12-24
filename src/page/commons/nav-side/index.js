/*
* @Author: greeny123
* @Date:   2017-12-23 22:03:14
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-24 00:25:17
*/

require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
	option : {
        name : '',
        navList : [
            {name : 'user-center', desc : '个人中心', href: './user-center.html'},
            {name : 'order-list', desc : '我的订单', href: './order-list.html'},
            {name : 'user-pass-update', desc : '修改密码', href: './user-pass-update.html'},
            {name : 'about', desc : '关于MMall', href: './about.html'}
        ]
    },
	init : function(option){
        // 合并选项
        $.extend(this.option, option);
        this.renderNav();
    },
	//渲染导航菜单
	renderNav : function(){
		//首先计算当前active数据  【根据传入选项匹配设置active】   !!!注意length大小写
		for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;   //设置为true
			}
		};
		//渲染list数据 利用index.string中定义的模板和计算后的active数据 
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		//把HTML放入容器
		$('.nav-side').html(navHtml);
	}
};
module.exports = navSide;