import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

window.addEventListener('scroll', (e) => {
  e.preventDefault()
  console.log("Here is a scroll")
})
