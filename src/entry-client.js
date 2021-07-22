import { createApp } from './main.js'

// client-specific bootstrapping logic

const { app } = createApp()

// This assumes App.vue template root element has id="app"
app.$mount('#app', true)
