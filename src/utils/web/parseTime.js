var isArray = require('../base/isArray')
var isObject = require('../base/isObject')

/**
 * @description 日期格式化
 * @param {String|Date} time 日期
 * @param {String} cFormat 格式化
 * @returns {String}
 */
function parseTime(time, cFormat) {
	if (arguments.length === 0) return ''
	if (isObject(time) || isArray(time)) return ''
	var format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	var date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string') {
			if (/^[0-9]+$/.test(time)) {
				// support "1548221490638"
				time = parseInt(time)
			} else {
				// support safari
				// https://stackoverflow.com/questions/4310953/invalid-date-in-safari
				time = time.replace(new RegExp(/-/gm), '/')
			}
		}

		if (typeof time === 'number' && time.toString().length === 10) {
			time = time * 1000
		}
		date = new Date(time)
	}
	var formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	var time_str = format.replace(/{([ymdhisa])+}/g,  function(result, key) {
		var value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}

module.exports = parseTime
