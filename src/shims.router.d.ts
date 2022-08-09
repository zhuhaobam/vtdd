export {}
import 'vue-router'
declare module 'vue-router' {
  interface RouteMeta {
    icon?: string
    sort?: number
    size?: number
    layout?: boolean
    // 隐藏
    hidden?: boolean
    // 不用检查权限，但是子需要重复这一过程
    noPerm?: boolean
    breadcrumb?: string
    breadcrumbSize?: number
  }

  /**
   * currentRoute.matched
   */
  interface RouteLocationMatched {
    key: string | any
    icon?:
      | VNode<
          RendererNode,
          RendererElement,
          {
            [key: string]: any
          }
        >
      | any
  }

  /**
   * 自定义补充扩展 - 路由 - 类型字段
   */
  interface _RouteRecordBase {
    key: string | any
    label:
      | VNode<
          RendererNode,
          RendererElement,
          {
            [key: string]: any
          }
        >
      | any
    icon?: VNode<
      RendererNode,
      RendererElement,
      | {
          [key: string]: any
        }
      | any
    >
  }
}
