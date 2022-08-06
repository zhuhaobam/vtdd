import http from '@/utils/http/axios.js'
export function getArticle<T>() {
  return http.request<T>({
    url: '/getArticle',
    method: 'get'
  })
}
