import { defineStore } from 'pinia'
import cookiesStorage from '@plugins/cookiesStorage'

// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
// 在src/store文件夹中创建index.js文件
// state 相当于 data
// actions 相当于 methods
// getters 相当于 computed( computed是vue的计算属性，是根据依赖关系进行缓存的计算，只有在它的相关依赖发生改变时才会进行更新

const useStarportStore = defineStore('starport', {
  state: () => {
    return {
      images: [],
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: cookiesStorage, paths: ['images'] }],
  },
  getters: {
    getImages(state: { images: string[] }): string[] {
      return state.images
    },
  },
  actions: {
    setImages(value: string[]) {
      this.images = value
    },
  },
})
// 导出pinia
export { useStarportStore }
