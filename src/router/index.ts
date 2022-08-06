// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

const routesLayouts = generatedRoutes.map(v => {
  const currentMenu = v.meta?.layout !== false ? setupLayouts([v])[0] : v
  return currentMenu
})
const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: routesLayouts
})

export default router
