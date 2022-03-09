var isArray = require('../../src/utils/base/isArray')

test('isArray: params value -> string', function () {
	expect(isArray('string')).toBe(false)
})

test('isArray: params value -> object', function () {
	expect(isArray({})).toBe(false)
})

test('isArray: params value -> array', function () {
	expect(isArray([])).toBe(true)
})
