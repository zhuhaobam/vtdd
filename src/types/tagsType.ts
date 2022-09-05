import { RouteParams } from 'vue-router'

type tagsType = {
  path: string
  params: RouteParams
  breadcrumb: string
  icon: string
}
type tgsactiveType = {
  tags: tagsType[]
  activeTag: string
}

const noTags = ['/404', '/:id(\\d+)', '/:all(.*)*', '/login', '/system/user', '/system/setting']
const replaceTags = ['/drawing/drauu/:did(\\d+)']
export { noTags, replaceTags }
export type { tagsType, tgsactiveType }
