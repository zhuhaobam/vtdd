import { hFunctionIcon } from '@/utils/hFunctionRender'
import { cloneDeep } from 'lodash-es'
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
        currentMenu.icon = hFunctionIcon(item.meta.icon as string)
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
    .filter(vx => {
      const v = cloneDeep(vx)
      const hasChildren = (v.children?.length ?? 0) > 0
      const info = hasChildren ? v.children![0] : v
      return (info.meta?.hidden || false) !== true
    })
    .map(item => {
      const currentMenu: RouteRecordRaw = {
        ...item,
        key: item.name,
        label: t(item.meta?.breadcrumb as string)
      }
      if (item.meta?.icon) {
        currentMenu.icon = hFunctionIcon(item.meta.icon as string)
      }
      // 是否有子菜单，并递归处理
      if (item.children?.length) {
        currentMenu.children = headBreadcrumbRouteRecordRaw(item.children, t)
      }
      currentMenu.props = item.props ? { default: true } : item.props
      return currentMenu
    })
}
