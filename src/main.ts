import { createApp } from 'vue'
import App from './App.vue'

// mock
import { setupProdMockServer } from '@/mock'

// pinia持久化
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

// 路由router
import router from '@/router'

// 动态路由router
import './router/dynamicRouting'

import 'uno.css'

//  Vue 跨路由组件共享
import StarportPlugin from 'vue-starport'

//  I18n
import i18n from '@plugins/i18n'
const app = createApp(App)
const prodMock = Boolean(import.meta.env.VTDD_PROD_MOCK)
if (prodMock === true) {
  setupProdMockServer()
}
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(StarportPlugin({ keepAlive: true }))

app.use(router).use(pinia).use(i18n).mount('#app')
