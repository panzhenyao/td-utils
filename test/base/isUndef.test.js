var isUndef = require('../../src/utils/base/isUndef')

test('isUndef: params value -> undefined', function () {
	expect(isUndef(undefined)).toBe(true)
})

test('isUndef: params value -> string', function () {
	expect(isUndef('')).toBe(false)
})

test('isUndef: params value -> string', function () {
	expect(isUndef(123456)).toBe(false)
})

test('isUndef: params value -> object', function () {
	expect(isUndef({})).toBe(false)
})

test('isUndef: params value -> array', function () {
	expect(isUndef([])).toBe(false)
})
