const { getOptions, parseQuery } = require('loader-utils')
const validateOptions = require('schema-utils')
const path = require('path')
const fileLoader = require('file-loader')

const { mergeUrl, urlSafeBase64 } = require('./utils')
const { getProcessingOptionsPath } = require('./options')
const sign = require('./sign')
const schema = require('./schema.json')

function loader(content) {
  let options = getOptions(this) || {}

  validateOptions(schema, options, {
    name: 'Imgproxy Loader',
    baseDataPath: 'options'
  })

  let query

  if (this.resourceQuery) {
    let { key, salt, url: imgproxyUrl, plain, ...restOptions } = options

    query = {
      ...restOptions,
      publicPath: (url, resourcePath, context) => {
        let publicPath

        if (typeof restOptions.publicPath === 'function') {
          publicPath = restOptions.publicPath(url, resourcePath, context)
        } else {
          publicPath = mergeUrl(restOptions.publicPath, url)
        }

        let processingOptions = parseQuery(this.resourceQuery)

        let sourceUrl = plain
          ? path.posix.join('plain', publicPath)
          : urlSafeBase64(publicPath)

        let processingOptionsPath = getProcessingOptionsPath(processingOptions)
        let target = path.posix.join('/', processingOptionsPath, sourceUrl)
        let signature = sign(salt, target, key)
        let pathname = path.posix.join(signature, target)
        let result = mergeUrl(imgproxyUrl, pathname)

        return result
      }
    }
  }

  return fileLoader.bind(query ? { ...this, query } : this)(content)
}

module.exports.default = loader
module.exports.raw = true
