/**
 * @description 防抖
 * @param {Function} func 函数
 * @param {Number} wait 间隔 毫秒
 * @param {Boolean} immediate 是否立即执行
 */
function debounce(func, wait, immediate) {
	var timeout, args, context, timestamp, result;

	var later = function () {
		// 据上一次触发时间间隔
		var last = +new Date() - timestamp

		// 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
		if (last < wait && last > 0) {
			timeout = setTimeout(later, wait - last)
		} else {
			timeout = null
			// 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
			if (!immediate) {
				result = func.apply(context, args)
				if (!timeout) context = args = null
			}
		}
	}

	return function (...args) {
		context = this
		timestamp = +new Date()
		var callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

module.exports = debounce