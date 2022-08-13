import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

// Vite、Webpack 和 Rollup 的自动导入 API
export default function createAutoImport() {
  return AutoImport({
    // targets to transform 【要转换的目标】
    // include: [],
    // global imports to register 【全局导入注册】
    // 引入 vue3 api[*import { ref, torefs, nextTick, onMounted..... } from 'vue'*]
    imports: [
      // presets 【预设】
      'vue',
      'vue-router',
      'vue-i18n',
      'vue/macros',
      '@vueuse/head',
      '@vueuse/core'
      // custom 【自定义】
      // {
      // "@vueuse/components": [
      // named imports 【命名导入】
      // "OnClickOutside", // import { OnClickOutside } from '@vueuse/components',
      // "onClickOutside",
      // "UseDark",
      // alias 【别名】
      // ["useFetch", "useMyFetch"], // import { useFetch as useMyFetch } from '@vueuse/core',
      // ],
      // axios: [
      //   // default imports 【默认导入】
      //   ["default", "axios"], // import { default as axios } from 'axios',
      // ],
      // "[package-name]": [
      //   "[import-names]",
      //   // alias 【别名】
      //   ["[from]", "[alias]"],
      // ],
      // },
    ],
    // eslint报错解决
    eslintrc: {
      // eslintrc是用来解决eslint报错问题的配置项。当enabled为true时，会根据filepath生成一个eslint的配置文件。这个文件需要引入到eslint的配置文件中
      enabled: false, // Default `false`
      filepath: '.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
      globalsPropValue: true // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
    },
    resolvers: [
      NaiveUiResolver(),
      // 自动导入图标组件，Icon解析器
      IconsResolver({
        prefix: 'Icon'
      })
    ],
    // Auto import for all module exports under directories 【目录下的所有模块自动导入】
    dirs: ['src/store'],
    // Filepath to generate corresponding .d.ts file. 【生成相应的.d.ts文件路径】
    // Defaults to './auto-imports.d.ts' when `typescript` is installed locally. 【当typescript安装到本地默认为./auto-imports.d.ts】
    // Set `false` to disable. 【设置为false禁用】
    dts: 'src/dts/auto-import.d.ts'
  })
}
