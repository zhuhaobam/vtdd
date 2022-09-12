import { defineConfig, loadEnv } from 'vite'

// 提取插件放入其他ts文件
import createVitePlugins from './vite/plugins'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://vitejs.dev/config/
export default defineConfig(({ mode, command }) => {
  // 根据当前工作目录中的“mode”加载env文件。
  // 将第三个参数设置为 '' 以加载所有 env，而不考虑 `VTDD_` 前缀。
  const env = loadEnv(mode, process.cwd(), '')
  const { VITE_APP_PORT, VITE_APP_ENV_PREFIX, VTDD_APP_BASE, VTDD_APP_BASE_API } = env
  const port: number = parseInt(VITE_APP_PORT)
  return {
    // 空字符串或./（用于嵌入式部署），目前使用/
    base: VTDD_APP_BASE,
    // 以VTDD_开头的环境变量envPrefix将通过导入暴露给您的客户端源代码。元环境。import.meta.env.VTDD_***
    envPrefix: VITE_APP_ENV_PREFIX,
    // 用户将向项目添加插件devDependencies并使用plugins数组选项对其进行配置。
    plugins: [
      ...createVitePlugins(env, command === 'build')
      // 打包分析,可视化并分析构建包，查看哪些模块占用空间大小，以及模块的依赖关系
      // import visualizer from 'rollup-plugin-visualizer'
      // visualizer({
      //   // 打包后自动打开分析报告
      //   open: true
      // })
    ],
    // 选项可以选择需要或不需要进行预编译的依赖的名称，Vite 则会根据该选项来确定是否对该依赖进行预编译。
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', 'axios', '@vueuse/core', 'drauu', 'ajv-i18n']
    },
    resolve: {
      alias: [
        { find: '@', replacement: pathResolve('src') },
        { find: '@apis', replacement: pathResolve('src/apis') },
        { find: '@assets', replacement: pathResolve('src/assets') },
        { find: '@components', replacement: pathResolve('src/components') },
        { find: '@directive', replacement: pathResolve('src/directive') },
        { find: '@enums', replacement: pathResolve('src/enums') },
        { find: '@hooks', replacement: pathResolve('src/hooks') },
        { find: '@viteplugins', replacement: pathResolve('vite/plugins') },
        { find: '@router', replacement: pathResolve('src/router') },
        { find: '@store', replacement: pathResolve('src/store') },
        { find: '@styles', replacement: pathResolve('src/styles') },
        { find: '@types', replacement: pathResolve('src/types') },
        { find: '@utils', replacement: pathResolve('src/utils') },
        { find: '@views', replacement: pathResolve('src/views') },
        { find: '@class', replacement: pathResolve('src/class') }
      ]
    },
    // 全局scss
    css: {
      preprocessorOptions: {
        scss: {
          // 避免出现: build时的 @charset 必须在第一行的警告
          charset: false,
          additionalData: '@use "@styles/variables.scss" as *;'
        }
      }
    },
    build: {
      outDir: 'dist',
      assetsDir: 'assets', // 指定静态资源存放路径
      sourcemap: false, // 是否构建source map 文件
      minify: 'esbuild', // boolean | 'terser' | 'esbuild',默认esbuild
      chunkSizeWarningLimit: 1500,
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
        [VTDD_APP_BASE_API]: {
          target: 'http://jsonplaceholder.typicode.com',
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp('^' + VTDD_APP_BASE_API), '')
        }
      },
      hmr: true
    }
  }
})
