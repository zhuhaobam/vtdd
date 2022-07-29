export {}
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    sort?: number
    layout?: boolean
    hidden?: boolean
  }
}
