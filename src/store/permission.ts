import { onLogin } from '@apis/app'
import { filterAsyncRoutes } from '@utils/router'
import { asyncRoutes } from '@router/routes'
import { defineStore } from 'pinia'
import { RouteRecordRaw } from 'vue-router'

interface IPermissionStore {
  authRoutes: RouteRecordRaw[]
}

export const usePermissionStore = defineStore('permission', () => {
  const store: IPermissionStore = reactive({
    authRoutes: []
  })

  async function generateRoutes() {
    const { data: { permList = [] } = {} } = await onLogin()
    console.log('权限路由', permList)
    store.authRoutes = filterAsyncRoutes(asyncRoutes, permList)
  }

  return {
    ...toRefs(store),
    generateRoutes
  }
})
