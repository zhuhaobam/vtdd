//  mockProdServer.ts
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const modules = import.meta.globEager('/mock/source/*.ts')

export function setupProdMockServer() {
  createProdMockServer(
    Object.entries(modules).map(item => {
      return item[1].default[0]
    })
  )
}
