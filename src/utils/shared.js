import { isArray, isObject } from './env.js'

/**
 * @description 防抖
 * @param {Function} func 函数
 * @param {Number} wait 间隔 毫秒
 * @param {Boolean} immediate 是否立即执行
 */
export function debounce(func, wait, immediate) {
	let timeout, args, context, timestamp, result

	const later = function () {
		// 据上一次触发时间间隔
		const last = +new Date() - timestamp

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
		const callNow = immediate && !timeout
		// 如果延时不存在，重新设定延时
		if (!timeout) timeout = setTimeout(later, wait)
		if (callNow) {
			result = func.apply(context, args)
			context = args = null
		}

		return result
	}
}

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
export function throttle(func, wait, options) {
	let timeout, context, args, result
	let previous = 0
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

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments', 'deepClone')
	}
	const targetObj = source.constructor === Array ? [] : {}
	Object.keys(source).forEach((keys) => {
		if (source[keys] && typeof source[keys] === 'object') {
			targetObj[keys] = deepClone(source[keys])
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}

/**
 * @description 数组去重
 * @param {Array} array 数组
 * @param {String} key 以数组对象中的那个属性为key
 * @returns {Array}
 */
export function uniqueArray(array, key) {
	if (!isArray(array)) return []
	if (array.every((obj) => isObject(obj))) {
		let obj = {}
		return array.reduce((cur, next) => {
			obj[next[key]] ? '' : (obj[next[key]] = true && cur.push(next))
			return cur
		}, [])
	} else {
		return Array.from(new Set(array))
	}
}
