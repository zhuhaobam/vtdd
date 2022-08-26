import { RouterLink } from 'vue-router'
// 自定义本地svg SvgIcon
import SvgIcon from '@/components/SvgIcon/index.vue'
// NIcon首推获取图标
import { BugOutline } from '@vicons/ionicons5'
import { Component } from 'vue'
import { NIcon } from 'naive-ui'
// 联网下载图标
import { Icon } from '@iconify/vue'

/**
 * render 图标
 * 根据前缀识别加载方式
 * */
export function hFunctionIcon(icon: string, size?: number) {
  if (icon) {
    const len = icon.length
    if (icon.startsWith('i-carbon:') || icon.startsWith('i-ant-design:')) {
      return renderIconifyByNetWork(icon.slice(2, len), size)
    }
    return renderSvgIcon(icon.slice(icon.startsWith('i-myself-') ? 9 : 0, len), size)
  }
  return renderNIconByNetWork(BugOutline)
}

/**
 * NIcon首推获取图标
 * @param icon  Component
 * @returns @vicons/ionicons5=>NIcon
 */
export const renderNIconByNetWork = (icon: Component) => {
  return () =>
    h(NIcon, null, {
      default: () => h(icon)
    })
}

/**
 * 自定义本地svg SvgIcon
 * @param icon string
 * @param size? number
 * @returns  SvgIcon
 */
export function renderSvgIcon(icon: string, size?: number) {
  return () => h(SvgIcon, { name: icon, size: size ?? 20 })
}

/**
 * 联网下载图标
 * @param icon  string
 * @param size? number
 * @returns  @iconify/vue=>Icon
 */
export function renderIconifyByNetWork(icon: string, size?: number) {
  if ((size ?? 0) > 0) {
    return () => h(Icon, { icon: icon, style: { fontSize: size + 'px' } })
  }
  return () => h(Icon, { icon: icon })
}

/**
 * 返回 RouterLink
 * @param name  string
 * @param label string
 * @returns  RouterLink
 */
export function renderRouterLink(name: string, label: string) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: name
        }
      },
      { default: () => label }
    )
}
