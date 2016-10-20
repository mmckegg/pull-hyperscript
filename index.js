var pullCat = require('pull-cat')
var pull = require('pull-stream')
var isArray = Array.isArray

var createAttributes = require('./lib/createAttributes')

module.exports = h

function h (tagName, props, children) {
  if (isSkippingProps()) {
    children = props
    props = {}
  }

  var things = []
  things.push(pull.once(`<${tagName}${createAttributes(props)}>`))
  if (children)
    things.push(childrenToStream(children))
  things.push(pull.once(`</${tagName}>`))
  return pullCat(things)

  function isSkippingProps() {
    return children == undefined &&
      (typeof props === 'function' || isArray(props) || typeof props === 'string')
  }
}

function childrenToStream (children) {
  if (isStream(children)) return children

  if (isArray(children))
    return pullCat(children.map(childrenToStream))
 
  return pull.values([children])
}

function isStream (fn) {
  return typeof fn  === 'function'
}


