import { RouterLink } from 'vue-router'
import SvgIcon from '@components/SvgIcon/index.vue'
import { NIcon } from 'naive-ui'
// 动态联网获取图标
// http://icon-sets.iconify.design/ant-design/
import { Icon } from '@iconify/vue'
/**
 * render 图标
 * 根据前缀识别加载方式,无size
 * */
export function renderDefaultAssetsIcon(icon: string) {
  const len = icon.length
  if (icon.startsWith('i-carbon') || icon.startsWith('i-ant-design')) {
    return () => h(Icon, { icon: icon.slice(2, len) })
  }
  return () => h(SvgIcon, { name: icon.slice(icon.startsWith('i-myself-') ? 9 : 0, len) })
}

/**
 * render 图标
 * 根据前缀识别加载方式
 * */
export function renderAssetsIcon(icon: string, size?: number) {
  const len = icon.length
  if (icon.startsWith('i-carbon:') || icon.startsWith('i-ant-design:')) {
    return h(Icon, { icon: icon.slice(2, len), style: { fontSize: (size ?? 20) + 'px' } })
  }
  return () =>
    h(SvgIcon, {
      name: icon.slice(icon.startsWith('i-myself-') ? 9 : 0, len),
      size: size ?? 20
    })
}

/**
 * render 图标
 *  SvgIcon
 * */
export function renderSvgIcon(icon: string, size?: number) {
  return () => h(SvgIcon, { name: icon, size: size ?? 20 })
}

/**
 * render 图标
 * 联网下载图标
 * */
export function renderIconifyIconsByNetWork(icon: string, size?: number) {
  return () => h(Icon, { icon: icon, style: { fontSize: (size ?? 20) + 'px' } })
}

/**
 * render 图标
 * 需要页面提前使用过
 * */
export function renderNIconByAlready(icon: string, size?: number) {
  return () => h(NIcon, { size: size ?? 20 }, { default: () => h('div', { class: icon }) })
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
