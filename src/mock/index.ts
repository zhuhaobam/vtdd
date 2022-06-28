//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const modules = import.meta.globEager('./**/*.ts')

export function setupProdMockServer() {
  for (const [key, module] of Object.entries(modules)) {
    console.log(key, module.default[0])
  }
  createProdMockServer(
    Object.entries(modules).map(item => {
      return item[1].default[0]
    })
  )
}
