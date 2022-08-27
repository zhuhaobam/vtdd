// /src/router/index.ts
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import { primaryKeepAliveAdjustment } from '@/utils/naiveUiRouter'
const routesLayouts = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})
// keep-alive缓存支持 `{Keep alive cache support}`
// 将文件夹的路由展开，为了支持keep-alive `{Expand the route of the folder to support keep alive}`
const primaryRoutes = primaryKeepAliveAdjustment(routesLayouts)
const routerHash = Boolean(import.meta.env.VTDD_APP_ROUTER_HASH)
const base = import.meta.env.VTDD_APP_BASE
const router = createRouter({
  history: routerHash ? createWebHashHistory(base) : createWebHistory(base),
  routes: primaryRoutes
})
export default router
