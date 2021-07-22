// Client only set up
import Vue from 'vue'
import App from './App.vue'
// import { createRouter } from './router.js'

// Export a factory function for creating fresh app, router and store instances
export function createApp () {
  // create router instance
  // const router = createRouter()

  const app = new Vue({
    // the route instance simply renders the App component
    render: h => h(App)
  })

  return { app }
}

// new Vue({
//   render: (h) => h(App)
// }).$mount('#app')

// SSR setup
// import Vue from 'vue'
// import App from './App.vue'

// // Export a factory function for creating fresh app, router and store instances
// export function createApp () {
//   const app = new Vue({
//     // The root instance simply renders the App component
//     render: h => h(App)
//   })
//   return app
// }
