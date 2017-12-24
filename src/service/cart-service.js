/*
* @Author: greeny123
* @Date:   2017-12-23 16:33:51
* @Last Modified by:   greeny123
* @Last Modified time: 2017-12-23 16:39:05
*/

var _mm = require('util/mm.js');

var _cart = {

	//获取购物车数量
	getCartCount : function(resolve,reject){
		_mm.request({
			url		: _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error 	: reject
		});
	}
}

module.exports = _cart;