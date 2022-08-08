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
