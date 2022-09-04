import { GlobalTheme, GlobalThemeOverrides } from 'naive-ui'

type settingProjectType = {
  // 导航模式 vertical 左侧菜单模式 horizontal 顶部菜单模式
  navMode: string
  // 顶部
  headerSetting: headerSettingType
  // 进度条
  loadingBarSetting: loadingBarSettingType
  // 菜单
  menuSetting: menuSettingType
  // 多标签
  multiTabsSetting: multiTabsSettingType
  // 面包屑
  crumbsSetting: crumbsSettingType
  // 是否开启路由动画
  isPageAnimate: boolean
  // 路由动画类型
  pageAnimateType: string
}

type headerSettingType = {
  // 背景色
  bgColor: string
  // 固定顶部
  fixed: boolean
  // 显示组件库主题按钮
  isTheme: boolean
  // naive-ui 组件库主题
  mTheme: GlobalTheme | null
  // naive-ui 组件库主题变量
  mThemeOverrides: GlobalThemeOverrides | null
  // 显示重载按钮
  isReload: boolean
  // 重载
  mReload: boolean
  //显示国际化按钮
  isLocal: boolean
  // 国际化
  mLocal: string
  //显示锁屏按钮
  isLock: boolean
  // 锁屏
  mLock: boolean
  // 动态标题，比如国际化显示
  title: string
}

type loadingBarSettingType = {
  // 显示加载进度条
  isLoadingBar: boolean
}

type menuSettingType = {
  // 最小宽度
  minMenuWidth: number
  // 菜单宽度
  menuWidth: number
  // 固定菜单
  fixed: boolean
  // 折叠菜单
  collapsed: boolean
  // 触发移动端侧边栏的宽度
  mobileWidth: number
}

type crumbsSettingType = {
  show: boolean
  showIcon: boolean
}

type multiTabsSettingType = {
  // 背景色
  bgColor: string
  // 是否显示
  fixed: boolean
  // 固定多标签
  show: boolean
}

export type {
  settingProjectType,
  headerSettingType,
  loadingBarSettingType,
  menuSettingType,
  crumbsSettingType,
  multiTabsSettingType
}
