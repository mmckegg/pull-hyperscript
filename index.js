var pullCat = require('pull-cat')
var pull = require('pull-stream')

var createAttributes = require('./lib/createAttributes')

module.exports = h

function h (tagName, props, children) {
  if (children == null && typeof props === 'function') {
    children = props
    props = null
  }

  var things = []
  things.push(pull.once(`<${tagName}${createAttributes(props || {})}>`))
  if (children) {
    things.push(children)
  }
  things.push(pull.once(`</${tagName}>`))
  return pullCat(things)
}

