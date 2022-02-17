/**
 * @description 判断数组方法
 * @param {Object} arr
 * @returns {Boolean}
 */
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}

module.exports = isArray