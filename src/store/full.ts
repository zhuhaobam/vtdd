import { defineStore } from 'pinia'
interface IFullStore {
  page: 'all' | 'inner'
}

// 导出pinia
export const useFullStore = defineStore('full', {
  state: (): IFullStore => {
    return {
      page: 'all'
    }
  },
  getters: {
    getPage(state) {
      return state.page
    }
  },
  actions: {
    setPage(page: 'all' | 'inner') {
      this.page = page
    }
  }
})
