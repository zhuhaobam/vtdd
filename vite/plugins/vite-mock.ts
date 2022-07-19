import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from 'path'
// __dirname 获取当前文件所属目录的绝对路径,给定的路径序列从右到左处理，每个后续的 path 会被追加到前面，直到构建绝对路径
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)

export default function createMock(env: { VTDD_DEV_MOCK: any; VTDD_PROD_MOCK: any }) {
  const { VTDD_DEV_MOCK, VTDD_PROD_MOCK } = env
  const devMock = Boolean(VTDD_DEV_MOCK)
  const prodMock = Boolean(VTDD_PROD_MOCK)
  return viteMockServe({
    mockPath: 'mock/source', // 解析，路径可根据实际变动
    localEnabled: devMock, // 开发环境
    prodEnabled: prodMock, // 生产环境设为true，也可以根据官方文档格式
    injectCode: ` import { setupProdMockServer } from './mockProdServer';
    setupProdMockServer(); `,
    watchFiles: true, // 监听文件内容变更
    injectFile: 'src/main.ts' //  在main.ts注册后需要在此处注入，否则可能报找不到setupProdMockServer的错误
  })
}
