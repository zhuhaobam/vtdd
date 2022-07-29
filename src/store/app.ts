import { defineStore } from 'pinia'

interface IAppStore {
  collapsed: boolean
  locale: string
}

// 导出pinia
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      collapsed: false,
      locale: 'zh-CN'
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['collapsed', 'locale'] }]
  },
  getters: {},
  actions: {
    setToggleCollapsed(collapsed: boolean) {
      this.collapsed = collapsed
    },
    setLocale(locale: string) {
      this.locale = locale
    }
  }
})
