var cat = require('pull-cat')
var defined = require('defined')
var pull = require('pull-stream')
var once = pull.once
var isArray = Array.isArray

var createAttributes = require('./lib/create-attributes')

module.exports = h

function h () {
  var tagName, props, children
  if (arguments.length === 3) [ tagName, props, children ] = arguments

  if (arguments.length === 2) {
    if (isChild(arguments[1])) [ tagName, children ] = arguments
    else [ tagName, props, children ] = arguments
  }

  if (arguments.length === 1) [ tagName ] = arguments

  props = defined(props, {})
  // children = defined(children, [])

  return cat([
    once(`<${tagName}${createAttributes(props)}>`),
    childrenToStream(children),
    once(`</${tagName}>`)
  ])
}

function childrenToStream (children) {
  if (isStream(children)) return children
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

