# td-utils

td 前端 js 工具库. 该库使用 ES module 和 ES6 特性.请引入后自行 polyfill.

## Install

```bash
npm install td-utils
```

## Usage

```javascript
import utils from 'td-utils'
```

## Api

### utils.hasProp(obj, prop)

hasOwnProperty 方法封装

-   `obj`: Object
-   `prop`: String

```javascript
function hasProp(obj, prop) {
	return Object.prototype.hasOwnProperty.call(obj, prop)
}
```

### utils.isObject(obj)

判断对象方法

-   `obj`: Object

```javascript
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
```

### utils.isArray(arr)

判断数组方法

-   `arr`: Array

```javascript
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
```

### utils.isUndef(v)

```javascript
function isUndef(v) {
	return v === undefined || v === null
}
```

### utils.isDef(v)

```javascript
function isDef(v) {
	return v !== undefined && v !== null
}
```

### utils.debounce(func, wait, immediate)

debounce 防抖

-   `func`: Function 函数
-   `wait`: Number 间隔 毫秒
-   `immediate`: Boolean 是否在前缘立即执行

```javascript
function debounce(func, wait, immediate) {
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
```

### utils.throttle(func, wait, options)

throttle 节流

-   `func`: Function 函数
-   `wait`: Number 间隔 毫秒
-   `options`: Object 选项;但如果你想禁止在前缘执行，可以通过{leading: false}

```javascript
function throttle(func, wait, options) {
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
```

### utils.deepClone(source)

deepClone 简单的深度复制版本

-   `source`: Object

```javascript
function deepClone(source) {
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
```

### utils.uniqueArray(array, key)

uniqueArray 数组去重

-   `array`: Array 数组
-   `key`: String 以数组对象中的那个属性为key

```javascript
function uniqueArray(array, key) {
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
```

### utils.clearUrlParam()

clearUrlParam 清空url 参数

```javascript
function clearUrlParam() {
	if (!window) return
	var url = window.location.href
	if (url.indexOf('?') != -1) {
		url = url.replace(/(\?)[^'"]*/, '')
		window.history.pushState({}, 0, url)
	}
}
```

### utils.getUrlParam()

getUrlParam 获取Url参数,返回一个对象

```javascript
function getUrlParam() {
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
```

### utils.downloadFile(data, fileName, filType, mimeType)

downloadFile 文件流下载(接口  axios-> config responseType: 'blob'; fetch-> then(res=> new Blob) )

-   `data`: Blob 流数据
-   `fileName`: String 文件名
-   `filType`: String 文件名后缀
-   `mimeType`: String 文件 mime类型

```javascript
function downloadFile(data, fileName, filType, mimeType) {
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
```

### utils.parseTime(time, cFormat)

parseTime 日期格式化
[support](https://stackoverflow.com/questions/4310953/invalid-date-in-safari)

-   `time`: String|Date 日期
-   `cFormat`: String 格式化 {y}-{m}-{d} {h}:{i}:{s}:{a} -> 2022-02-16 16:38:59:三

```javascript
function parseTime(time, cFormat) {
	if (arguments.length === 0) return null
	if (isObject(time) || isArray(time)) return null
	const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if (typeof time === 'string') {
			if (/^[0-9]+$/.test(time)) {
				time = parseInt(time)
			} else {
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
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		return value.toString().padStart(2, '0')
	})
	return time_str
}
```