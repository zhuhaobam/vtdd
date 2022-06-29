import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@views/AboutView.vue')
  },
  {
    path: '/first',
    name: 'first',
    component: () => import('@/views/starport/FirstStarport.vue')
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('@/views/starport/SecondStarport.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router
