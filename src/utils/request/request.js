import { Request } from '@/uni_modules/limm-utools/esm/bundle.esm.mp'
import { removeEmptyKey } from '@/utils'
import { i18n } from '@/i18n'
import { useAppAuthStore } from '@/store'
import utools from '@/uni_modules/limm-utools'
import { isBoolean } from 'lodash'

export default function createRequest(options, packErr = true) {
  const http = new Request(options)

  http.setReqInterceptor((reqInfo) => {
    const appAuthStore = useAppAuthStore()
    if (['get', 'GET'].includes(reqInfo.method)) {
      reqInfo.data = {
        ...reqInfo.data,
        _t: new Date().getTime(),
      }
    }
    if (appAuthStore.token) {
      reqInfo['header']['token'] = appAuthStore.token
    }
    // reqInfo['header']['Accept-Language'] = i18n.global.locale.value
    removeEmptyKey(reqInfo.data)
    return reqInfo
  })

  http.setResInterceptor(
    (res) => res.data,
    (res) => res,
  )

  return async function request(config, failLog = true) {
    const appAuthStore = useAppAuthStore()
    try {
      if (config.method.toUpperCase() === 'UPLOAD') {
        return Promise.resolve(await http.upload(config))
      } else {
        const res = await http.request(config)
        if (res?.code === 'A401') {
          appAuthStore.onUpdateToken('')
          appAuthStore.onUpdateUsername('')
          appAuthStore.onUpdateUserInfo({})
          utools.route({
            url: '/',
            type: 'reLaunch',
          })
        }
        if (isBoolean(res?.success) && !res?.success && failLog) {
          res?.msg && utools.toast(res.msg)
        }
        return Promise.resolve(res)
      }
    } catch (res) {
      const packRes = {}
      if (res instanceof Error) {
        console.error('捕捉到前端代码错误>>>', { res, config })
        packRes['success'] = false
        // packRes['msg'] = '程序运行错误'
        packRes['msg'] = i18n.global.t('toast.appError')
      } else {
        console.error('捕捉到后端服务错误>>>', { res, config })
        packRes['success'] = false
        // packRes['msg'] = '内部服务器错误'
        packRes['msg'] = i18n.global.t('toast.serverError')
        // if (res?.data?.code == 401) {
        //   setTimeout(() => {
        //     store.commit('appAuth/onAppAuthLogoutMutation')
        //     handleLoginNav()
        //   }, 18)
        // }
      }
      if (failLog) {
        utools.toast(packRes['msg'])
      }
      return packErr ? Promise.resolve(packRes) : Promise.reject(packRes)
    }
  }
}
