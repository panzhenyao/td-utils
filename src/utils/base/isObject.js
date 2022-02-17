/**
 * @description 判断对象方法
 * @param {Object} obj
 * @returns {Boolean}
 */

function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

module.exports = isObject
