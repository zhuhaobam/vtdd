import VueI18n from '@intlify/vite-plugin-vue-i18n'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://github.com/intlify/bundle-tools/tree/main/packages/vite-plugin-vue-i18n
export default function createVueI18n() {
  return VueI18n({
    runtimeOnly: true,
    compositionOnly: true,
    include: [pathResolve('../../locales/**')]
  })
}
