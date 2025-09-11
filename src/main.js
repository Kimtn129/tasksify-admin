import { createApp } from 'vue'
import { configure } from 'vee-validate'

import './index.css'
import App from './App.vue'
import router from '@router'
import { setupFirebase } from '@config/firebase.config'

const initApp = async () => {
  setupFirebase()
  const app = createApp(App)

  // VEE-VALIDATE Config common
  configure({
    validateOnBlur: false,
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false
  })

  app.use(router)
  Object.values(import.meta.glob('@plugins/*.js', { eager: true })).forEach((i) => app.use(i))

  app.mount('#app')
}

initApp()
