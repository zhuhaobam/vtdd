import { RouteRecordRaw, RouterLink } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import SvgIcon from '@components/SvgIcon/index.vue'
// 浅拷贝 Object.assign({}, this.person)
// 深拷贝 lodash-es cloneDeep

/**
 * setupLayouts函数后的路由进行初级合并处理
 * [由于setupLayouts函数将一级路由放置到children[0]中，
 * 现将路由从children[0]中取出，并将children[0]外的component，path合并回去]
 * @param routes
 */
export function primaryAdjustment(routes: RouteRecordRaw[]) {
  return routes.map(vx => {
    const v = cloneDeep(vx)
    const hasChildren = (v.children?.length ?? 0) > 0
    const info = hasChildren ? v.children![0] : v
    const result: RouteRecordRaw = {
      ...info,
      path: v.path
    }
    result.component = v.component
    return result
  })
}

/**
 * 隐藏过滤
 * @param routes
 * @param permList
 * @param prefix
 * @returns
 */
export function filterHiddenRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.filter(vx => {
    const v = cloneDeep(vx)
    const hasChildren = (v.children?.length ?? 0) > 0
    const info = hasChildren ? v.children![0] : v
    return (info.meta?.hidden || false) !== true
  })
}

/**
 * keyLabel和图标处理
 * @param routes
 * @returns
 */
export function keyLabelAdjustment(routes: RouteRecordRaw[], t: any) {
  return routes.map(vx => {
    const info = cloneDeep(vx)
    const hasChildren = (info.children?.length ?? 0) > 0
    const result: RouteRecordRaw = {
      ...info,
      key: info.name
    }
    const hasMeta = (info?.meta ?? '') !== ''
    const hasIcon = (info.meta?.icon ?? '') !== ''
    if (hasMeta && hasIcon) {
      const icon = info.meta!.icon!
      result.icon = renderIcon(icon)
    }
    if (hasChildren) {
      result.component = info.component
      result.children = keyLabelAdjustment(info.children!, t)
    } else {
      result.component = info.component
      result.label = renderRouterLink({ name: info.name as string, label: t(info.label as string) })
    }
    return result
  })
}

/**
 * render 图标
 * */
export function renderIcon(icon: string) {
  return () => h(SvgIcon, { name: icon, size: 16 }, { default: () => h(icon) })
}
/**
 * render RouterLink
 * */
export function renderRouterLink(info: { name: string; label: string }) {
  return () =>
    h(
      RouterLink,
      {
        to: {
          name: info.name
        }
      },
      { default: () => info.label }
    )
}
