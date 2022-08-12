import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'
const modulesFiles: Record<string, any> = import.meta.glob('/mock/source/*.ts', { eager: true })

export function setupProdMockServer() {
  createProdMockServer(
    Object.entries(modulesFiles)
      .map(([key, value]) => {
        return value.default
      })
      .flatMap(v => v)
  )
}
