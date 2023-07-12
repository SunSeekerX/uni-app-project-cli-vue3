import { defineStore } from 'pinia'

export const useAppSystemInfoStore = defineStore('appSystemInfoStore', {
  state: () => ({
    // 系统信息
    appSystemInfo: uni.getSystemInfoSync(),
    // 窗口高度，部分小程序无法使用
    appWindowInfo: uni.getWindowInfo(),
  }),
  actions: {
    onUpdateAppSystemInfoMutation() {
      this.appSystemInfo = uni.getSystemInfoSync()
    },
    onUpdateAppWindowInfo() {
      this.appWindowInfo = uni.getWindowInfo()
    },
  },
  getters: {
    // 状态栏高度
    statusBarHeightGetter(state) {
      return state.appSystemInfo?.statusBarHeight || 0
    },
    // 导航栏高度
    navBarHeightGetter(state) {
      const statusBarHeight = state?.appSystemInfo?.statusBarHeight || 0
      let navBarHeight = 44
      // #ifdef MP
      const custom = uni.getMenuButtonBoundingClientRect()
      navBarHeight = custom.height + (custom.top - statusBarHeight) * 2
      // #endif
      return navBarHeight
    },
    // 页面高度，排除状态栏、底部安全区域
    pageHeightGetter: (state) =>
      state.appSystemInfo.screenHeight -
      state.appSystemInfo.statusBarHeight -
      state.appSystemInfo.safeAreaInsets.bottom,
    // 是否为 ios 设备
    isIosGetter(state) {
      return state.appSystemInfo?.osName === 'ios'
    },
  },
})
