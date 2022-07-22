import { defineStore } from 'pinia'

interface IAppStore {
  collapsed: boolean
}

// 导出pinia
export const useAppStore = defineStore('app', {
  state: (): IAppStore => {
    return {
      collapsed: false
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['collapsed'] }]
  },
  getters: {},
  actions: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed
    }
  }
})
