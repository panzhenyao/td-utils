var isArray = require('../base/isArray')
var isObject = require('../base/isObject')
var includes = require('../base/includes')

/**
 * @description 数组去重
 * @param {Array} array 数组
 * @param {String} key 以数组对象中的那个属性为key,可不填
 * @returns {Array}
 */
function uniqueArray(array, key) {
	if (!isArray(array)) return []
	var isObjInArray = array.every(function (obj) {
		return isObject(obj)
	})
	if (isObjInArray && key) {
		var obj = {}
		return array.reduce((cur, next) => {
			obj[next[key]] ? '' : (obj[next[key]] = true && cur.push(next))
			return cur
		}, [])
	} else {
		var result = []
		array.forEach(function (value) {
			if (!includes(result, value)) {
				result.push(value)
			}
		})
		return result
	}
}

module.exports = uniqueArray
