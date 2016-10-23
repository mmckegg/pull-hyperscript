# pull-hyperscript

Create HyperText a la [hyperscript](https://github.com/dominictarr/hyperscript), but return the html as a [pull-stream](https://github.com/pull-stream/pull-stream).

This allows streaming the view to the browser as it continues to render.

```js
const h = require('pull-hyperscript')
const pull = require('pull-stream')

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

pull(
  h('div', {class: 'i'}, pull(
    pull.values(['yes', null, 'non']),
    pull.filter(Boolean),
    map(val => h('p', val)),
    flatten()                        // NB: flatten turns a stream of streams into a single stream
  )),
  pull.concat((err, html) => {
    if (err) throw err
    var expected = '<div class="i"><p>yes</p><p>non</p></div>'
    t.equal(html, expected, 'renders html')
    t.end()
  })
)
```
