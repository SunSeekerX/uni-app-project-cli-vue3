import { createI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import zh_CN from './zh'
import en_US from './en_US'

import { STORAGE_LOCALE_KEY } from '@/constant'
import { locales, defaultLocale } from '@/config/default'

const localeLocal = uni.getStorageSync(STORAGE_LOCALE_KEY)
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: getI18nLocale(localeLocal) || getI18nLocale(defaultLocale),
  messages: {
    zh_CN,
    en_US,
  },
})

export { i18n }

export function onInitI18n() {
  dayjs.locale(getDayjsLocale())
  uni.setLocale(getUniAppLocale())
}
onInitI18n()

export function getDayjsLocale() {
  const curLocale = i18n.global.locale
  switch (curLocale) {
    case locales.EN_US.value:
      return 'en'
    case locales.ZH_CN.value:
      return 'zh-cn'
    default:
      return 'en'
  }
}

export function getUniAppLocale() {
  // https://uniapp.dcloud.net.cn/api/ui/locale.html
  const curLocale = i18n.global.locale
  switch (curLocale) {
    case locales.EN_US.value:
      return 'en'
    case locales.ZH_CN.value:
      return 'zh-Hans'
    default:
      return 'en'
  }
}

export function getI18nLocale(locale) {
  switch (locale) {
    case locales.EN_US.value:
      return 'en_US'
    case locales.ZH_CN.value:
      return 'zh_CN'
    default:
      return 'en_US'
  }
}
