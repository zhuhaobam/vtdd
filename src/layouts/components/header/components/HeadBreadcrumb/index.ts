import { renderAssetsIcon } from '@/utils/render'
import { RouteLocationMatched, RouteRecordRaw } from 'vue-router'

export function headBreadcrumbMatched(routerMatched: RouteLocationMatched[], t: any): RouteLocationMatched[] {
  return routerMatched
    .filter(item => item.name !== undefined)
    .map(item => {
      const currentMenu: RouteLocationMatched = {
        ...item,
        key: item.name,
        props: item.props ? { default: true } : item.props
      }
      if (item.meta?.icon) {
        currentMenu.icon = renderAssetsIcon(item.meta.icon as string, item.meta.breadcrumbSize)
      }
      // 是否有子菜单，并递归处理
      if (item.children?.length) {
        currentMenu.children = headBreadcrumbRouteRecordRaw(item.children, t)
      }
      return currentMenu
    })
}

export function headBreadcrumbRouteRecordRaw(routerMatched: RouteRecordRaw[], t: any): RouteRecordRaw[] {
  return routerMatched
    .filter(item => item.name !== undefined)
    .map(item => {
      const currentMenu: RouteRecordRaw = {
        ...item,
        key: item.name,
        label: t(item.meta?.breadcrumb as string)
      }
      if (item.meta?.icon) {
        currentMenu.icon = renderAssetsIcon(item.meta.icon as string, item.meta.size)
      }
      // 是否有子菜单，并递归处理
      if (item.children?.length) {
        currentMenu.children = headBreadcrumbRouteRecordRaw(item.children, t)
      }
      currentMenu.props = item.props ? { default: true } : item.props
      return currentMenu
    })
}
