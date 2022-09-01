import { defineStore } from 'pinia'
interface IFullStore {
  page: 'all:true' | 'inner:true' | 'all:false' | 'inner:false' | 'init'
}

// 导出pinia
export const useFullStore = defineStore('full', {
  state: (): IFullStore => {
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
