import { RouterLink } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
import { NIcon } from 'naive-ui'
/**
 * render 图标
 * */
export function renderAssetsIcon(icon: string, size?: number) {
  if (icon.startsWith('i-carbon') || icon.startsWith('i-ant-design')) {
    return renderNIconWithIcons(icon, size)
  }
  if (icon.startsWith('i-myself')) {
    return () => h(SvgIcon, { name: icon.slice(9, icon.length), size: size ?? 18 })
  }
  return () => h(SvgIcon, { name: icon, size: size ?? 18 })
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
