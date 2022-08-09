import App from './App.vue'

import '@/styles/index.scss'

// 引入unocss的uno.css
import 'uno.css'

// 路由准备的svg，当然其ta页面也可以使用
import 'virtual:svg-icons-register'

// pinia持久化【注册】
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
const pinia = createPinia()
pinia.use(piniaPersist)

// 路由route【注册】
import router from '@router/index'

//  Vue 跨路由组件共享【注册】
import StarportPlugin from 'vue-starport'

//  I18n【注册】
import i18n from '@/plugins/i18n'
import { permission } from '@directive/permission'

import JsonViewer from 'vue-json-viewer'

import { createApp } from 'vue'
createApp(App)
  .use(StarportPlugin({ keepAlive: true }))
  .use(router)
  .use(pinia)
  .use(i18n)
  .directive('permission', permission)
  .use(JsonViewer)
  .mount('#app')
