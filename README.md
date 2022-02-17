# td-utils  

td 前端js工具库. 该工具使用了ECMAScript (ECMA-262) 特性; 兼容ie9+
## Browser Support  

IE9+, Chrome, Firefox, Safari, Opera
## Install  

```bash
npm install td-utils
```

## Usage  

```javascript
import utils from 'td-utils'
```
**或**  
```javascript
import { hasProp } from 'td-utils'
```

## Api  

### utils.hasProp(obj, prop)  
  
hasOwnProperty 方法封装  
@returns: Boolean  

-   `obj`: Object
-   `key`: String

```javascript
function hasProp(obj, key) {
	return Object.prototype.hasOwnProperty.call(obj, key)
}
```

### utils.includes(obj, val)  
  
includes 判断对象是否包含该值,成功返回true否则false  
@returns: Boolean  

-   `obj`: Object 对象
-   `val`: Object 值

```javascript
function includes (obj, val) {
  if (obj) {
    if (obj.includes) {
      return obj.includes(val)
    }
    for (var key in obj) {
      if (hasProp(obj, key)) {
        if (val === obj[key]) {
          return true
        }
      }
    }
  }
  return false
}
```

### utils.isObject(obj)  
  
isObject 判断对象方法  
@returns: Boolean  

-   `obj`: Object

```javascript
function isObject(obj) {
	return Object.prototype.toString.call(obj) === '[object Object]'
}
```

### utils.isArray(arr)  
  
isArray 判断数组方法  
@returns Boolean  

-   `arr`: Array

```javascript
function isArray(arr) {
	return Object.prototype.toString.call(arr) === '[object Array]'
}
```

### utils.isUndef(v)  
  
isUndef  
@returns Boolean  

-   `v`: Any


```javascript
function isUndef(v) {
	return v === undefined || v === null
}
```

### utils.isDef(v)  
  
isDef  
@returns Boolean  

-   `v`: Any

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
```

### utils.throttle(func, wait, options)  
  
throttle 节流  
注意: 如果 leading 和 trailing 都设定为 true 则 func 允许 trailing 方式调用的条件为: 在 wait 期间多次调用  
[options.leading=true] (boolean): 指定调用在节流开始前  
[options.trailing=true] (boolean): 指定调用在节流结束后。  
options.leading 与|或 options.trailing 决定 wait 前后如何触发。  

-   `func`: Function 函数
-   `wait`: Number 间隔 毫秒
-   `options`: Object 选项 

```javascript
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
```

### utils.deepClone(source)  
  
deepClone 简单的深度复制版本  
@returns Object  

-   `source`: Object

```javascript
function deepClone(source) {
	if (!source && typeof source !== 'object') {
		throw new Error('error: arguments', 'method deepClone not supported')
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
```

### utils.uniqueArray(array, key)  
  
uniqueArray 数组去重  
@returns Array  

-   `array`: Array 数组
-   `key`: String 以数组对象中的那个属性为key,如果不填则使用includes方法比对数组项

```javascript
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
@then Object  

```javascript
function getUrlParam() {
    // polyfill Promise
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
```

### utils.downloadFile(data, fileName, filType, mimeType)  
  
downloadFile 文件流下载(需要对请求配置  axios-> config responseType: 'blob'; fetch-> then(res=> new Blob) )  

-   `data`: Blob 流数据
-   `fileName`: String 文件名
-   `filType`: String 文件名后缀
-   `mimeType`: String 文件 [mime-types](https://www.iana.org/assignments/media-types/media-types.xhtml#application)流媒体类型

```javascript
function downloadFile(data, fileName, filType, mimeType) {
	if (!data || !window || !document) {
		throw new Error('method downloadFile not supported')
	}
	var isIE = !!window.ActiveXObject || 'ActiveXObject' in window
	var MimeType = mimeType || filType
	if (isIE) {
		// ie下载
		var blob = new Blob([data], {
			type: 'application/'+ MimeType +';charset=utf-8;',
		})
		window.navigator.msSaveBlob(blob, fileName + '.' + filType)
	} else {
		// 非ie下载
		var URL = window.URL || window.webkitURL || window.moxURL
		var url = URL.createObjectURL(
			new Blob([data], {
				type: 'application/' + MimeType,
			})
		)
		var link = document.createElement('a')
		link.style.display = 'none'
		link.href = url
		link.setAttribute('download', fileName + '.' + filType)
		document.body.appendChild(link)
		link.click()
		URL.revokeObjectURL(link.href)
		document.body.removeChild(link)
	}
}
```

### utils.parseTime(time, cFormat)  
  
parseTime 日期格式化;[support safari](https://stackoverflow.com/questions/4310953/invalid-date-in-safari)  
@returns String  

-   `time`: String|Date 日期
-   `cFormat`: String 格式化 e.g. {y}-{m}-{d} {h}:{i}:{s}:{a} -> 2022-02-16 16:38:59:三

```javascript
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
```