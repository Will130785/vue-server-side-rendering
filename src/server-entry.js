// Basic setup
// const Vue = require('vue')

// module.exports = function createApp (context) {
//   return new Vue({
//     data: {
//       url: context.url
//     },
//     template: `
//       <div>The visited URL is: {{ url }}</div>
//     `
//   })
// }

import { createApp } from './main.js'

export default context => {
  // Since there could potentially be asynchronous route hooks or components
  // We will be returning a Promise so that the server can wait until everything is ready before rendering
  return new Promise((resolve, reject) => {
    const { app } = createApp()

    // Set server side routers location
    // router.push(context.url)

    // // Wait until router has resolved possible async components and hooks
    // router.onReady(() => {
    //   const matchedComponents = router.getMatchedComponents()
    //   // No matched routes, reject with 404
    //   if (!matchedComponents.length) {
    //     return reject({ code: 404 })
    //   }

    //   // the Promise should resolve to the app instance so it can be rendered
    //   resolve(app)
    // }, reject)
    resolve(app)
  })
}
