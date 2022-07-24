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
    strategies: [
      { storage: localStorage, paths: ['collapsed'] },
      { storage: localStorage, paths: ['locale'] }
    ]
  },
  getters: {},
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    },
    setLocale(locale: string) {
      this.locale = locale
    }
  }
})
