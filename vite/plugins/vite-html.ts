import { createHtmlPlugin } from 'vite-plugin-html'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

// https://github.com/vbenjs/vite-plugin-html/blob/main/README.zh_CN.md
export default function createHtml(env) {
  const { VTDD_APP_TITLE } = env
  return createHtmlPlugin({
    minify: true,
    /**
     * 在这里写entry后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
     * @default src/main.ts
     */
    entry: 'src/main.ts',
    /**
     * 如果你想将 `index.html`存放在指定文件夹，可以修改它，否则不需要配置
     * @default index.html
     */
    template: 'index.html',

    /**
     * 需要注入 index.html ejs 模版的数据
     */
    inject: {
      data: {
        title: VTDD_APP_TITLE,
        injectScript: `<script src="/inject.js"></script>`
      },
      tags: [
        {
          injectTo: 'body-prepend',
          tag: 'div',
          attrs: {
            id: 'tag'
          }
        }
      ]
    }
  })
}
