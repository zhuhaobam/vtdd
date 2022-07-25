<template>
  <div>
    <div>
      vite-plugin-vue-setup-extend包的name="firstSecond"决定了路由层级，你细看我写的first到third目录页面就能揣摩出来，结合我的路由处理
    </div>
    <div>script setup lang="ts" name="firstSecond"</div>
    <div>{{ t('toggle-language') }}</div>
    <i-myself-color w10 h10 color="red" />
    <n-space mb-2>
      <n-button id="undo" title="撤销" @click="changeUndo()">↩️</n-button>
      <n-button id="redo" title="还原" @click="changeRedo()">↪️</n-button>
      <n-button id="clear" title="清除" style="font-size: 25px" @click="changeClear()">🗑</n-button>
      <n-button
        id="m-stylus"
        title="Stylus"
        :type="modeModal === 'stylus' ? 'primary' : undefined"
        dashed
        @click="changeMode('stylus')"
        >✍️</n-button
      >
      <n-button
        id="m-eraser"
        title="Eraser"
        :type="modeModal === 'eraseLine' ? 'primary' : undefined"
        dashed
        @click="changeMode('eraseLine')"
        >⚪️</n-button
      >
      <n-button
        id="m-draw"
        title="笔"
        :type="modeModal === 'draw' ? 'primary' : undefined"
        dashed
        @click="changeMode('draw')"
      >
        ✏️
      </n-button>
      <n-button
        id="m-line"
        title="直线"
        :type="modeModal === 'line' ? 'primary' : undefined"
        pl-6
        pr-6
        dashed
        @click="changeMode('line')"
        >⁄</n-button
      >
      <n-button
        id="m-arrow"
        title="箭头"
        :type="modeModal === 'arrow' ? 'primary' : undefined"
        dashed
        @click="changeModeA()"
        >↗
      </n-button>
      <n-button
        id="m-rect"
        title="长方形"
        :type="modeModal === 'rectangle' ? 'primary' : undefined"
        pl-6
        pr-6
        dashed
        @click="changeMode('rectangle')"
        >⃞</n-button
      >
      <n-button
        id="m-ellipse"
        title="椭圆"
        :type="modeModal === 'ellipse' ? 'primary' : undefined"
        pl-4
        pr-8
        dashed
        @click="changeMode('ellipse')"
        >⃝</n-button
      >
      <n-color-picker
        pt-4
        pb-4
        pl-12
        pr-12
        :modes="['hex']"
        :swatches="['#FFFFFF', '#18A058', '#2080F0', '#F0A020', 'rgba(208, 48, 80, 1)']"
        :actions="['confirm']"
        @confirm="handleUpdateColorValue"
      />
      <n-button
        data-color="#000000"
        :type="colorModal === 'dark' ? 'primary' : undefined"
        dashed
        @click="changeColor('dark')"
      >
        ​⚫️​
      </n-button>
      <n-button
        data-color="#ed153d"
        title="Red"
        :type="colorModal === 'red' ? 'primary' : undefined"
        dashed
        @click="changeColor('red')"
        >​🔴​</n-button
      >
      <n-button
        data-color="#ed9a26"
        title="Orange"
        :type="colorModal === 'orange' ? 'primary' : undefined"
        dashed
        @click="changeColor('orange')"
        >​🟠​​</n-button
      >
      <n-button
        data-color="#ede215"
        title="Yellow"
        :type="colorModal === 'yellow' ? 'primary' : undefined"
        dashed
        @click="changeColor('yellow')"
        >​​🟡​​</n-button
      >
      <n-button
        data-color="#30bd20"
        title="Green"
        :type="colorModal === 'green' ? 'primary' : undefined"
        dashed
        @click="changeColor('green')"
        >​🟢​​</n-button
      >
      <n-button
        data-color="#2656bf"
        title="Blue"
        :type="colorModal === 'blue' ? 'primary' : undefined"
        dashed
        @click="changeColor('blue')"
        >​​🔵​​</n-button
      >
      <n-button
        data-color="#c24aed"
        title="Purple"
        :type="colorModal === 'purple' ? 'primary' : undefined"
        dashed
        @click="changeColor('purple')"
        >​🟣​​</n-button
      >
      <n-button
        data-color="#bf6b26"
        title="Brown"
        :type="colorModal === 'brown' ? 'primary' : undefined"
        dashed
        @click="changeColor('brown')"
        >​​🟤​</n-button
      >
      <input
        v-model="rangeSize"
        flex
        items-center
        h7
        type="range"
        min="1"
        max="10"
        step="0.5"
        name="Size"
        :title="'笔画粗细 ' + rangeSize + ' '"
      />
      <n-button
        title="Solid"
        :type="
          dasharrayModal === 'solid' && modeModal !== 'stylus' && modeModal !== 'eraseLine' ? 'primary' : undefined
        "
        dashed
        @click="changeSolid()"
        >—</n-button
      >
      <n-button
        title="Dashed"
        :type="
          dasharrayModal === 'dashed' && modeModal !== 'stylus' && modeModal !== 'eraseLine' ? 'primary' : undefined
        "
        dashed
        @click="changeDasharray()"
        >┅
      </n-button>
      <n-button
        title="Dotted"
        :type="
          dasharrayModal === 'dotted' && modeModal !== 'stylus' && modeModal !== 'eraseLine' ? 'primary' : undefined
        "
        dashed
        @click="changeDotted()"
        >⋯</n-button
      >
      <n-button title="Download" @click="down()">📥</n-button>
    </n-space>
    <svg id="svg" w-full flex-auto z-10 h100 border style="touch-action: none"></svg>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
    <n-h2>海淀桥</n-h2>
  </div>
</template>
<script setup lang="ts" name="dashboardAnalysis">
import { onLogin } from '@apis/app'
import { Brush, Drauu, DrawingMode, EventsMap, Options, Point, createDrauu } from 'drauu'
const { t } = useI18n()
let drauu: Drauu
onMounted(() => {
  onLogin().then((res: any) => {
    console.log(res)
  })
  drauu = createDrauu({
    el: '#svg',
    brush: {
      color: '#000',
      size: 3,
      dasharray: undefined
    }
  })
})
// 切换画笔
// 'line','draw', 'stylus','reactangle', 'ellipse'
const modeModal = ref('stylus')
function changeMode(dm: DrawingMode) {
  drauu.mode = dm
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.arrowEnd = false
  modeModal.value = dm
}
function changeModeA() {
  drauu.mode = 'line'
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.arrowEnd = true
  modeModal.value = 'arrow'
}
const colorModal = ref('dark')
function changeColor(color: string) {
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.color = color
  colorModal.value = color
}
//
const handleUpdateColorValue = (value: string) => {
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.color = value
  colorModal.value = 'undefined'
}
// 切花画笔粗细
const rangeSize = ref(3)
watch(
  rangeSize,
  (newVal, oldVal) => {
    nextTick(() => {
      const a = drauu.options as Options
      const b = a.brush as Brush
      b.size = newVal
    })
  },
  { immediate: true, deep: true }
)
// 撤销
function changeUndo() {
  drauu.undo()
}
// 还原
function changeRedo() {
  drauu.redo()
}
// 清空
function changeClear() {
  drauu.clear()
}
const dasharrayModal = ref('solid')
// 实线
function changeSolid() {
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.dasharray = undefined
  dasharrayModal.value = 'solid'
}
// 虚线
function changeDasharray() {
  const a = drauu.options
  const b = a.brush as Brush
  b.dasharray = '4'
  dasharrayModal.value = 'dasharray'
}
// 点线
function changeDotted() {
  const a = drauu.options as Options
  const b = a.brush as Brush
  b.dasharray = '1 7'
  dasharrayModal.value = 'dotted'
}
// 下载
function down() {
  drauu.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const data = drauu.el!.outerHTML || ''
  const blob = new Blob([data], { type: 'image/svg+xml' })
  const elem = window.document.createElement('a')
  elem.href = window.URL.createObjectURL(blob)
  elem.download = 'drauu.svg'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}
</script>
<route lang="yaml">
meta:
  title: analysis
  icon: lang
  keepAlive: true
  sort: 2
</route>
