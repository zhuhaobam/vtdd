import http from '@/utils/http/axios.js'
import { RetryResult } from 'axios'
export function onLogin<T>() {
  return http.request<T>({
    url: '/onlogin',
    method: 'get',
    params: {
      name: 'baibai',
      label: '白白'
    }
  })
}

export function onTest<T>() {
  return http.request<T>({
    url: '/ontest',
    method: 'POST',
    retry: {
      shouldRetry: (res: RetryResult) => res.code === 404
    }
  })
}

export function onTry<T>() {
  return http.request<T>({
    url: '/aaaaaa/ttttttt',
    method: 'get',
    retry: {
      needRetry: true
    }
  })
}
