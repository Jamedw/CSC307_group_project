const sub = require('./sub');

test('subtract two numbers', () => {
    expect(sub(1, 2)).toBe(-1)
})