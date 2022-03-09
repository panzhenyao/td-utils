var isObject = require('../../src/utils/base/isObject')

test('isObject: params value -> string', function () {
	expect(isObject('string')).toBe(false)
})

test('isObject: params value -> array', function () {
	expect(isObject([])).toBe(false)
})

test('isObject: params value -> object', function () {
	expect(isObject({})).toBe(true)
})
