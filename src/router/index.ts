// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
// 拦截器-导航守卫
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
// <route lang="yaml">
// name: name-override
// meta:
//   layout: false
// </route>

const routes = generatedRoutes.map(v => {
  return v?.meta?.layout !== false ? setupLayouts([v])[0] : v
})

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: routes
})
export default router
