import http from '@/utils/http/axios.js'
export const onLogin = () => {
  return http.request({
    url: '/onlogin',
    method: 'get'
  })
}

export const onTry = () => {
  return http.request({
    url: '/aaaaaa/ttttttt',
    method: 'get'
  })
}
