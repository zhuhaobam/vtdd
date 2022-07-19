import Layouts from 'vite-plugin-vue-layouts'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://github.com/JohnCampionJr/vite-plugin-vue-layouts 页面布局系统
export default function createLayouts() {
  return Layouts({
    layoutsDirs: pathResolve('../../src/layouts'), //layout布局文件存放目录
    defaultLayout: 'index' // 默认布局，对应 src/layout/index.vue
  })
}
