import { defineStore } from 'pinia'
import { ResultEnum } from '@/enums/httpEnum'
import { getUserInfo, login } from '@apis/user'

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: any[]
  info: any
}

// 导出pinia
export const useUserStore = defineStore('user', {
  state: (): IUserState => {
    return {
      token: '',
      username: '',
      welcome: '',
      avatar: '',
      permissions: [],
      info: {}
    }
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, paths: ['token', 'username', 'welcome', 'avatar', 'permissions', 'info'] }]
  },
  getters: {
    getToken(state: { token: string }): string {
      return state.token
    },
    getAvatar(state: { avatar: string }): string {
      return state.avatar
    },
    getNickname(state: { username: string }): string {
      return state.username
    },
    getPermissions(state: { permissions: any[] }): [any][] {
      return state.permissions
    },
    getUserInfo(state: { info: object }): object {
      return state.info
    }
  },
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    setPermissions(permissions: any[]) {
      this.permissions = permissions
    },
    setUserInfo(info: object) {
      this.info = info
    },
    // 登录
    async login(userInfo: any) {
      try {
        const response = await login(userInfo)
        if (response.code === ResultEnum.SUCCESS) {
          this.setToken(response.token)
          this.setUserInfo(result)
        }
        return Promise.resolve(response)
      } catch (e) {
        return Promise.reject(e)
      }
    },

    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res: unknown) => {
            const result = res
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions
              this.setPermissions(permissionsList)
              this.setUserInfo(result)
            } else {
              reject(new Error('getInfo: permissionsList must be a non-null array !'))
            }
            this.setAvatar(result.avatar)
            resolve(res)
          })
          .catch((error: any) => {
            reject(error)
          })
      })
    },

    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo({})
      this.setToken('')
      return Promise.resolve('')
    }
  }
})
