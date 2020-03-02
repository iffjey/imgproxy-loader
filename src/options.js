const {
  ARRAY_OPTIONS,
  BOOL_OPTIONS,
  FLOAT_OPTIONS,
  INT_OPTIONS,
  STRING_OPTIONS,
  OPTIONS_ALIASES
} = require('./constants')
const {
  compose,
  trimUndefinedValues,
  urlSafeBase64,
  wrapArray
} = require('./utils')

function typecast(options) {
  function typecastValue(name, value) {
    switch (true) {
      case STRING_OPTIONS.includes(name):
        return String(value)
      case INT_OPTIONS.includes(name):
        return parseInt(value, 10)
      case FLOAT_OPTIONS.includes(name):
        return parseFloat(value)
      case ARRAY_OPTIONS.includes(name):
        return wrapArray(value)
      case BOOL_OPTIONS.includes(name):
        return value && value !== '0' ? 1 : 0
      default:
        throw new Error(`${name} option is not supported`)
    }
  }

  return Object.assign(
    {},
    ...Object.entries(options).map(([name, value]) => ({
      [name]: typecastValue(value)
    }))
  )
}

function groupCropOptions(options) {
  let {
    crop_width,
    crop_height,
    crop_gravity: crop_gravity_type,
    crop_gravity_x,
    crop_gravity_y,
    ...restOptions
  } = options

  if (!crop_width && !crop_height) return restOptions

  let crop_gravity = trimUndefinedValues([
    crop_gravity_type,
    crop_gravity_x,
    crop_gravity_y
  ])

  let crop = [crop_width || 0, crop_height || 0, ...crop_gravity]

  return { ...restOptions, crop }
}

function groupResizingOptions(options) {
  if (!options.width || !options.height) return options

  let {
    width,
    height,
    enlarge,
    extend,
    resizing_type,
    ...restOptions
  } = options

  let size = trimUndefinedValues([width, height, enlarge, extend])

  if (resizing_type) {
    let resize = [resizing_type, ...size]
    return { ...restOptions, resize }
  }

  return { ...restOptions, size }
}

function groupGravityOptions(options) {
  let { gravity: gravity_type, gravity_x, gravity_y, ...restOptions } = options

  let gravity = trimUndefinedValues([gravity_type, gravity_x, gravity_y])

  if (!gravity.length) return restOptions

  return { ...restOptions, gravity }
}

function groupAdjustOptions(options) {
  let { brightness, contrast, saturation, ...restOptions } = options
  let adjust = [brightness, contrast, saturation]
  let shouldGroup = adjust.filter(option => option !== undefined).length > 1

  if (!shouldGroup) return options

  adjust = trimUndefinedValues(adjust)

  return { ...restOptions, adjust }
}

function groupWatermarkOptions(options) {
  let {
    watermark_opacity,
    watermark_position,
    watermark_x_offset,
    watermark_y_offset,
    watermark_scale,
    ...restOptions
  } = options

  let watermark = trimUndefinedValues([
    watermark_opacity,
    watermark_position,
    watermark_x_offset,
    watermark_y_offset,
    watermark_scale
  ])

  if (!watermark.length) return restOptions

  return { ...restOptions, watermark }
}

function groupOptions(options) {
  return compose(
    groupCropOptions,
    groupResizingOptions,
    groupGravityOptions,
    groupAdjustOptions,
    groupWatermarkOptions
  )(options)
}

function encodeStyle(options) {
  let { style } = options

  if (!style) return options

  return { ...options, style: urlSafeBase64(style) }
}

function encodeWatermarkUrl(options) {
  let { watermark_url } = options

  if (!watermark_url) return options

  return { ...options, watermark_url: urlSafeBase64(watermark_url) }
}

function getOptionAlias(name) {
  return OPTIONS_ALIASES[name] || name
}

function optionsToPath(options) {
  let result = []

  Object.keys(options).forEach(name => {
    let value = options[name]
    let alias = getOptionAlias(name)

    result.push(`${alias}:${wrapArray(value).join(':')}`)
  })

  return result.join('/')
}

function getProcessingOptionsPath(options) {
  return compose(
    typecast,
    groupOptions,
    encodeStyle,
    encodeWatermarkUrl,
    optionsToPath
  )(options)
}

module.exports = { getProcessingOptionsPath }
