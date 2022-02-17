/**
 * @description hasOwnProperty 方法封装
 * @param {Object} obj
 * @param {String} key
 * @returns {Boolean}
 */
function hasProp(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key)
}

module.exports = hasProp