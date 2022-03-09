var hasProp = require('../../src/utils/base/hasProp')

test('hasProp: test return', function () {
	expect(hasProp({ prop: '1' }, 'prop')).toBe(true)
})

test('hasProp: test return', function () {
	expect(hasProp({ prop: '1' }, 'obj')).toBe(false)
})
