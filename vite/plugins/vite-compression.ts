import viteCompression from 'vite-plugin-compression'

// 静态资源压缩
export default function createCompression() {
  return viteCompression({
    verbose: true,
    disable: false, // 不禁用压缩
    deleteOriginFile: false, // 压缩后是否删除原文件
    threshold: 10240, // 压缩前最小文件大小
    algorithm: 'gzip', // 压缩算法
    ext: '.gz' // 文件类型
  })
}
