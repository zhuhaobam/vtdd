import { RouteRecordRaw, RouterLink } from 'vue-router'
import { cloneDeep } from 'lodash-es'
import { AppRouteRecordRaw } from '@/types/router'
import { Component } from 'vue'
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

// h函数是创建节点, 可实现展示template如何渲染到html中的过程,通过字符串渲染到html
export function renderMenuLabel(route: AppRouteRecordRaw) {
  if (route.meta.url) {
    return h(
      'a',
      {
        href: route.meta.url,
        target: '_black'
      },
      { default: () => route.meta.title }
    )
  }
  return h(
    RouterLink,
    {
      to: {
        name: route.children ? '' : route.name
      }
    },
    { default: () => route.meta.title }
  )
}

export function renderIcon(route: AppRouteRecordRaw) {
  return h(SvgIcon, null, { default: () => h(route.meta.icon as Component) })
}
