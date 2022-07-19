import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// http://icon-sets.iconify.design/ant-design/
// 图标插件,当您导入它们时，它将安装图标集。将自动检测到正确的包管理器,当前是 @iconify-json/ep 是 Element Plus 的图标库
export default function createIcons() {
  return Icons({
    autoInstall: true,
    compiler: 'vue3',
    // 自定义图标加载
    customCollections: {
      // 这里是存放svg图标的文件地址，myself是自定义图标库的名称
      // 给svg文件设置fill="currentColor"属性，使图标的颜色具有适应性
      // <el-icon :size="30" color="red">
      //   <i-myself-color />
      // </el-icon>
      myself: FileSystemIconLoader(pathResolve('../../src/assets/icons'), svg =>
        svg.replace(/^<svg /, '<svg fill="currentColor" ')
      )
    }
  })
}
