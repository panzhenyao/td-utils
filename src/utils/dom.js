import { isObject, isArray } from './env.js'

/**
 * @description 清空url 参数
 */
export function clearUrlParam() {
	if (!window) return
	var url = window.location.href
	if (url.indexOf('?') != -1) {
		url = url.replace(/(\?)[^'"]*/, '')
		window.history.pushState({}, 0, url)
	}
}

/**
 * @description 获取Url参数，返回一个对象
 * @returns {Object}
 */
export function getUrlParam() {
	return new Promise((resolve, reject) => {
		if (!document) return {}
		let url = document.location.toString()
		let arrObj = url.split('?')
		let params = Object.create(null)
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

/**
 * @description 文件流下载(接口  axios-> config responseType: 'blob'; fetch-> then(res=> new Blob) )
 * @param {Blob} data 流数据
 * @param {String} fileName 文件名
 * @param {String} filType 文件名后缀
 * @param {String} mimeType 文件 mime
 */
export function downloadFile(data, fileName, filType, mimeType) {
	if (!data || !window || !document) {
		return
	}
	const isIE = !!window.ActiveXObject || 'ActiveXObject' in window
	const MimeType = mimeType || filType
	if (isIE) {
		// ie下载
		const blob = new Blob([data], {
			type: `application/${MimeType};charset=utf-8;`,
		})
		window.navigator.msSaveBlob(blob, `${fileName}.${filType}`)
	} else {
		// 非ie下载
		const URL = window.URL || window.webkitURL || window.moxURL
		const url = URL.createObjectURL(
			new Blob([data], {
				type: `application/${MimeType}`,
			})
		)
		const link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', `${fileName}.${filType}`)
		document.body.appendChild(link)
		link.click()
		URL.revokeObjectURL(link.href)
		document.body.removeChild(link)
	}
}

/**
 * @description 日期格式化
 * @param {String|Date} time 日期
 * @param {String} cFormat 格式化
 * @returns {String}
 */
export function parseTime(time, cFormat) {
	if (arguments.length === 0) return null
	if (isObject(time) || isArray(time)) return null
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
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
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay(),
	}
	const time_str = format.replace(/{([ymdhisa])+}/g, (result, key) => {
		const value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}
