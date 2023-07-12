import { defineStore } from 'pinia'

import * as constant from '@/constant'
import { userinfoSelectApi } from '@/apis'

const token = uni.getStorageSync(constant.STORAGE_TOKEN)
const username = uni.getStorageSync(constant.STORAGE_USERNAME)
const userInfo = uni.getStorageSync(constant.STORAGE_USER_INFO)

export const useAppAuthStore = defineStore('appAuthStore', {
  state: () => ({
    token,
    username,
    userInfo: userInfo || {},
  }),
  actions: {
    onUpdateToken(val) {
      this.token = val
      uni.setStorageSync(constant.STORAGE_TOKEN, val)
    },
    onUpdateUsername(val) {
      this.username = val
      uni.setStorageSync(constant.STORAGE_USERNAME, val)
    },
    onUpdateUserInfo(val) {
      this.userInfo = val
      uni.setStorageSync(constant.STORAGE_USER_INFO, val)
    },
    async onGetUserInfo() {
      const res = await userinfoSelectApi()
      if (res.success) {
        console.log('onGetUserInfo>>>', res.data)
        this.userInfo = res.data
        uni.setStorageSync(constant.STORAGE_USER_INFO, res.data)
      }
    },
    onLoginOut() {
      this.token = ''
      this.username = ''
      this.userInfo = {}
      uni.removeStorageSync(constant.STORAGE_TOKEN)
      uni.removeStorageSync(constant.STORAGE_USERNAME)
      uni.removeStorageSync(constant.STORAGE_USER_INFO)
    },
  },
  getters: {
    isLogin: (state) => !!state.token,
  },
})
