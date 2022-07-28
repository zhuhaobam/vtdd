// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
function sortRoute(a: any, b: any) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0)
}
generatedRoutes.sort(sortRoute)

const routes = generatedRoutes.map(v => {
  const currentMenu = v?.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: routes
})
export default router
