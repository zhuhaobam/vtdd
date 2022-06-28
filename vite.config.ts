import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
// Vite、Webpack 和 Rollup 的自动导入 API
import AutoImport from 'unplugin-auto-import/vite'
// Vue 的按需组件自动导入。
// 支持组件和指令。
// 支持 Vite、Webpack、Vue CLI、Rollup、esbuild 等，由unplugin提供支持。
// 仅注册您使用的组件。
// 文件夹名称作为命名空间。
// 完整的 TypeScript 支持。
// 流行 UI 库的内置解析器。 【*ElementPlusResolver*AntDesignVueResolver*VantResolver... ...】
// 与unplugin-icons完美配合。
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { viteMockServe } from 'vite-plugin-mock'
import VueI18n from '@intlify/vite-plugin-vue-i18n'
// http://icon-sets.iconify.design/carbon/
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
// https://uno.antfu.me/?s=text
import Unocss from 'unocss/vite'
// 优化依赖自动化插件
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'

import vueJsx from '@vitejs/plugin-vue-jsx'
// 静态资源压缩
import viteCompression from 'vite-plugin-compression'
// 打包分析,可视化并分析构建包，查看哪些模块占用空间大小，以及模块的依赖关系
import visualizer from 'rollup-plugin-visualizer'
// Inspect 查看组件自动依赖效果
import Inspect from 'vite-plugin-inspect'

// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // 根据当前工作目录中的“mode”加载env文件。
  // 将第三个参数设置为 '' 以加载所有 env，而不考虑 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_APP_BASE, VITE_APP_PORT, VITE_APP_ENV_PREFIX, VTDD_DEV_MOCK, VTDD_PROD_MOCK } = env
  const port: number = parseInt(VITE_APP_PORT)
  const devMock = Boolean(VTDD_DEV_MOCK)
  const prodMock = Boolean(VTDD_PROD_MOCK)
  return {
    base: VITE_APP_BASE, // 空字符串或./（用于嵌入式部署），目前使用/
    envPrefix: VITE_APP_ENV_PREFIX, // 以VTDD_开头的环境变量envPrefix将通过导入暴露给您的客户端源代码。元环境。import.meta.env.VTDD_***
    // 用户将向项目添加插件devDependencies并使用plugins数组选项对其进行配置。
    plugins: [
      vue(),
      vueJsx(),
      Unocss({
        configFile: pathResolve('src/unocss.config.ts')
      }),
      // https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
      VueI18n({
        runtimeOnly: true,
        compositionOnly: true,
        include: [pathResolve('locales/**')]
      }),
      viteMockServe({
        mockPath: './src/mock/source', // 解析，路径可根据实际变动
        localEnabled: devMock, // 开发环境
        prodEnabled: prodMock, // 生产环境设为true，也可以根据官方文档格式
        injectCode: ` import { setupProdMockServer } from './src/mock';
        setupProdMockServer(); `,
        watchFiles: true, // 监听文件内容变更
        injectFile: pathResolve('src/main.ts') //  在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
      }),
      AutoImport({
        // targets to transform 【要转换的目标】
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
          /\.md$/ // .md
        ],
        // global imports to register 【全局导入注册】
        // 引入 vue3 api[*import { ref, torefs, nextTick, onMounted..... } from 'vue'*]
        imports: [
          // presets 【预设】
          'vue',
          'vue-router',
          'vue-i18n',
          'vue/macros',
          // '@vueuse/head',
          '@vueuse/core'
          // custom 【自定义】
          // {
          // "@vueuse/components": [
          // named imports 【命名导入】
          // "OnClickOutside", // import { OnClickOutside } from '@vueuse/components',
          // "onClickOutside",
          // "UseDark",
          // alias 【别名】
          // ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
          // ],
          // axios: [
          //   // default imports 【默认导入】
          //   ["default", "axios"], // import { default as axios } from 'axios',
          // ],
          // "[package-name]": [
          //   "[import-names]",
          //   // alias 【别名】
          //   ["[from]", "[alias]"],
          // ],
          // },
        ],
        // eslint报错解决
        eslintrc: {
          // eslintrc是用来解决eslint报错问题的配置项。当enabled为true时，会根据filepath生成一个eslint的配置文件。这个文件需要引入到eslint的配置文件中
          enabled: false, // Default `false`
          filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
        resolvers: [
          // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)，自动导入 Element Plus 组件
          ElementPlusResolver(),
          // 自动导入图标组件，Icon解析器
          IconsResolver({
            prefix: 'Icon'
          })
        ],
        // Auto import for all module exports under directories 【目录下的所有模块自动导入】
        dirs: ['src/store'],
        // Filepath to generate corresponding .d.ts file. 【生成相应的.d.ts文件路径】
        // Defaults to './auto-imports.d.ts' when `typescript` is installed locally. 【当typescript安装到本地默认为./auto-imports.d.ts】
        // Set `false` to disable. 【设置为false禁用】
        dts: 'src/auto-import.d.ts'
      }),
      Components({
        // filters for transforming targets 【过滤要转换的目标】
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/
        ],
        exclude: [/[\\/]node_modules[\\/]/, /[\\/]\.git[\\/]/, /[\\/]\.nuxt[\\/]/],
        // relative paths to the directory to search for components. 【相对路径下的目录搜索组件】
        dirs: ['src/components'],
        // valid file extensions for components. 【组件的有效文件扩展名】
        extensions: ['vue'],
        // search for subdirectories 【搜索子目录】
        deep: true,
        // generate `components.d.ts` global declarations,
        // also accepts a path for custom filename
        // default: `true` if package typescript is installed
        dts: 'src/components.d.ts',
        // resolvers for custom components 【自定义组件解析器】
        resolvers: [
          ElementPlusResolver(),
          // 您还可以快速编写自己的解析器
          // example of importing Vant 【导入Vant示例】
          // (componentName) => {
          //   // where `componentName` is always CapitalCase 【其中'componentName'始终是大写字母】
          //   if (componentName.startsWith("Van"))
          //     return { name: componentName.slice(3), from: "vant" };
          // },
          // 自动注册图标组件，Icon解析器，i-carbon-*,i-twemoji-*, @iconify-json/carbon 是 carbon 的图标库, @iconify-json/twemoji 是 twemoji 的图标库
          IconsResolver({
            enabledCollections: ['carbon', 'myself', 'twemoji']
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
      }),
      // 图标插件,当您导入它们时，它将安装图标集。将自动检测到正确的包管理器,当前是 @iconify-json/ep 是 Element Plus 的图标库
      Icons({
        autoInstall: true,
        compiler: 'vue3',
        // 自定义图标加载
        customCollections: {
          // 这里是存放svg图标的文件地址，myself是自定义图标库的名称
          // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
          // <el-icon :size="30" color="red">
          //   <el-icon><i-myself-color /></el-icon>
          // </el-icon>
          myself: FileSystemIconLoader('./src/assets/icons', svg => svg.replace(/^<svg /, '<svg fill="currentColor" '))
        }
      }),
      //  optimizeDeps.include 使用插件处理，处理获得依赖优化选项在package.json
      PkgConfig(),
      //  依赖优化选项,选项可以选择需要或不需要进行预编译的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预编译。
      OptimizationPersist(),
      viteCompression({
        verbose: true,
        disable: false, // 不禁用压缩
        deleteOriginFile: false, // 压缩后是否删除原文件
        threshold: 10240, // 压缩前最小文件大小
        algorithm: 'gzip', // 压缩算法
        ext: '.gz' // 文件类型
      }),
      visualizer({
        // 打包后自动打开分析报告
        open: true
      }),
      // Inspect 查看组件自动依赖效果
      Inspect()
    ],
    // 选项可以选择需要或不需要进行预编译的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预编译。
    // optimizeDeps: {
    //   include: ['vue', 'vue-router', 'pinia', 'axios']
    // },
    resolve: {
      alias: [
        { find: '@', replacement: pathResolve('src') },
        { find: '@mock', replacement: pathResolve('src/mock') },
        { find: '@plugins', replacement: pathResolve('src/plugins') },
        { find: '@assets', replacement: pathResolve('src/assets') },
        { find: '@views', replacement: pathResolve('src/views') },
        { find: '@components', replacement: pathResolve('src/components') },
        { find: '@utils', replacement: pathResolve('src/utils') },
        { find: '@types', replacement: pathResolve('src/types') }
      ]
    },
    // 全局scss
    css: {
      preprocessorOptions: {
        scss: {
          // 避免出现: build时的 @charset 必须在第一行的警告
          charset: false,
          additionalData: '@use "@/styles/globalstyle.scss" as *;'
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets', // 指定静态资源存放路径
      sourcemap: false, // 是否构建source map 文件
      minify: 'esbuild', // boolean | 'terser' | 'esbuild',默认esbuild
      rollupOptions: {
        input: {
          main: pathResolve('index.html')
        },
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    // https://vitejs.dev/config/index.html#server-proxy
    server: {
      host: '0.0.0.0',
      port,
      proxy: {
        '/api': {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})
