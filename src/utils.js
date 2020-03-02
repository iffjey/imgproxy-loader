function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reverse().reduce((a, b) => (...args) => a(b(...args)))
}

function hexDecode(hex) {
  return Buffer.from(hex, 'hex')
}

function mergeUrl(base, input) {
  let safeBase = base.endsWith('/') ? base : `${base}/`
  return new URL(input, safeBase).href
}

function trimUndefinedValues(values) {
  let result = [...values]

  while (result.length && result[result.length - 1] === undefined) {
    result.pop()
  }

  return result
}

function urlSafeBase64(string) {
  return Buffer.from(string)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

function wrapArray(value) {
  return Array.isArray(value) ? value : [value]
}

module.exports = {
  compose,
  hexDecode,
  mergeUrl,
  trimUndefinedValues,
  urlSafeBase64,
  wrapArray
}
