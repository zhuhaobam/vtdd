// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routes = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: routes
})
console.log('route.ts', generatedRoutes)

// 全局解析守卫
router.beforeResolve(async to => {
  console.log('全局解析守卫', to)
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

export default router
