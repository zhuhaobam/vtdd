// Type definitions for vue-virtual-scroller and  vue 3
// Project: https://github.com/Akryum/vue-virtual-scroller/
// declare module 'vue-virtual-scroller' {
//   type Plugin_2<Option = any> =
//     | (PluginInstallFunction<Option> & {
//         install?: PluginInstallFunction<Option>
//       })
//     | {
//         install: PluginInstallFunction<Option>
//       }
//   export { Plugin_2 as Plugin }

//   type PluginInstallFunction<Option> = (app: App, ...options: Option[]) => any

//   interface App {
//     //use(plugin: Plugin_2, ...options: any[]): this; // this line overrides below (because of any)
//     use<Option>(plugin: Plugin_2<Option>, ...options: Option[]): this
//   }

//   export const install: PluginInstallFunction<any>
// }
declare module 'vue-virtual-scroller' {
  import Vue, { ComponentOptions, PluginObject, Component } from 'vue'
  interface PluginOptions {
    installComponents?: boolean
    componentsPrefix?: string
  }

  const plugin: PluginObject<PluginOptions> & { version: string }

  export const RecycleScroller: Component<any, any, any, any>
  export const DynamicScroller: Component<any, any, any, any>
  export const DynamicScrollerItem: Component<any, any, any, any>

  export function IdState(options?: { idProp?: (vm: any) => any }): ComponentOptions<Vue> | typeof Vue

  export default plugin
}
