const validationValue = require('./validate')

describe('Validation', () => {
  test('True value 50', () => {
    expect(validationValue(50)).toBe(true)
  })

  test('Less then must', () => {
    expect(validationValue(-1)).toBe(false)
  })

  test('Most then must', () => {
    expect(validationValue(101)).toBe(false)
  })

  test('True value 100', () => {
    expect(validationValue(100)).toBe(true)
  })

  test('True value 0', () => {
    expect(validationValue(0)).toBe(true)
  })
})
