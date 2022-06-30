import { createApp } from 'vue'
import App from './App.vue'

//引入Elmessage和Elloading的css样式文件
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/el-message.css'

// 引入unocss的uno.css
import 'uno.css'

// mock
import { setupProdMockServer } from '@/mock'
const prodMock = Boolean(import.meta.env.VTDD_PROD_MOCK)
if (prodMock === true) {
  setupProdMockServer()
}

// 路由准备的svg，当然其ta页面也可以使用
import 'virtual:svg-icons-register'

// pinia持久化【注册】
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

// 路由route【注册】
import router from '@/router'

//  Vue 跨路由组件共享【注册】
import StarportPlugin from 'vue-starport'

//  I18n【注册】
import i18n from '@plugins/i18n'

createApp(App)
  .use(StarportPlugin({ keepAlive: true }))
  .use(router)
  .use(pinia)
  .use(i18n)
  .mount('#app')
