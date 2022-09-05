import App from './App.vue'

import 'normalize.css'
// 引入unocss的uno.css
import 'uno.css'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import '@/styles/index.scss'
import '@/styles/markdown.css'

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
import VueVirtualScroller from 'vue-virtual-scroller'

import 'prismjs'
// default(prism.css灰色) dark(prism-dark.css暗红背景紫色突出)funky(prism-funky.css条纹背景)
// okaidia(prism-okaidia.css蓝色突出) solarizedlight(黄色背景) tomorrow(紫色突出)
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-java'

import { createApp } from 'vue'
createApp(App)
  .use(router)
  .use(pinia)
  .use(i18n)
  .use(JsonViewer)
  .use(VueVirtualScroller)
  .use(StarportPlugin({ keepAlive: true }))
  .directive('permission', permission)
  .mount('#app')
