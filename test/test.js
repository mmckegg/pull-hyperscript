var h = require('../')
var pull = require('pull-stream')
pull(
  h('div', {class: 'test'}, pull.values('test')),
  pull.concat((err, x) => {
    console.log(x)
  })
)
