import { defineStore } from 'pinia'

// 创建store,命名规则： useXxxxStore
// 参数1：store的唯一表示
// 参数2：对象，可以提供state actions getters
// 在src/store文件夹中创建index.js文件
// state 相当于 data
// actions 相当于 methods
// getters 相当于 computed( computed是vue的计算属性，是根据依赖关系进行缓存的计算，只有在它的相关依赖发生改变时才会进行更新

// 导出pinia
import type { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'

interface headerType {
  height: number
}
interface tagsType {
  visible: boolean
  height: number
}
interface themeType {
  theme: GlobalTheme | null
  themeOverrides: GlobalThemeOverrides | null
  header: headerType
  tags: tagsType
}

export const useThemeStore = defineStore('theme', {
  state: (): themeType => {
    return {
      theme: null,
      themeOverrides: null,
      header: {
        height: 60
      },
      tags: {
        visible: false,
        height: 60
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['theme', 'themeOverrides'] }]
  },
  getters: {
    isNullTheme(): boolean {
      return this.theme === null
    },
    getTheme(): GlobalTheme | null {
      return this.theme
    }
  },
  actions: {
    setTheme(theme: GlobalTheme | null) {
      this.theme = theme
    }
  }
})
