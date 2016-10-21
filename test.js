var test = require('tape')
var pull = require('pull-stream')

var h = require('./')

test('string child', t => {
  pull(
    h('div', {class: 'i'}, 'content'),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<div class="i">content</div>', 'renders html')
      t.end()
    })
  )
})

test('stream child', t => {
  pull(
    h('div', {class: 'i'}, h('p', {}, 'content')),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<div class="i"><p>content</p></div>', 'renders html')
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

test('tag only', t => {
  pull(
     h('hr'),
     pull.concat((err, html) => {
       if (err) throw err
       t.equal(html, '<hr></hr>', 'renders html')
       t.end()
     })
   )
})

test('multiple level', t => {
  pull(
    h('div', {class: 'i'}, [
      h('div', {}, [
        h('p', {}, 'yes!')
      ])
    ]),
    pull.concat((err, html) => {
      if (err) throw err
      t.equal(html, '<div class="i"><div><p>yes!</p></div></div>', 'renders html')
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

test('a nested map', t => {
  pull(
    h('table', {class: 'i'},
      h('tr', {}, pull(
        pull.values(['yes', null, 'non']),
        pull.filter(Boolean),
        pull.map(val => h('td', val))
      ))
    ),
    pull.concat((err, html) => {
      if (err) throw err
      // console.log(html)
      t.end()
    })
  )
})

