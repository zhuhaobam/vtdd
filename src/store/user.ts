import { defineStore } from 'pinia'

export interface IUserState {
  token: string
  username: string
  welcome: string
  avatar: string
  permissions: string[]
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
    getPermissions(state: { permissions: string[] }): string[] {
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
    // 登出
    async logout() {
      this.setPermissions([])
      this.setUserInfo({})
      this.setToken('')
      return Promise.resolve('')
    }
  }
})
