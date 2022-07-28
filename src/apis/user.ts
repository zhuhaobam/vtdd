import http from '@utils/http.js'

/**
 * @description: 获取用户信息
 */
export function getUserInfo() {
  return http.request({
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
export function logout(params: any) {
  return http.request({
    url: '/login/logout',
    method: 'POST',
    params
  })
}
