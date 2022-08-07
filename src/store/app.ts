import { defineStore } from 'pinia'
import { createDiscreteApi } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'])
interface IAppStore {
  collapsed: boolean // 菜单处理
  locale: string // 国际化
  title: string // 动态标题
  reload: boolean // 动态刷新
}

// 导出pinia
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      collapsed: false,
      locale: 'zh-CN',
      title: '',
      reload: true
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['collapsed', 'locale', 'title', 'reload'] }]
  },
  getters: {},
  actions: {
    setToggleCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },
    setLocale(locale: string) {
      this.locale = locale
    },
    // 设置网页标题
    setTitle(t: any, title: string) {
      console.log('app.ts设置title')
      this.title = title
      document.title = t(title) + ' - ' + t(import.meta.env.VTDD_APP_TITLE)
    },
    // 设置网页标题
    freshTitle(t: any) {
      console.log('app.ts刷新title')
      const title = this.title ?? ''
      document.title = (title === '' ? '' : t(this.title) + ' - ') + t(import.meta.env.VTDD_APP_TITLE)
    },
    setLoadingBarStart() {
      loadingBar.start()
    },
    setLoadingBarFinish() {
      loadingBar.finish()
    },
    setLoadingBarError() {
      loadingBar.error()
    },
    async setReload() {
      loadingBar.start()
      this.reload = false
      await nextTick()
      this.reload = true
      // 和sleep有异曲同工之妙
      setTimeout(() => {
        loadingBar.finish()
      }, 1)
    }
  }
})
