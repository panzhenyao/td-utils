var Promise = require('../../vendor/polyfill').default
/**
 * @description 获取Url参数，返回一个对象
 * @returns {Object}
 */
function getUrlParam() {
	return new Promise((resolve, reject) => {
		if (!document) return resolve({})
		var url = document.location.toString()
		var arrObj = url.split('?')
		var params = Object.create(null)
		if (arrObj.length > 1) {
			arrObj = arrObj[1].split('&')
			arrObj.forEach((item) => {
				item = item.split('=')
				params[item[0]] = item[1]
			})
		}
		resolve(params)
	})
}

module.exports = getUrlParam
