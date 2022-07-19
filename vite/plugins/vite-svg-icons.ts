import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// 路由的图标自定义
// SvgIcon封装默认前缀icon,这里对应icons目录下面的svg
export default function createSvgIcons() {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [pathResolve('../../src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]'
  })
}
