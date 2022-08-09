/**
 * @description 国际化资源加载，刷新保持功能
 *
 **/
import { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStore } from '@store/app'
import { storeToRefs } from 'pinia'

const localPathPrefix = '../../locales/'
// import i18n resources
// https://vitejs.dev/guide/features.html#glob-import
// const messages = Object.fromEntries(
//   Object.entries(import.meta.glob<{ default: any }>('../../locales/*.y(a)?ml', { eager: true })).map(([key, value]) => {
//     const yaml = key.endsWith('.yaml')
//     return [key.slice(localPathPrefix.length, yaml ? -5 : -4), value.default]
//   })
// )
export function loadLang() {
  const modules: Record<string, any> = import.meta.glob('../../locales/*.y(a)?ml', { eager: true })
  const langs: Record<string, any> = {}
  for (const key in modules) {
    const yaml = key.endsWith('.yaml')
    const keyName = key.slice(localPathPrefix.length, yaml ? -5 : -4)
    langs[keyName] = modules[key].default
  }
  console.log(langs)
  return langs
}

const install = (app: App) => {
  const appStore = useAppStore()
  const { locale } = storeToRefs(appStore)
  const i18n = createI18n({
    // legacy: false,
    globalInjection: true,
    locale: locale.value,
    fallbackLocale: 'zh-CN',
    messages: loadLang()
  })
  app.use(i18n)
}

export default install
