'use strict'

// 基础方法
var hasProp = require('./src/utils/base/hasProp')
var includes = require('./src/utils/base/includes')
var isArray = require('./src/utils/base/isArray')
var isObject = require('./src/utils/base/isObject')
var isDef = require('./src/utils/base/isDef')
var isUndef = require('./src/utils/base/isUndef')

// 复杂方法
var debounce = require('./src/utils/shared/debounce')
var throttle = require('./src/utils/shared/throttle')
var deepClone = require('./src/utils/shared/deepClone')
var uniqueArray = require('./src/utils/shared/uniqueArray')
var randomCharCode = require('./src/utils/shared/randomCharCode')
// 浏览器相关方法
var clearUrlParam = require('./src/utils/web/clearUrlParam')
var downloadFile = require('./src/utils/web/downloadFile')
var getUrlParam = require('./src/utils/web/getUrlParam')
var parseTime = require('./src/utils/web/parseTime')



module.exports = {
    // 基础方法
    hasProp: hasProp,
    includes: includes,
    isArray: isArray,
    isObject: isObject,
    isDef: isDef,
    isUndef: isUndef,
    // 复杂方法
    debounce: debounce,
    throttle: throttle,
    deepClone: deepClone,
    uniqueArray: uniqueArray,
    randomCharCode: randomCharCode,
    // 浏览器相关方法
    clearUrlParam: clearUrlParam,
    downloadFile: downloadFile,
    getUrlParam: getUrlParam,
    parseTime: parseTime
}