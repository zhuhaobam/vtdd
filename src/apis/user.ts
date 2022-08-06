import http from '@/utils/http/axios.js'

/**
 * @description: 获取用户信息
 */
export function getUserInfo<T>() {
  return http.request<T>({
    url: '/admin_info',
    method: 'get'
  })
}

/**
 * @description: 用户登录
 */
export function login(params: any) {
  return http.request({
    url: '/login',
    method: 'POST',
    params
  })
}

/**
 * @description: 用户登出
 */
export function logout<T>(params: any) {
  return http.request<T>({
    url: '/login/logout',
    method: 'POST',
    params
  })
}
