var utils = require('./index')

console.log(
	'日期格式化',
	utils.parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}:{a}')
)
console.log(
	'uniqueArray',
	utils.uniqueArray([{ a: '1' }, { a: '1' }, { b: '1' }], 'a')
)
// console.log('是否存在对象', utils.hasProp({ a: 1 }, 'a'))

// console.log('判断对象方法', utils.isObject({}))

// console.log('判断数组方法', utils.isArray([]))

// console.log('isUndef', utils.isUndef(undefined))

// console.log('isDef', utils.isDef({}))
