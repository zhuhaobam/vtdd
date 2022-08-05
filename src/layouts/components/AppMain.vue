<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAliveRouteNames">
      <component :is="Component" v-if="appStore.reload" :key="route.path" />
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts" name="appMain">
import { useAppStore } from '@store/app'
import { useLoadingBar } from 'naive-ui'
const loadingBar = useLoadingBar()
const appStore = useAppStore()
const router = useRouter()
const allRoutes = router.getRoutes()
const keepAliveRouteNames = computed(() => {
  return allRoutes.filter(route => route.meta?.keepAlive).map(route => route.name as string)
})
// 全局前置守卫(如果用户无法进入页面时你希望避免执行的操作）的理想位置
router.beforeEach((to, from, next) => {
  loadingBar.start()
  next()
})
// 全局后置钩子
router.afterEach((to, from, failure) => {
  loadingBar.finish()
})
</script>
