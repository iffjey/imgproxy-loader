const STRING_OPTIONS = [
  'resizing_type',
  'gravity',
  'crop_gravity',
  'watermark_position',
  'watermark_url',
  'style',
  'cachebuster',
  'format'
]

const INT_OPTIONS = [
  'width',
  'height',
  'crop_width',
  'crop_height',
  'quality',
  'brightness',
  'pixelate',
  'watermark_x_offset',
  'watermark_y_offset'
]

const FLOAT_OPTIONS = [
  'dpr',
  'gravity_x',
  'gravity_y',
  'crop_gravity_x',
  'crop_gravity_y',
  'contrast',
  'saturation',
  'blur',
  'sharpen',
  'watermark_opacity',
  'watermark_scale'
]

const BOOL_OPTIONS = ['enlarge', 'extend']
const ARRAY_OPTIONS = ['background', 'preset']

const ALL_OPTIONS = [
  ...STRING_OPTIONS,
  ...INT_OPTIONS,
  ...FLOAT_OPTIONS,
  ...BOOL_OPTIONS,
  ...ARRAY_OPTIONS
]

const OPTIONS_ALIASES = {
  crop: 'c',
  resize: 'rs',
  size: 's',
  resizing_type: 'rt',
  width: 'w',
  height: 'h',
  enlarge: 'en',
  extend: 'ex',
  gravity: 'g',
  quality: 'q',
  background: 'bg',
  adjust: 'a',
  brightness: 'br',
  contrast: 'co',
  saturation: 'sa',
  blur: 'bl',
  sharpen: 'sh',
  pixelate: 'pix',
  watermark: 'wm',
  watermark_url: 'wmu',
  preset: 'pr',
  cachebuster: 'cb'
}

module.exports = {
  ALL_OPTIONS,
  STRING_OPTIONS,
  INT_OPTIONS,
  FLOAT_OPTIONS,
  BOOL_OPTIONS,
  ARRAY_OPTIONS,
  OPTIONS_ALIASES
}
