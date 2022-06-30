// /src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
// 静态路由,无需权限,如`欢迎页`,`404`,`403` 等
import { constants } from './constants'
// 拦截器-导航守卫
import { createGuard } from './guard'

const router = createRouter({
  history: createWebHistory(import.meta.env.VTDD_APP_BASE),
  routes: [...constants]
})

createGuard(router)

export default router
