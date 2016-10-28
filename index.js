var cat = require('pull-cat')
var defined = require('defined')
var pull = require('pull-stream')
var once = pull.once
var isArray = Array.isArray

var createAttributes = require('./lib/create-attributes')

module.exports = h

function h (tagName, props, children) {
  if (arguments.length === 2 && isChild(props)) {
    children = props
    props = undefined
  }

  props = defined(props, {})
  // children = defined(children, [])

  return cat([
    once(`<${tagName}${createAttributes(props)}>`),
    flatten(childrenToStream(children)),
    once(`</${tagName}>`)
  ])
}

function flatten (input) {
  return pull(
    input,
    pull.flatten()
  )
}

function childrenToStream (children) {
  if (isStream(children)) return pull.flatten()(children)
  if (isArray(children)) return cat(children.map(childrenToStream))
  return once(children)
}

function isChild (thing) {
  return [isStream(thing), isArray(thing), isString].some(Boolean)
}

function isStream (fn) {
  return typeof fn === 'function'
}

function isString (str) {
  return typeof str === 'string'
}
