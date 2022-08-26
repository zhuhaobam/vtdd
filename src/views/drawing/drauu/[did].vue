<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div :style="'background-image: url(' + getAssetsFile('cafe.png') + ')'">
    <svg ref="svg" class="w-full" style="height: calc(100vh - 195px)"></svg>
    <Draggable
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
      class="bg-white hover:bg-#F3F4F6 dark:bg-#25252580 dark:hover:bg-#e5e7eb1a"
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
          笔
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'line' }"
          @click="setDrawingMode('line')"
        >
          直线
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'arrow' }"
          @click="setDrawingMode('arrow')"
        >
          直线箭头
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'ellipse' }"
          @click="setDrawingMode('ellipse')"
        >
          圆形
        </n-button>
        <n-button
          type="success"
          dashed
          :class="{ 'opacity-60': drawingMode !== 'rectangle' }"
          @click="setDrawingMode('rectangle')"
        >
          正方形
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
        <n-button :type="canRedo ? 'success' : 'default'" dashed :disabled="!canRedo" @click="redo()"> 复位 </n-button>
        <n-button :type="canClear ? 'success' : 'default'" dashed :disabled="!canClear" @click="clearDrauu()">
          重置
        </n-button>
      </n-space>
    </Draggable>
  </div>
</template>
<script setup lang="ts" name="drawing-drauu-did">
import Draggable from '../../../components/Draggable/index.vue'
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
  drawingMode,
  loadCanvas
} from '../../../components/Drawings/index'
import { getAssetsFile } from '@/plugins/assets-kit'

const props = defineProps<{
  did: String | Number
}>()
const svg = ref<SVGSVGElement>()

onMounted(() => {
  drauu.mount(svg.value!)
  changeCurrentPage(Number(props.did))
  loadCanvas()
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

function setDrawingMode(mode: typeof drawingMode.value) {
  drawingMode.value = mode
  drawingEnabled.value = true
}
function setBrushColor(color: typeof brush.color) {
  brush.color = color
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
  padding: 40
</route>
