import { defineStore } from 'pinia'

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
      reload: false
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
      this.title = title
      document.title = t(title) + ' - ' + t(import.meta.env.VTDD_APP_TITLE)
    },
    setReload() {
      this.reload = !this.reload
    }
  }
})
