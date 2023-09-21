<template>
  <view class="content">
    <image class="logo" src="/static/images/logo.png" />
    <view>
      <text class="title">{{ mState.title }}</text>
    </view>
    <u-button type="primary" @tap="onTestRequest">测试请求</u-button>
  </view>
</template>

<script setup>
import combo from '@/utils/combo'

const mState = reactive({
  title: '',
})

const onTestRequest = async () => {
  const getRes = await combo.api.getApi()
  console.log('getRes>>>', getRes)
  if (!getRes.success) {
    combo.utools.toast(getRes.msg)
  }
}
</script>

<script>
export default {
  name: 'PageHome',
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
