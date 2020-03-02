const { getOptions, interpolateName, parseQuery } = require('loader-utils')
const validateOptions = require('schema-utils')
const path = require('path')

const { mergeUrl, urlSafeBase64 } = require('./utils')
const { getProcessingOptionsPath } = require('./options')
const sign = require('./sign')
const schema = require('./schema.json')

module.exports = function loader(content) {
  let options = getOptions(this) || {}

  validateOptions(schema, options, {
    name: 'Imgproxy Loader',
    baseDataPath: 'options'
  })

  let context = options.context || this.rootContext

  let url = interpolateName(this, options.name || '[contenthash].[ext]', {
    context,
    content,
    regExp: options.regExp
  })

  let outputPath = url

  if (options.outputPath) {
    if (typeof options.outputPath === 'function') {
      outputPath = options.outputPath(url, this.resourcePath, context)
    } else {
      outputPath = path.posix.join(options.outputPath, url)
    }
  }

  if (typeof options.emitFile === 'undefined' || options.emitFile) {
    this.emitFile(outputPath, content)
  }

  let publicPath

  if (typeof options.publicPath === 'function') {
    publicPath = options.publicPath(url, this.resourcePath, context)
  } else {
    publicPath = mergeUrl(options.publicPath, url)
  }

  if (!this.resourceQuery) {
    return `module.exports = ${JSON.stringify(publicPath)};`
  }

  let processingOptions = parseQuery(this.resourceQuery)

  let sourceUrl = options.plain
    ? path.posix.join('plain', publicPath)
    : urlSafeBase64(publicPath)

  let processingOptionsPath = getProcessingOptionsPath(processingOptions)
  let target = path.posix.join('/', processingOptionsPath, sourceUrl)
  let signature = sign(options.salt, target, options.key)
  let pathname = path.posix.join(signature, target)
  let result = mergeUrl(options.url, pathname)

  return `module.exports = ${JSON.stringify(result)};`
}
