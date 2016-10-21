# pull-hyperscript

Create HyperText a la [hyperscript](https://github.com/dominictarr/hyperscript), but return the html as a [pull-stream](https://github.com/pull-stream/pull-stream).

This allows streaming the view to the browser as it continues to render.

```js
const h = require('pull-hyperscript')

function table (source) {
  return h('table', {class: 'darker'}, sourceMap(source), row =>
    h('tr', row.map(cell =>
      h('td', cell)
    ))
  ))
}

```
