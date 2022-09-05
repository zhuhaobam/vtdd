<template>
  <div>图片颜色主颜色提取设置为背景</div>
  <div>color.js</div>
  <div flex flex-row justify-center items-center :style="'background-color:' + bg1Color">
    <img object-cover block w-50 h-50 py-10 :src="getAssetsFile('img_login_bg.png')" />
  </div>
  <div>image-color-extraction</div>
  <div flex flex-row justify-center items-center :style="'background-color:' + bg2Color">
    <img object-cover block w-50 h-50 py-10 :src="getAssetsFile('img_login_bg.png')" />
  </div>
</template>
<script setup lang="ts" name="simpleColor">
import { ColorExtractor } from '@/components/ImageMainColor/index'
import { prominent } from 'color.js'
import { getAssetsFile } from '@/plugins/assets-kit'
const bg1Color = ref<any>('')
// 使用外部图像时，当然应该在源上启用CORS 。
// prominent  单一颜色或颜色的调色板
// average  平均颜色
// format: 'hex|array' 颜色的格式
// amount: '3' 当设置为1奇异值时返回，否则返回一个array值
// group: 30 相似颜色
// sample: 10 样本
const amountColorCount = 10
async function asyncProminent() {
  const colors = await prominent(getAssetsFile('img_login_bg.png'), {
    amount: amountColorCount,
    format: 'hex',
    group: 30
  })
  // console.log('colors', colors)
  const checkIndex = 7
  if (colors.length > checkIndex && checkIndex < amountColorCount) {
    bg1Color.value = colors[checkIndex]
  }
}
asyncProminent()

const bg2Color = ref('')
const topColorCount = 4
const extractor = new ColorExtractor({ topColorCount: topColorCount })
extractor.extractColor(getAssetsFile('img_login_bg.png')).then(() => {
  // console.log(extractor.colors)
  // console.log(extractor.chooseReadableColor())
  const colors = extractor.colors ?? []
  const checkIndex = 2
  if (colors.length > checkIndex && checkIndex < topColorCount) {
    bg2Color.value = colors[checkIndex].color
  }
})
</script>
<route lang="yaml">
meta:
  breadcrumb: page.color
  icon: i-ant-design:bg-colors-outlined
  sort: -2
  padding: 10px
</route>
