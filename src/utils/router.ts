import { RouteRecordRaw, RouterLink } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import SvgIcon from '@components/SvgIcon/index.vue'
// 浅拷贝 Object.assign({}, this.person)
// 深拷贝 lodash-es cloneDeep

export function filterAsyncRoutes(routes: RouteRecordRaw[], permList: string[], prefix = ''): RouteRecordRaw[] {
  const mirrorRoutes: RouteRecordRaw[] = []
  routes.forEach(route => {
    const mirrorObjects: RouteRecordRaw = cloneDeep<RouteRecordRaw>(route)
    const path = mirrorObjects.path.charAt(0) === '/' ? mirrorObjects.path : `${prefix}${mirrorObjects.path}`
    if (mirrorObjects.meta?.noPerm) {
      mirrorRoutes.push(mirrorObjects)
    } else if (permList.includes(path)) {
      if (mirrorObjects.children) {
        mirrorObjects.children = filterAsyncRoutes(mirrorObjects.children, permList, `${prefix}${mirrorObjects.path}/`)
      }
      mirrorRoutes.push(mirrorObjects)
    }
  })
  return mirrorRoutes
}

export function generatorMenu(t: any, ro: Array<any>) {
  return filterRouter(ro).map(itemx => {
    const item = cloneDeep(itemx)
    const lena = item.children?.length || 0
    const info = lena === 1 ? item.children[0] : item
    const currentMenu = {
      ...info,
      path: item.path,
      key: info.name,
      icon: renderIcon(info.meta?.icon)
    }
    if ((info.children?.length || 0) > 0) {
      currentMenu.children = generatorMenu(t, info.children)
      currentMenu.component = item.component
      currentMenu.label = t(info.meta?.title)
    } else {
      currentMenu.label = renderRouterLink({ name: info.name, label: t(info.meta?.title) })
    }
    return currentMenu
  })
}

/**
 * 排除Router
 * */
export function filterRouter(routerMap: Array<any>) {
  return routerMap.filter(item => {
    const info = (item.children?.length || 0) === 0 ? item : item.children[0]
    return (info.meta?.hidden || false) !== true
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
