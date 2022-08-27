import Pages from 'vite-plugin-pages'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://github.com/hannoeru/vite-plugin-pages  以文件系统为基础的路由
export default function createPages() {
  return Pages({
    extensions: ['vue', 'md'],
    // 自动读取src/views下的vue文件，生成路由信息，默认路由路径'/‘
    dirs: [{ dir: pathResolve('../../src/views'), baseRoute: '/' }],
    // 异步方式加载路由组件
    importMode: 'async',
    resolver: 'vue',
    // 遍历路由信息，给默认路由加一个redirect
    extendRoute(route) {
      const path = route.path
      if (path === ':did' || path === '/:id') {
        return {
          ...route,
          path: path + '(\\d+)'
        }
      }
      return {
        ...route
      }
    }
  })
}
