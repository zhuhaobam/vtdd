import { RouteRecordRaw, RouterLink } from 'vue-router'
import { cloneDeep } from 'lodash-es'
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
