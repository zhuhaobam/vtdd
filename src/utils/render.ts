import { RouterLink } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
import { NIcon } from 'naive-ui'
// 动态联网获取图标
// http://icon-sets.iconify.design/ant-design/
import { Icon } from '@iconify/vue'

/**
 * render 图标,主要针对面包屑使用
 * */
export function renderAssetsIcon(icon: string, size?: number) {
  if (icon.startsWith('i-carbon') || icon.startsWith('i-ant-design')) {
    return renderIconifyWithIcons(icon.slice(2, icon.length), size)
  }
  if (icon.startsWith('i-myself')) {
    return () => h(SvgIcon, { name: icon.slice(9, icon.length), size: size ?? 16 })
  }
  return () => h(SvgIcon, { name: icon, size: size ?? 16 })
}

/**
 * render 图标,主要针对菜单使用，默认继承size
 * */
export function renderDefaultAssetsIcon(icon: string) {
  if (icon.startsWith('i-carbon') || icon.startsWith('i-ant-design')) {
    return () => h(Icon, { icon: icon.slice(2, icon.length) })
  }
  if (icon.startsWith('i-myself')) {
    return () => h(SvgIcon, { name: icon.slice(9, icon.length) })
  }
  return () => h(SvgIcon, { name: icon })
}

/**
 * render 图标
 * 联网下载图标
 * */
export function renderIconifyWithIcons(icon: string, size?: number) {
  return () => h(Icon, { icon: icon, style: { fontSize: (size ?? 16) + 'px' } })
}

/**
 * render 图标
 * 这种方式加载图标，需要页面其他地方用过并先执行过
 * */
export function renderNIconWithIcons(icon: string, size?: number) {
  return () => h(NIcon, { size: size ?? 16 }, { default: () => h('div', { class: icon }) })
}

/**
 * render RouterLink
 * */
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
