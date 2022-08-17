import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  // 生成CSS实用程序的规则
  rules: [[/^bc-(.+)$/, ([, color]) => ({ 'border-color': `${color}` })]],
  // 预处理选择器的变体，具有重写CSS对象的能力。
  variants: [
    matcher => {
      if (matcher.startsWith('hover:')) {
        return {
          matcher: matcher.slice(6),
          selector: s => `${s}:hover`
        }
      } else if (matcher.startsWith('!')) {
        return {
          matcher: matcher.slice(1),
          rewrite: entries => {
            // 在所有 CSS 值中添加 ` !important`
            entries.forEach(e => (e[1] += ' !important'))
            return entries
          }
        }
      }
      return matcher
    }
  ],
  // 类似于Windi CSS的快捷方式，允许您通过组合现有实用程序来创建新的实用程序。
  shortcuts: [],
  theme: {
    colors: {
      body: 'var(--n-resize-trigger-color-hover)',
      primary: 'var(--primary-color)',
      'primary-hover': 'var(--primary-color-hover)',
      'primary-pressed': 'var(--primary-color-pressed)',
      'primary-active': 'var(--primary-color-active)',
      info: 'var(--info-color)',
      'info-hover': 'var(--info-color-hover)',
      'info-pressed': 'var(--info-color-pressed)',
      'info-active': 'var(--info-color-active)',
      success: 'var(--success-color)',
      'success-hover': 'var(--success-color-hover)',
      'success-pressed': 'var(--success-color-pressed)',
      'success-active': 'var(--success-color-active)',
      warning: 'var(--warning-color)',
      'warning-hover': 'var(--warning-color-hover)',
      'warning-pressed': 'var(--warning-color-pressed)',
      'warning-active': 'var(--warning-color-active)',
      error: 'var(--error-color)',
      'error-hover': 'var(--error-color-hover)',
      'error-pressed': 'var(--error-color-pressed)',
      'error-active': 'var(--error-color-active)'
    }
  },
  // 预设
  presets: [
    // 指定预设presetUno
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true
    }),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: 'prose prose-sm m-auto text-left'.split(' ')
})
