import { MockMethod } from 'vite-plugin-mock'
export default [
  {
    url: '/api/onlogin', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          permList: ['/dashboard', '/dashboard/analysis', '/dashboard/workbench']
        }
      }
    }
  }
] as MockMethod[]
