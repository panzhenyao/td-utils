var isUndef = require('../base/isUndef')
/**
 * 随机字母字符
 * @param {Number} size 随机字符串长度
 * @return {String}
 */

function randomCharCode(size) {
	if (typeof size === 'number' || isUndef(size)) {
		var _defaultSize = 30
		var _maxSize = size
		var num = _maxSize || _defaultSize
		var str = ''

		// 可以修改长度
		for (var i = 0; i < num; i++) {
			var base = Math.random() < 0.5 ? 65 : 97
			str += String.fromCharCode(base + Math.floor(Math.random() * 26))
		}
		return str
	} else {
		return ''
	}
}

module.exports = randomCharCode
