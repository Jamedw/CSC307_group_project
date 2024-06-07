const add = require('../services/add');

test('add two numbers', () => {
    expect(add(1, 2)).toBe(3)
})