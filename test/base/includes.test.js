var includes = require('../../src/utils/base/includes')

test('includes: params value -> string', function () {
	expect(includes('string', 'str')).toBe(true)
})

test('includes: params value -> object', function () {
	expect(includes({ prop: '1' }, '1')).toBe(true)
})
