import App from './App.vue'

import 'normalize.css'
// 引入unocss的uno.css
import 'uno.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '@/styles/index.scss'

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

// 页面呈现json
import JsonViewer from 'vue3-json-viewer'

// 虚拟滚动条
import { DynamicScroller } from 'vue-virtual-scroller'

import { createApp } from 'vue'
createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(JsonViewer)
  .component('DynamicScroller', DynamicScroller)
  .use(StarportPlugin({ keepAlive: true }))
  .directive('permission', permission)
  .mount('#app')
