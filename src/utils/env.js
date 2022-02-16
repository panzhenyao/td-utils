/**
 * @description hasOwnProperty 方法封装
 * @param {Object} obj
 * @param {String} prop
 * @returns {Boolean}
 */
export function hasProp(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}

/**
 * @description 判断对象方法
 * @param {Object} obj
 * @returns {Boolean}
 */
export function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}

/**
 * @description 判断数组方法
 * @param {Object} arr
 * @returns {Boolean}
 */
export function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}

/**
 * @param {any}
 * @returns {Boolean}
 */
export function isUndef(v) {
	return v === undefined || v === null
}

/**
 * @param {any}
 * @returns {Boolean}
 */
export function isDef(v) {
	return v !== undefined && v !== null
}
