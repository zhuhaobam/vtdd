// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { primaryKeepAliveAdjustment } from '@/utils/router'

const routesLayouts = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})
// keep-alive缓存支持 `{Keep alive cache support}`
// 将文件夹的路由展开，为了支持keep-alive `{Expand the route of the folder to support keep alive}`
const primaryRoutes = primaryKeepAliveAdjustment(routesLayouts)

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: primaryRoutes
})

export default router
