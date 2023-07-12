import { createSSRApp } from 'vue'
import { createPinia } from 'pinia'
import NP from 'number-precision'

import App from './App.vue'
import uView from '@/uni_modules/vk-uview-ui'
import { i18n } from './i18n'

Number.prototype.toFix = function (digits) {
  const digitsVal = Math.pow(10, digits)
  if (this < 0) {
    return '-' + NP.divide(Math.floor(NP.times(Math.abs(this), digitsVal)), digitsVal).toFixed(digits)
  } else {
    return NP.divide(Math.floor(NP.times(this, digitsVal)), digitsVal).toFixed(digits)
  }
}

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
