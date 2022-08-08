import { RouterLink } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
/**
 * render 图标
 * */
export function renderIcon(icon: string, size?: number) {
  return () => h(SvgIcon, { name: icon, size: size ?? 16 }, { default: () => h(icon) })
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

/**
 * render href
 * */
export function renderHref(link: string, label: string) {
  return h('a', { href: link, target: '_blank' }, label)
}

export function renderHrefOrRouterLink(key: string, label: string) {
  if (/http(s)?:/.test(key)) {
    return renderHref(key, label)
  }
  return renderRouterLink(key, label)
}
