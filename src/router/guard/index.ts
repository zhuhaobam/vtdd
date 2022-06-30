// 拦截器-导航守卫
import { Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { createTabGuard } from './tabGuard'

export function createGuard(router: Router) {
  createPermissionGuard(router)
  createTabGuard(router)
}
