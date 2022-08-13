//copy by https://github.com/xiong35/image-color-extraction/blob/main/src/utils.ts
export type PixelData = [number, number, number]

function componentToHex(c: number) {
  const hex = c.toString(16)
  return hex.length === 1 ? '0' + hex : hex
}

/**
 * [source code here](https://github.com/xiong35/image-color-extraction/blob/main/src/utils.ts)
 */
export function rgbToHex([r, g, b]: PixelData) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b)
}

/**
 * [source code here](https://github.com/xiong35/image-color-extraction/blob/main/src/utils.ts)
 * @param hex 7 char hex string, e.g. "#ffffff"
 * @returns [r, g, b]
 */
export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) throw `\`${hex}\` is not a valid hex string`
  return result.slice(1, 4).map(r => parseInt(r, 16))
}

/**
 * polyfill for es7 padStart
 * @param toPad `this`
 * @returns padded string
 */
export function padStart(_this: string, targetLength: number, padString: string) {
  targetLength = Math.floor(targetLength) || 0
  if (targetLength < _this.length) return String(_this)

  padString = padString ? String(padString) : ' '

  let pad = ''
  const len = targetLength - _this.length
  let i = 0
  while (pad.length < len) {
    if (!padString[i]) {
      i = 0
    }
    pad += padString[i]
    i++
  }

  return pad + String(_this).slice(0)
}
