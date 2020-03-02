const crypto = require('crypto')

const { hexDecode, urlSafeBase64 } = require('./utils')

function sign(salt, target, secret) {
  let hmac = crypto.createHmac('sha256', hexDecode(secret))
  hmac.update(hexDecode(salt))
  hmac.update(target)
  return urlSafeBase64(hmac.digest())
}

module.exports = sign
