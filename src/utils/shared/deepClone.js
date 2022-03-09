var isObject = require('../base/isObject')
var isUndef = require('../base/isUndef')
/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
function deepClone(source) {
	if (!isUndef(source) && !isObject(source)) {
		throw new Error('error arguments', 'deepClone param is not object')
	}
	var targetObj = source.constructor === Array ? [] : {}
	Object.keys(source).forEach((keys) => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}

module.exports = deepClone
