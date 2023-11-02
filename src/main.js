import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import uView from '@/uni_modules/vk-uview-ui'
import { i18n } from './i18n'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()

  app.use(pinia)
  app.use(i18n)
  app.use(uView)

  return {
    app,
  }
}
