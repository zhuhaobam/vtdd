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
  shortcuts: [
    ['wh-full', 'w-full h-full'],
    ['f-c-c', 'flex justify-center items-center'],
    ['flex-col', 'flex flex-col'],
    ['absolute-lt', 'absolute left-0 top-0'],
    ['absolute-lb', 'absolute left-0 bottom-0'],
    ['absolute-rt', 'absolute right-0 top-0'],
    ['absolute-rb', 'absolute right-0 bottom-0'],
    ['absolute-center', 'absolute-lt f-c-c wh-full'],
    ['text-ellipsis', 'truncate']
  ],
  variants: [
    // hover:
    matcher => {
      if (matcher.startsWith('hover:')) {
        return {
          // slice `hover:` prefix and passed to the next variants and rules
          matcher: matcher.slice(6),
          selector: s => `${s}:hover`
        }
      }
      return matcher
    }
  ],
  rules: [[/^bg-(.+)$/, ([, color]) => ({ 'background-color': `${color}` })]],
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
