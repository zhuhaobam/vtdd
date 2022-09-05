<template>
  <n-button @click="hasLogin">模拟跳转</n-button>
</template>

<script setup lang="ts" name="login">
import { createDiscreteApi } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
const userStore = useUserStore()

const router = useRouter()
const { message } = createDiscreteApi(['message'])
// https://segmentfault.com/a/1190000024541398   Reflect API

function hasLogin() {
  message.loading('转圈圈...')
  userStore.setToken('ashdyjdgfjjfhkgjfkjhdjfh')
  userStore.setPermissions(['good', 'simple'])
  // message.info('进入首页')
  router.replace('/')
}
</script>
<route lang="yaml">
meta:
  layout: false
  breadcrumb: page.login
  icon: gift
  sort: 100
  hidden: true
</route>
<style lang="scss" scoped>
// test
</style>
