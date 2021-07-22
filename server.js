// // Step 1: Create a Vue instance
// const server = require('express')()
// const template = require('fs').readFileSync('./public/index.html', 'utf-8')
// const createApp = require('./src/server-entry.js')
// const Vue = require('vue')

// // Step 2: Create a renderer
// // const renderer = require('vue-server-renderer').createRenderer({
// //   template
// // })
// const renderer = require('vue-server-renderer').createRenderer({
//   template
// })

// // Create context object
// // const context = {
// //   title: 'hello',
// //   meta: `
// //     <meta name="keyword" content="vue,ssr">
// //     <meta name="description" content="vue srr demo">
// //   `
// // }

// server.get('*', (req, res) => {
//   const context = {
//     url: req.url,
//     title: 'hello',
//     meta: `
//       <meta name="keyword" content="vue,ssr">
//       <meta name="description" content="vue srr demo">
//     `
//   }

//   const app = createApp(context)

//   renderer.renderToString(app, (err, html) => {
//     if (err) {
//       console.log(err)
//       res.status(500).end('Internal Server Error')
//       return
//     }
//     res.end(html)
//   })
//   // const app = createApp(context)
//   // // Step 3: Render the Vue instance to HTML
//   // renderer.renderToString(app, context, (err, html) => {
//   //   if (err) {
//   //     console.log(err)
//   //     res.status(500).end('Internal Server Error')
//   //     return
//   //   }
//   //   res.end(html)
//   //   // res.end(`
//   //   // <!DOCTYPE html>
//   //   //   <html lang="en">
//   //   //     <head>
//   //   //       <title>Hello</title>
//   //   //     </head>
//   //   //     <body>
//   //   //       ${html}
//   //   //     </body>
//   //   //   </html>
//   //   // `)
//   //   // => <div data-server-rendered="true">Hello World</div>
//   // })

//   // in 2.5.0 +, returns a Promise if no callback is passed
// //   renderer.renderToString(app, context).then(html => {
// //     // res.end(`
// //     //   <!DOCTYPE html>
// //     //   <html lang="en">
// //     //     <head>
// //     //       <title>Hello</title>
// //     //     </head>
// //     //     <body>
// //     //       ${html}
// //     //     </body>
// //     //   </html>
// //     // `)
// //     console.log(html)
// //     res.end(html)
// //   }).catch(err => {
// //     console.log(err)
// //   })
// })

// server.listen(8080, () => {
//   console.log('running on port 8080')
// })

const express = require('express')
const server = express()
const fs = require('fs')
const path = require('path')
// Obtain bundle
const bundle = require('./dist/server.bundle.js')
// Get renderer from vue server renderer
const renderer = require('vue-server-renderer').createRenderer({
  // Set template
  template: fs.readFileSync('./public/index.html', 'utf-8')
})

server.use('/dist', express.static(path.join(__dirname, './dist')))

// Start server
server.get('*', (req, res) => {
  bundle.default({ url: req.url }).then((app) => {
    // Context to use as data source in the template for interpolation
    const context = {
      title: 'Vue JS - Server Render',
      meta: `
        <meta description="vuejs server side render">
      `
    }

    renderer.renderToString(app, context, (err, html) => {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    }, (err) => {
      console.log(err)
    })
  })
})

server.listen(8080)
