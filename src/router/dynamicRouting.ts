import router from './index'
router.beforeEach((to: any, from: any, next: () => void) => {
  next()
})

router.afterEach(() => {
  close()
})
