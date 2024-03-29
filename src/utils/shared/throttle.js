/**
 * @description 节流
 * Returns a function, that, when invoked, will only be triggered at most
 * during a given window of time. Normally, the throttled function will r
 * as much as it can, without ever going more than once per `wait` durati
 * but if you'd like to disable the execution on the leading edge, pass
 * `{leading: false}`. To disable execution on the trailing edge, ditto.
 * @param {Function} func  函数
 * @param {Number} wait 间隔 毫秒
 * @param {Object} options 选项
 */
function throttle(func, wait, options) {
	var timeout, context, args, result
	var previous = 0
	if (!options) options = {}

	var later = function () {
		previous = options.leading === false ? 0 : new Date().getTime()
		timeout = null
		result = func.apply(context, args)
		if (!timeout) context = args = null
	}

	var throttled = function () {
		var now = new Date().getTime()
		if (!previous && options.leading === false) previous = now
		var remaining = wait - (now - previous)
		context = this
		args = arguments
		if (remaining <= 0 || remaining > wait) {
			if (timeout) {
				clearTimeout(timeout)
				timeout = null
			}
			previous = now
			result = func.apply(context, args)
			if (!timeout) context = args = null
		} else if (!timeout && options.trailing !== false) {
			timeout = setTimeout(later, remaining)
		}
		return result
	}

	throttled.cancel = function () {
		clearTimeout(timeout)
		previous = 0
		timeout = context = args = null
	}

	return throttled
}

module.exports = throttle