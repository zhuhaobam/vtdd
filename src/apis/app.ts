import http from '@/utils/http/axios.js'
import { RetryResult } from 'axios'
export const onLogin = () => {
  return http.request({
    url: '/onlogin',
    method: 'get'
  })
}

export const onTest = () => {
  return http.request({
    url: '/ontest',
    method: 'get',
    retry: {
      shouldRetry: (res: RetryResult) => res.code === 404
    }
  })
}

export const onTry = () => {
  return http.request({
    url: '/aaaaaa/ttttttt',
    method: 'get',
    retry: {
      needRetry: true
    }
  })
}
