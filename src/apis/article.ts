import http from '@/utils/http/axios.js'
export const getArticle = () => {
  return http.request({
    url: '/getArticle',
    method: 'get'
  })
}
