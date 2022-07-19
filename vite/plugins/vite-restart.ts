import ViteRestart from 'vite-plugin-restart'

// 通过监听文件修改，自动重启 vite 服务。
// 最常用的场景就是监听 vite.config.js 和 .env.development 文件
export default function createRestart() {
  const pluginsFile = []
  const fs = require('fs')
  fs.readdirSync('vite/plugins').map(dirname => {
    if (fs.statSync(`vite/plugins/${dirname}`).isFile()) {
      pluginsFile.push(`vite/plugins/${dirname}`)
    }
  })
  return ViteRestart({
    restart: pluginsFile
  })
}
