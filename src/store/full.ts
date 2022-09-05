import { fullScreenType } from '@/types/fullType'
import { defineStore } from 'pinia'

// 导出pinia
export const useFullStore = defineStore('full', {
  state: (): fullScreenType => {
    return {
      page: 'init'
    }
  },
  getters: {
    getPage(state) {
      return state.page
    },
    inner(state) {
      return state.page.startsWith('inner')
    },
    innerTrue(state) {
      return state.page.startsWith('inner:true')
    },
    all(state) {
      return state.page.startsWith('all')
    }
  },
  actions: {
    setPage(page: 'all:true' | 'inner:true' | 'all:false' | 'inner:false' | 'init') {
      this.page = page
    }
  }
})
