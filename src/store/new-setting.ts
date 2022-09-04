import { settingProjectType } from '@/types/settingType'
import { defineStore } from 'pinia'
import { createDiscreteApi, GlobalTheme } from 'naive-ui'
const { loadingBar } = createDiscreteApi(['loadingBar'])

// 导出pinia
export const useNewSettingStore = defineStore('new-setting', {
  state: (): settingProjectType => {
    return {
      //导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
      navMode: 'vertical',
      //顶部
      headerSetting: {
        //背景色
        bgColor: '#fff',
        //固定顶部
        fixed: true,
        // 显示组件库主题按钮
        isTheme: true,
        // naive-ui 组件库主题
        mTheme: null,
        // naive-ui 组件库主题变量
        mThemeOverrides: {
          common: {
            primaryColor: '#18a058',
            primaryColorSuppl: '#18a058',
            primaryColorHover: 'blue',
            successColorHover: '#f0a020',
            successColorSuppl: '#f0a020'
          }
        },
        // 显示重载按钮
        isReload: true,
        // 重载
        mReload: true,
        //显示国际化按钮
        isLocal: true,
        // 国际化
        mLocal: 'zh-CN',
        //显示锁屏按钮
        isLock: true,
        // 锁屏
        mLock: false,
        // 动态标题，比如国际化显示
        title: ''
      },
      // 进度条
      loadingBarSetting: {
        // 显示加载进度条
        isLoadingBar: true
      },
      //菜单
      menuSetting: {
        //最小宽度
        minMenuWidth: 64,
        //菜单宽度
        menuWidth: 200,
        //固定菜单
        fixed: true,
        //触发移动端侧边栏的宽度
        mobileWidth: 800,
        // 折叠菜单
        collapsed: false
      },
      //多标签
      multiTabsSetting: {
        //背景色
        bgColor: '#fff',
        //是否显示
        show: true,
        //固定多标签
        fixed: true
      },
      //面包屑
      crumbsSetting: {
        //是否显示
        show: true,
        //显示图标
        showIcon: false
      },
      //是否开启路由动画
      isPageAnimate: true,
      //路由动画类型
      pageAnimateType: 'zoom-fade'
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        paths: [
          'navMode',
          'headerSetting',
          'loadingBarSetting',
          'multiTabsSetting',
          'menuSetting',
          'crumbsSetting',
          'isPageAnimate',
          'pageAnimateType'
        ]
      }
    ]
  },
  getters: {
    getMLocal(state) {
      return state.headerSetting.mLocal
    },
    getMTheme(state) {
      return state.headerSetting.mTheme
    }
  },
  actions: {
    toggleCollapsed(collapsed: boolean) {
      this.menuSetting.collapsed = !collapsed
    },
    settingMTheme(mTheme: GlobalTheme | null) {
      this.headerSetting.mTheme = mTheme
    },
    settingMLock(mLock: boolean) {
      this.headerSetting.mLock = mLock
    },
    settingMLocale(mLocal: string) {
      this.headerSetting.mLocal = mLocal
    },
    settingTitle(title: string) {
      this.headerSetting.title = title
    },
    settingDocumentTitle(title: string) {
      document.title = title
    },
    loadingBarStart() {
      loadingBar.start()
    },
    loadingBarFinish() {
      loadingBar.finish()
    },
    loadingBarError() {
      loadingBar.error()
    },
    async settingReload() {
      this.loadingBarStart()
      this.headerSetting.mReload = false
      await nextTick()
      this.headerSetting.mReload = true
      setTimeout(() => {
        this.loadingBarFinish()
      }, 1)
    }
  }
})
