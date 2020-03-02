/* eslint-disable func-style */

const {
  compose,
  hexDecode,
  mergeUrl,
  trimUndefinedValues,
  urlSafeBase64,
  wrapArray
} = require('../src/utils')

describe('compose', () => {
  it('composes from left to right', () => {
    let double = x => x * 2
    let square = x => x * x

    expect(compose(square)(5)).toBe(25)
    expect(compose(square, double)(5)).toBe(50)
    expect(compose(square, double, double)(5)).toBe(100)
  })

  it('can be seeded with multiple arguments', () => {
    let square = x => x * x
    let add = (x, y) => x + y

    expect(compose(add, square)(1, 2)).toBe(9)
  })

  it('returns the first given argument if given no functions', () => {
    expect(compose()(1, 2)).toBe(1)
    expect(compose()(3)).toBe(3)
    expect(compose()(undefined)).toBeUndefined()
  })

  it('returns the first function if given only one', () => {
    let fn = () => {}

    expect(compose(fn)).toBe(fn)
  })
})

describe('hexDecode', () => {
  it('should decode from hex', () => {
    let salt = '68656C6C6F'
    expect(hexDecode(salt).toString()).toBe('hello')
  })
})

describe('mergeUrl', () => {
  it('should merge base and input', () => {
    let base = 'https://localhost:5000'
    let input = 'hello/world'
    expect(mergeUrl(base, input)).toBe('https://localhost:5000/hello/world')
  })

  it('should merge base with trailing slash and input', () => {
    let base = 'https://localhost:5000/'
    let input = 'hello/world'
    expect(mergeUrl(base, input)).toBe('https://localhost:5000/hello/world')
  })

  it('should merge base and input with leading slash', () => {
    let base = 'https://localhost:5000'
    let input = '/hello/world'
    expect(mergeUrl(base, input)).toBe('https://localhost:5000/hello/world')
  })

  it('should merge base with trailing slash and input with leading slash', () => {
    let base = 'https://localhost:5000/'
    let input = '/hello/world'
    expect(mergeUrl(base, input)).toBe('https://localhost:5000/hello/world')
  })

  it('should merge base with pathname and input', () => {
    let base = 'https://localhost:5000/admin'
    let input = 'hello/world'

    expect(mergeUrl(base, input)).toBe(
      'https://localhost:5000/admin/hello/world'
    )
  })
})

describe('trimUndefinedValue', () => {
  it('should trim undefined values from the end of array', () => {
    let arr = [1, undefined]
    expect(trimUndefinedValues(arr)).toStrictEqual([1])
  })

  it("shouldn't trim undefined values from the start of array", () => {
    let arr = [undefined, 2]
    expect(trimUndefinedValues(arr)).toStrictEqual([undefined, 2])
  })

  it("shouldn't remove undefined values from the middle of array", () => {
    let arr = [1, undefined, 3]
    expect(trimUndefinedValues(arr)).toStrictEqual([1, undefined, 3])
  })
})

describe('urlSafeBase64', () => {
  it('should create url-safe base64 encoded string', () => {
    let style = `path {
      color: #fff;
    }`

    let urlSafeBase64EncodedStyle = urlSafeBase64(style)

    expect(urlSafeBase64EncodedStyle).toEqual(
      expect.not.stringMatching(/[+/=]/)
    )

    expect(urlSafeBase64EncodedStyle).toBe(
      'cGF0aCB7CiAgICAgIGNvbG9yOiAjZmZmOwogICAgfQ'
    )
  })
})

describe('wrapArray', () => {
  it('should return same value if argument is an array', () => {
    let arr = [1, 2, 3]

    expect(wrapArray(arr)).toBe(arr)
  })

  it('should return value wrapped in array', () => {
    expect(wrapArray(1)).toStrictEqual([1])
  })
})
