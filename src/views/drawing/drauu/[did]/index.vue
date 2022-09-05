<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <n-button type="success" dashed @click="drawingPinned = !drawingPinned">
    <n-icon v-show="drawingPinned" size="18" :component="Pencil" class="transform -rotate-45" />
    <n-icon v-show="!drawingPinned" size="18" :component="Pencil" />
  </n-button>
  <div :style="'background-image: url(' + getAssetsFile('cafe.png') + ')'">
    <svg
      ref="svg"
      class="w-full"
      :style="
        fullPage === 'inner:true'
          ? 'height: calc(100vh - ' + (screen !== 's' && screen !== 'xs' ? 191 : 167) + 'px);'
          : fullPage === 'init'
          ? 'height: calc(100vh - ' + (screen !== 's' && screen !== 'xs' ? 205 : 181) + 'px);'
          : 'height: calc(100vh - ' + (screen !== 's' && screen !== 'xs' ? 205 : 181) + 'px);'
      "
    ></svg>
    <Draggable
      :style="screen !== 's' && screen !== 'xs' ? 'width: calc(100vw - 400px)' : 'width: calc(100vw - 0px)'"
      flex
      flex-wrap
      text-xl
      p-2
      gap-1
      rounded-md
      bg-main
      shadow
      transition-opacity
      duration-200
      :class="drawingPinned ? 'opacity-90' : 'opacity-0 pointer-events-none'"
      storage-key="slidev-drawing-pos"
      :initial="{ x: 280, y: 105 }"
    >
      <n-space>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'stylus' }"
          @click="setDrawingMode('stylus')"
        >
          触笔(S)
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'draw' }"
          @click="setDrawingMode('draw')"
        >
          绘画(D)
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'line' }"
          @click="setDrawingMode('line')"
        >
          直线(L)
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'arrow' }"
          @click="setDrawingMode('arrow')"
        >
          直线箭头(A)
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'ellipse' }"
          @click="setDrawingMode('ellipse')"
        >
          圆形(E)
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'rectangle' }"
          @click="setDrawingMode('rectangle')"
        >
          正方形(R)
        </n-button>
        <!-- <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'eraseLine' }"
          @click="setDrawingMode('eraseLine')"
        >
          橡皮擦
        </n-button> -->
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': brush.dasharray !== '4' }"
          @click="setBrushDasharray('4')"
        >
          ┅
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': brush.dasharray !== '1 7' }"
          @click="setBrushDasharray('1 7')"
        >
          ⋯
        </n-button>
        <n-button w-100 :class="{ 'opacity-90': true }">
          <n-slider w-100 :default-value="4" :step="0.5" :max="10" :min="0" @update:value="setBrushSize" />
        </n-button>
        <n-button
          v-for="color of brushColors"
          :key="color"
          dashed
          :type="brush.color !== color ? 'default' : 'success'"
          @click="setBrushColor(color)"
        >
          <div
            class="w-6 h-6 transition-all transform border border-gray-400/50"
            :class="brush.color !== color ? 'rounded-1/2 scale-85' : 'rounded-md'"
            :style="drawingEnabled ? { background: color } : { borderColor: color }"
          />
        </n-button>
        <n-button :type="canUndo ? 'success' : 'default'" dashed :disabled="!canUndo" @click="undo()">
          撤销(ctrl+Z)
        </n-button>
        <n-button :type="canRedo ? 'success' : 'default'" dashed :disabled="!canRedo" @click="redo()">
          复位(shift+Z)
        </n-button>
        <n-button :type="canClear ? 'success' : 'default'" dashed :disabled="!canClear" @click="clearDrauu()">
          清除(C)
        </n-button>
        <n-button :type="canClear ? 'success' : 'default'" dashed :disabled="!canClear" @click="downLoad()">
          下载
        </n-button>
        <n-button dashed @click="drawingPinned = !drawingPinned">
          <n-icon v-show="drawingPinned" size="18" :component="Pin" />
          <n-icon v-show="!drawingPinned" size="18" :component="PinOutline" class="transform -rotate-45" />
        </n-button>
      </n-space>
    </Draggable>
  </div>
</template>
<script setup lang="ts" name="drawing-drauu-did">
import Draggable from '../../../../components/Draggable/index.vue'
import {
  brush,
  brushColors,
  canClear,
  canRedo,
  canUndo,
  changeCurrentPage,
  clearDrauu,
  drauu,
  drawingEnabled,
  drawingPinned,
  drawingMode,
  loadCanvas
} from '../../../../components/Drawings/index'
import { Pin, PinOutline, Pencil } from '@vicons/ionicons5'
import { getAssetsFile } from '@/plugins/assets-kit'
import { useFullStore } from '@store/full'
import { ComputedRef } from 'vue'
const fullStore = useFullStore()
// 屏幕大小
const screen = inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')
// 通过fullscreenchange-》EventListener以及两个全屏图标事件串联获得fullPage页面最终全屏状态
const fullPage = computed(() => fullStore.getPage)
const props = defineProps<{
  did: String | Number
}>()
const svg = ref<SVGSVGElement>()

onMounted(() => {
  changeCurrentPage(Number(props.did))
  drauu.mount(svg.value!)
  loadCanvas()
  setDrawingMode(drawingMode.value)
})
onBeforeUnmount(() => {
  drauu.unmount()
})

function undo() {
  drauu.undo()
}
function redo() {
  drauu.redo()
}
function downLoad() {
  drauu.el!.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
  const data = drauu.el!.outerHTML || ''
  const blob = new Blob([data], { type: 'image/svg+xml' })
  const elem = window.document.createElement('a')
  elem.href = window.URL.createObjectURL(blob)
  elem.download = 'drauu' + Number(props.did) + '.svg'
  document.body.appendChild(elem)
  elem.click()
  document.body.removeChild(elem)
}

function setDrawingMode(mode: typeof drawingMode.value) {
  drawingMode.value = mode
  drawingEnabled.value = true
  setBrushDasharray(undefined)
}
function setBrushColor(color: typeof brush.value.color) {
  brush.value = {
    ...brush.value,
    color: color
  }
  drawingEnabled.value = true
}
function setBrushSize(value: number) {
  brush.value = {
    ...brush.value,
    size: value
  }
  drawingEnabled.value = true
}
function setBrushDasharray(dasharray: typeof brush.value.dasharray) {
  brush.value = {
    ...brush.value,
    dasharray: dasharray
  }
  drawingEnabled.value = true
}
</script>
<style lang="scss" scoped>
// test
</style>

<route lang="yaml">
meta:
  breadcrumb: page.drawing.drauu.did
  icon: i-carbon:chart-t-sne
  sort: 21
  hidden: true
  padding: 0px
</route>
