/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />
/// <reference types="vite-plugin-vue-layouts/client" />
// 用于 TypeScript 的智能感知

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 暴露出去的自定义环境变量，用于 TypeScript 的智能感知
// interface ImportMetaEnv {
//   readonly VTDD_DESC: string
//   readonly VTDD_PROD_MOCK: boolean
// }

// interface ImportMeta {
//   readonly env: ImportMetaEnv
// }
