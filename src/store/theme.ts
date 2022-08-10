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
interface themeLogoType {
  visible: boolean
  height: number
}
interface themeHeaderType {
  height: number
}
interface themeTagType {
  visible: boolean
  height: number
}
interface themeMenuType {
  // 菜单顶部logo、菜单收缩后宽度
  collapsedWidth: number
  // 菜单顶部logo、菜单展开后宽度
  width: number
  // 菜单折叠时图标的大小，如果未设定则使用 icon-size 代替
  collapsedIconSize: number
  // 菜单未折叠时图标替代collapsedIconSize
  minHeight: number
  // 菜单未折叠时图标的大小
  iconSize: number
  // 菜单每级的缩进
  indent: number
  // 菜单第一级的缩进，如果没有设定，使用 indent 代替
  rootIndent: number
  // 菜单让顶部logo的高度
  top: number
  // collapsedIconSize大于minHeight时候的高度补偿，否则不生效
  compensate: number
}
interface themeMainType {
  top: number
}
interface themeType {
  theme: GlobalTheme | null
  themeOverrides: GlobalThemeOverrides | null
  headerTheme: themeHeaderType
  tagTheme: themeTagType
  menuTheme: themeMenuType
  mainTheme: themeMainType
  logoTheme: themeLogoType
}

export const useThemeStore = defineStore('theme', {
  state: (): themeType => {
    return {
      theme: null,
      themeOverrides: null,
      headerTheme: {
        height: 64
      },
      tagTheme: {
        visible: false,
        height: 41
      },
      menuTheme: {
        collapsedWidth: 64,
        width: 240,
        collapsedIconSize: 32,
        minHeight: 42,
        compensate: 40,
        iconSize: 20,
        indent: 20,
        rootIndent: 20,
        top: 64
      },
      mainTheme: {
        top: 105
      },
      logoTheme: {
        visible: true,
        height: 64
      }
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: ['theme', 'themeOverrides', 'headerTheme', 'tagTheme', 'menuTheme', 'mainTheme', 'logoTheme']
      }
    ]
  },
  getters: {
    isNullTheme(): boolean {
      return this.theme === null
    },
    getTheme(): GlobalTheme | null {
      return this.theme
    },
    getThemeOverrides(): GlobalThemeOverrides | null {
      return this.themeOverrides
    }
  },
  actions: {
    setLogoVisible(visible: boolean) {
      this.logoTheme.visible = visible
    },
    setTheme(theme: GlobalTheme | null) {
      this.theme = theme
    },
    setThemeOverrides(themeOverrides: GlobalThemeOverrides | null) {
      this.themeOverrides = themeOverrides
    }
  }
})
