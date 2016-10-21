var test = require('tape')
var pull = require('pull-stream')

var h = require('./')

test('single level', t => {
  pull(
    h('div', {class: 'test'}),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<div class="test"></div>', 'renders html')
      t.end()
    })
  )
})

test('multiple level', t => {
  pull(
    h('div', {class: 'test'}, [
      h('div', {}, [
        h('p', {}, 'yes!')
      ])
    ]),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<div class="test"><div><p>yes!</p></div></div>', 'renders html')
      t.end()
    })
  )
})

test('optional second arg', t => {
  pull(
    h('p', 'yes!'),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<p>yes!</p>', 'renders html')
      t.end()
    })
  )
})

test('nested array', t => {
  pull(
    h('div', [
      h('div', 'yes'),
      [
        h('p', {class: '1'}, 'no'),
        h('p', {class: '2'}, 'no')
      ]
    ]),
    pull.concat((err, html) => {
      if (err) throw err
      var expected = '<div><div>yes</div><p class="1">no</p><p class="2">no</p></div>'
      t.equal(html, expected, 'renders html')
      t.end()
    })
  )
})
