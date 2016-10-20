var pullCat = require('pull-cat')

module.exports = h

function h (tagName, props, children) {
  if (children == null && typeof props === 'function') {
    children = props
    props = {}
  }

  var things = []
  things.push(`<${tagName} ${props}>`)
  if (children) {
    things.push(children)
  }
  things.push(`</${tagName}`)
  return pullCat(things)
}

function htmlAttributes (props) {

}

function createAttributes(attributes) {
  var buf = ''

  Object.keys(attributes).forEach(function (attribute) {
    var value = attributes[attribute]
    if (!truthyEnough(value)) return;

    value = Array.isArray(value) ? validValues(value)
      : Object(value) === value ? validKeys(value)
      : value
    if (!truthyEnough(value)) return;

    buf += ' ' + attribute
    if (value !== true) buf += '="' + value + '"';
  })

  return buf
}

function truthyEnough (value) {
  return value || value === 0 || value === '';
}

function validValues(array) {
  return array.filter(Boolean).join(' ')
}

function validKeys(object) {
  return Object.keys(object).filter(function (key) {
    return object[key]
  }).join(' ')
}
