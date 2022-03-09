var isDef = require('../../src/utils/base/isDef')

test('isDef: params value -> undefined', function () {
	expect(isDef(undefined)).toBe(false)
})

test('isDef: params value -> string', function () {
	expect(isDef('string')).toBe(true)
})

test('isDef: params value -> string', function () {
	expect(isDef(123456)).toBe(true)
})

test('isDef: params value -> object', function () {
	expect(isDef({})).toBe(true)
})

test('isDef: params value -> array', function () {
	expect(isDef([])).toBe(true)
})