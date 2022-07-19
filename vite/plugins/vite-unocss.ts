import Unocss from 'unocss/vite'

export default function createUnocss() {
  return Unocss({
    configFile: 'unocss.config.ts'
  })
}
