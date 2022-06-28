import http from '@utils/http.js'
export const getArticle = () => {
  return http.request({
    url: '/api/getArticle',
    method: 'get',
  })
}
