// Step 1: Create a Vue instance
const server = require('express')()
const template = require('fs').readFileSync('./public/index.html', 'utf-8')
const createApp = require('./app.js')

// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer({
  template
})

// Create context object
// const context = {
//   title: 'hello',
//   meta: `
//     <meta name="keyword" content="vue,ssr">
//     <meta name="description" content="vue srr demo">
//   `
// }

server.get('*', (req, res) => {
  const context = {
    url: req.url,
    title: 'hello',
    meta: `
      <meta name="keyword" content="vue,ssr">
      <meta name="description" content="vue srr demo">
    `
  }
  const app = createApp(context)
  // Step 3: Render the Vue instance to HTML
  renderer.renderToString(app, context, (err, html) => {
    if (err) {
      res.status(500).end('Internal Server Error')
      return
    }
    res.end(html)
    // res.end(`
    // <!DOCTYPE html>
    //   <html lang="en">
    //     <head>
    //       <title>Hello</title>
    //     </head>
    //     <body>
    //       ${html}
    //     </body>
    //   </html>
    // `)
    // => <div data-server-rendered="true">Hello World</div>
  })

  // in 2.5.0 +, returns a Promise if no callback is passed
//   renderer.renderToString(app, context).then(html => {
//     // res.end(`
//     //   <!DOCTYPE html>
//     //   <html lang="en">
//     //     <head>
//     //       <title>Hello</title>
//     //     </head>
//     //     <body>
//     //       ${html}
//     //     </body>
//     //   </html>
//     // `)
//     console.log(html)
//     res.end(html)
//   }).catch(err => {
//     console.log(err)
//   })
})

server.listen(8080, () => {
  console.log('running on port 8080')
})
