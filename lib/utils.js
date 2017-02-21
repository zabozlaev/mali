const pick = require('lodash.pick')
const camelCase = require('lodash.camelcase')
const forOwn = require('lodash.forown')

const PICK_PATHS = [
  'options',
  'name',
  'requestName',
  'responseName',
  'requestStream',
  'responseStream'
]

function actionMapper (action, name) {
  const r = pick(action, PICK_PATHS)
  r.name = camelCase(name)
  return r
}

exports.getMethodDescriptors = function (service) {
  const r = {}
  forOwn(service, (action, name) => {
    if (action && typeof action.path === 'string') {
      r[name] = actionMapper(action, name)
    }
  })
  return r
}

exports.isString = function (v) {
  return typeof v === 'string'
}

exports.isArray = function (v) {
  return Array.isArray(v)
}

exports.isObject = function (v) {
  var type = typeof v
  return v != null && (type === 'object' || type === 'function')
}

exports.isFunction = function (v) {
  return typeof v === 'function'
}
