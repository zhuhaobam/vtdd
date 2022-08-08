import { RouteRecordRaw } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { renderIcon, renderRouterLink } from './render'
// 浅拷贝 Object.assign({}, this.person)
// 深拷贝 lodash-es cloneDeep

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
 * setupLayouts函数后的路由进行初级合并处理
 * [由于setupLayouts函数将一级路由放置到children[0]中，
 * 现将路由从children[0]中取出，并将children[0]外的component，path合并回去]
 * @param routes
 */
export function primaryAdjustment(routes: RouteRecordRaw[]): RouteRecordRaw[] {
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
 * 将文件夹的路由展开，为了支持keep-alive `{Expand the route of the folder to support keep alive}`
 * @param routes
 * @returns
 */
export function primaryKeepAliveAdjustment(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  return routes.map(vx => {
    const v = cloneDeep(vx)
    const hasChildren = (v.children?.length ?? 0) > 0
    const info = hasChildren ? v.children![0] : v
    const singlePage = !((info.children?.length ?? 0) > 0)
    if (!hasChildren || singlePage) {
      return v
    }
    const result: RouteRecordRaw = {
      ...info,
      path: v.path
    }
    result.component = v.component
    return result
  })
}

/**
 * keyLabel和图标处理
 * @param routes
 * @returns
 */
export function keyLabelAdjustment(routes: RouteRecordRaw[], t: any): RouteRecordRaw[] {
  routes.sort(sortRoute)
  return routes.map(vx => {
    const info = cloneDeep(vx)
    const result: RouteRecordRaw = {
      ...info,
      key: info.meta?.link ? info.meta?.link : info.name
    }
    result.component = info.component
    if (info.meta?.icon) {
      result.icon = renderIcon(info.meta.icon)
    }
    if (info.children?.length) {
      result.children = keyLabelAdjustment(info.children, t)
      result.label = t(info.meta?.breadcrumb as string)
    } else {
      const link = /http(s)?:/.test((info.meta?.link as string) ?? '')
      if (link) {
        result.label = t(info.meta?.breadcrumb as string)
      }
      if (!link) {
        result.label = renderRouterLink(info.name as string, t(info.meta?.breadcrumb as string))
      }
      // **菜单那里处理了link
    }
    return result
  })
}

/**
 * 路由排序
 * @param a
 * @param b
 * @returns
 */
function sortRoute(a: any, b: any) {
  return (a.meta?.sort ?? 0) - (b.meta?.sort ?? 0)
}
