import http from '@utils/http.js'
export const onLogin = () => {
  return http.request({
    url: '/onlogin',
    method: 'get'
  })
}
