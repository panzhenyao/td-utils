import utils from './index.js'

console.log('日期格式化', utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}:{a}'))

console.log('是否存在对象', utils.hasProp({ a: 1 }, 'a'))

console.log('判断对象方法', utils.isObject({}))

console.log('判断数组方法', utils.isArray([]))

console.log('isUndef', utils.isUndef(undefined))

console.log('isDef', utils.isDef({}))
