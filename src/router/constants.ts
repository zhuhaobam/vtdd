// /src/router/constants.ts
// 静态路由,无需权限,如`欢迎页`,`404`,`403` 等
import { AppRouteRecordRaw } from '@/types/router'
import { RouteRecordRaw } from 'vue-router'

export const LAYOUT = () => import('@/layouts/index.vue')
export const BLANK_LAYOUT = () => import('@/layouts/blankLayout.vue')

const routes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    redirect: '/dashboard',
    meta: {
      title: 'Home'
    }
  },
  {
    path: '/not-found',
    name: 'NotFound',
    component: () => import('@/views/system/not-found/index.vue'),
    meta: {
      title: 'NotFound'
    }
  }
]
const constantsRoutes: AppRouteRecordRaw[] = [
  {
    path: '/:pathMatch(.*)',
    name: 'Catch',
    meta: {
      title: '404'
    },
    redirect: '/not-found'
  }
]
export const constants = routes as RouteRecordRaw[]
export const constantsBefore = constantsRoutes
