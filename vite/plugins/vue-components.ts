import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// Vue 的按需组件自动导入。
// 支持组件和指令。
// 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等，由unplugin提供支持。
// 仅注册您使用的组件。
// 文件夹名称作为命名空间。
// 完整的 TypeScript 支持。
// 流行 UI 库的内置解析器。 【*ElementPlusResolver*AntDesignVueResolver*VantResolver... ...】
// 与unplugin-icons完美配合。
export default function createVueComponents() {
  return Components({
    // filters for transforming targets 【过滤要转换的目标】
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
    // relative paths to the directory to search for components. 【相对路径下的目录搜索组件】
    dirs: [pathResolve('../../src/components')],
    // valid file extensions for components. 【组件的有效文件扩展名】
    extensions: ['vue', 'md'],
    // search for subdirectories 【搜索子目录】
    deep: true,
    // generate `components.d.ts` global declarations,
    // also accepts a path for custom filename
    // default: `true` if package typescript is installed
    dts: pathResolve('../../src/dts/components.d.ts'),
    // resolvers for custom components 【自定义组件解析器】
    resolvers: [
      NaiveUiResolver(),
      // 您还可以快速编写自己的解析器
      // example of importing Vant 【导入Vant示例】
      // (componentName) => {
      //   // where `componentName` is always CapitalCase 【其中'componentName'始终是大写字母】
      //   if (componentName.startsWith("Van"))
      //     return { name: componentName.slice(3), from: "vant" };
      // },
      // 自动注册图标组件，Icon解析器，i-carbon-*,i-twemoji-*, @iconify-json/carbon 是 carbon 的图标库, @iconify-json/twemoji 是 twemoji 的图标库
      IconsResolver({
        enabledCollections: ['ant-design', 'myself']
      })
    ]
    // 全局注册组件的类型
    // 一些库可能会注册一些全局组件供您在任何地方使用（例如 Vue Router 提供<RouterLink>和<RouterView>）。
    // 由于它们是全局可用的，因此此插件无需导入它们。但是，这些通常不是 TypeScript 友好的，您可能需要手动注册它们的类型。
    // 所以RouterLinkandRouterView将出现在components.d.ts.
    // types: [
    //   {
    //     from: "vue-router",
    //     names: ["RouterLink", "RouterView"],
    //   },
    // ],
  })
}
