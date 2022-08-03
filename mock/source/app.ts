import { MockMethod } from 'vite-plugin-mock'
import { Random } from 'mockjs'
export default [
  {
    url: '/api/onlogin', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        data: {
          permList: ['/dashboard', '/dashboard/analysis', '/dashboard/workbench'],
          other: Random.integer(1, 100)
        }
      }
    }
  },
  {
    url: '/api/ontest', // 注意，这里只能是string格式
    method: 'get',
    response: () => {
      let code = 200
      return {
        code: code,
        message: 'ok',
        data: {
          other:Random.integer(1, 100)
        }
      }
    }
  }
] as MockMethod[]
