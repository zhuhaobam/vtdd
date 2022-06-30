import { useTabStore } from '@store/tab'
import { Router } from 'vue-router'

const whiteList = ['/not-found']

export function createTabGuard(router: Router) {
  router.beforeEach((to, from, next) => {
    const tabStore = useTabStore()
    const tabIndex = tabStore.getTabIndex(to)
    if (tabIndex !== -1 && to.fullPath !== tabStore.tabs[tabIndex].fullPath) {
      tabStore.tabs.splice(tabIndex, 1)
    }
    next()
  })
  router.afterEach(to => {
    if (whiteList.includes(to.path)) {
      return
    }
    const tabStore = useTabStore()
    tabStore.addTab(to)
  })
}
