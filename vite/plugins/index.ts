import vue from '@vitejs/plugin-vue'
import createRestart from './vite-restart'
import createJsx from './vite-jsx'
import createSvgIcons from './vite-svg-icons'
import createVueI18n from './vite-vue-i18n'
import createAutoImport from './auto-import'
import createUnocss from './vite-unocss'
import createVueComponents from './vue-components'
import createIcons from './vite-icons'
import createVueSetupExtend from './vite-vue-setup-extend'
import createMock from './vite-mock'
import createLayouts from './vite-vue-layouts'
import createPages from './vite-pages'
import createCompression from './vite-compression'
import createInspect from './vite-inspect'
import createMySelf from './vite-myself'
import type { PluginOption } from 'vite'

export default function createVitePlugins(env: any, isBuild = false) {
  let vitePlugins: PluginOption[] = []
  vitePlugins = [
    vue({
      include: [/\.vue$/, /\.md$/]
    })
  ]
  !isBuild && vitePlugins.push(createRestart())
  vitePlugins.push(createJsx())
  vitePlugins.push(createSvgIcons())
  vitePlugins.push(createVueI18n())
  vitePlugins.push(createUnocss())
  vitePlugins.push(createAutoImport())
  vitePlugins.push(createVueComponents())
  vitePlugins.push(createIcons())
  vitePlugins.push(createVueSetupExtend())
  vitePlugins.push(createMock(env))
  vitePlugins.push(createLayouts())
  vitePlugins.push(createPages())
  vitePlugins.push(createMySelf())
  isBuild && vitePlugins.push(createCompression())
  vitePlugins.push(createInspect())
  return vitePlugins
}
