<template>
  <n-layout style="height: 100vh" :position="'static'" has-sider>
    <n-layout-header bordered position="absolute">
      <AppHeader v-model:collapsed="collapsed" :inverted="false" />
    </n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px" has-sider>
      <n-layout-sider
        :position="'static'"
        :collapsed="collapsed"
        collapse-mode="width"
        :native-scrollbar="false"
        bordered
        @collapse="collapsed = true"
        @expand="collapsed = false"
      >
        <SideBar />
      </n-layout-sider>
      <n-layout content-style="padding: 24px;" :native-scrollbar="false">
        <AppMain></AppMain>
      </n-layout>
    </n-layout>
    <n-layout-footer position="absolute" style="height: 64px; padding: 24px" bordered text-center>
      {{ t('foo') }}
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts" setup>
import AppHeader from './components/header/index.vue'
import SideBar from './components/sidebar/index.vue'
import { useAppStore } from '@store/app'
import { useUserStore } from '@store/user'
import { storeToRefs } from 'pinia'
import router from '@router/index'
import { useLoadingBar } from 'naive-ui'
import AppMain from './components/AppMain.vue'

const loadingBar = useLoadingBar()
const userStore = useUserStore()
const { t } = useI18n()
const appStore = useAppStore()
const { collapsed } = storeToRefs(appStore)
watch(
  collapsed,
  (newVal, oldVal) => {
    appStore.setToggleCollapsed(newVal)
  },
  { immediate: true, deep: true }
)
// 布局路由守卫处理
// 全局前置守卫(如果用户无法进入页面时你希望避免执行的操作）的理想位置
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫[layouts/index.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
  loadingBar.start()
  appStore.setTitle(t, to.meta?.breadcrumb as string)
  if (to.name !== 'login' && !isAuthenticated()) {
    next({ name: 'login' })
  } else {
    next()
  }
})
const isAuthenticated = () => {
  return userStore.getToken !== ''
}
// 全局后置钩子
// https://router.vuejs.org/zh/guide/advanced/navigation-failures.html
// https://router.vuejs.org/zh/guide/advanced/navigation-failures.html#%E5%AF%BC%E8%88%AA%E6%95%85%E9%9A%9C%E7%9A%84%E5%B1%9E%E6%80%A7
router.afterEach((to, from, failure) => {
  console.log('全局后置钩子[layouts/index.vue]', 'from:' + from.fullPath, 'to:' + to.fullPath)
  loadingBar.finish()
})
// 全局解析守卫
router.beforeResolve(async to => {
  console.log('全局解析守卫[layouts/index.vue]', 'to:' + to.fullPath)
  // if (to.meta.requiresCamera) {
  //   try {
  //     await askForCameraPermission()
  //   } catch (error) {
  //     if (error instanceof NotAllowedError) {
  //       // ... 处理错误，然后取消导航
  //       return false
  //     } else {
  //       // 意料之外的错误，取消导航并把错误传给全局处理器
  //       throw error
  //     }
  //   }
  // }
})
</script>

<style lang="scss" scoped>
.n-layout-header {
  height: 60px;
  border-bottom: 1px solid #eee;
}
</style>
