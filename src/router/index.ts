import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@views/HomeView.vue'),
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@views/AboutView.vue'),
  },
  {
    path: '/first',
    name: 'first',
    component: () => import('@views/starport/first.vue'),
  },
  {
    path: '/second',
    name: 'second',
    component: () => import('@views/starport/second.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to: any, from: any, next: () => void) => {
  console.log('router 路由守卫：', to, from)

  next()
})

router.afterEach(() => {
  close()
})

export default router
