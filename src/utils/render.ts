import { RouterLink } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
import { NIcon } from 'naive-ui'
// 动态联网获取图标
// http://icon-sets.iconify.design/ant-design/
import { Icon } from '@iconify/vue'
/**
 * render 图标
 * */
export function renderAssetsIcon(icon: string, size?: number) {
  if (icon.startsWith('i-carbon') || icon.startsWith('i-ant-design')) {
    return renderIconifyWithIcons(icon.slice(2, icon.length), size)
  }
  if (icon.startsWith('i-myself')) {
    return () => h(SvgIcon, { name: icon.slice(9, icon.length), size: size ?? 18 })
  }
  return () => h(SvgIcon, { name: icon, size: size ?? 18 })
}

/**
 * render 图标
 * */
export function renderIconifyWithIcons(icon: string, size?: number) {
  return () => h(Icon, { icon: icon, style: { fontSize: (size ?? 18) + 'px' } })
}

/**
 * render 图标
 * */
export function renderNIconWithIcons(icon: string, size?: number) {
  return () => h(NIcon, { size: size ?? 18 }, { default: () => h('div', { class: icon }) })
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
