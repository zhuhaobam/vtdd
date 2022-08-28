import type { Brush, Options as DrauuOptions, DrawingMode } from 'drauu'
import { createDrauu } from 'drauu'
import { useDrauuStore } from '@store/drauu'
import { cancelRequestAnimationFrame, reqAnimFrame } from '@/utils/requestAnimationFrameGrace'
const useDrauu = useDrauuStore()
const currentPage = ref<Number>(1)
export const brushColors = ['#ff595e', '#ffca3a', '#8ac926', '#1982c4', '#6a4c93', '#ffffff', '#000000']
export const drawingEnabled = useStorage('slidev-drawing-enabled', false)
export const drawingPinned = useStorage('slidev-drawing-pinned', true)
export const canUndo = ref(false)
export const canRedo = ref(false)
export const canClear = ref(false)
export const isDrawing = ref(false)
// rAF触发锁，必须加锁，多次调用raf，会在一帧中多次触发回调
const ticking = ref(false)

export const brush = computed({
  get() {
    return (
      useDrauu.getBrush[String(currentPage.value)] ?? {
        color: brushColors[0],
        size: 4,
        mode: 'stylus',
        dasharray: undefined
      }
    )
  },
  set(v: Brush) {
    useDrauu.setBrush(String(currentPage.value), v)
  }
})

let disableDump = false

export const drawingMode = computed({
  get() {
    return useDrauu.getDdrawingMode[String(currentPage.value)] ?? 'stylus'
  },
  set(v: DrawingMode | 'arrow') {
    useDrauu.setDdrawingMode(String(currentPage.value), v)
    if (v === 'arrow') {
      brush.value = {
        ...brush.value,
        mode: 'line',
        arrowEnd: true
      }
    } else {
      brush.value = {
        ...brush.value,
        mode: v,
        arrowEnd: false
      }
    }
  }
})

export const drauuOptions: DrauuOptions = reactive({
  brush,
  acceptsInputTypes: computed(() => (drawingEnabled.value ? undefined : ['pen' as const])),
  coordinateTransform: false
})
/**
 * toRaw，将响应式对象（由 reactive定义的响应式）转换为普通对象。
 * markRaw，标记一个对象，使其不能成为一个响应式对象。
 */
export const drauu = toRaw(createDrauu(drauuOptions))

export function clearDrauu() {
  drauu.clear()
  useDrauu.setDrauuDumpOne(String(currentPage.value), '')
}

export function updateState() {
  canRedo.value = drauu.canRedo()
  canUndo.value = drauu.canUndo()
  canClear.value = !!drauu.el?.children.length
}

export function changeCurrentPage(page: number) {
  currentPage.value = page
}

export function loadCanvas(page?: number) {
  disableDump = true
  const data = useDrauu.getDrauuDump[String(page || currentPage.value)]
  if (data) drauu.load(data)
  else drauu.clear()
  disableDump = false
  drawingEnabled.value = true
}

drauu.on('changed', () => {
  if (!ticking.value) {
    // 使用 requestAnimationFrame 节流
    const rafId = reqAnimFrame(() => {
      updateState()
      ticking.value = false
      cancelRequestAnimationFrame(rafId)
    })
    ticking.value = true
  }
  if (!disableDump) {
    const dump = drauu.dump()
    const key = String(currentPage.value)
    useDrauu.setDrauuDumpOne(key, dump)
  }
})

drauu.on('start', () => (isDrawing.value = true))
drauu.on('end', () => (isDrawing.value = false))

// const blob = new Blob(['Hello, world!'], { type: 'text/plain;charset=utf-8' })
// const url = URL.createObjectURL(blob)
// download('a.txt', url)

export function download(name: string, url: string) {
  const a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('download', name)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

window.addEventListener(
  'keydown',
  e => {
    if (!drawingEnabled.value) return

    const noModifier = !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey
    let handled = true
    if (e.code === 'KeyZ' && (e.ctrlKey || e.metaKey || e.shiftKey)) {
      if (e.shiftKey) drauu.redo()
      else drauu.undo()
    } else if (e.code === 'Escape') {
      drawingEnabled.value = false
    } else if (e.code === 'KeyL' && noModifier) {
      drawingMode.value = 'line'
    } else if (e.code === 'KeyA' && noModifier) {
      drawingMode.value = 'arrow'
    } else if (e.code === 'KeyS' && noModifier) {
      drawingMode.value = 'stylus'
    } else if (e.code === 'KeyD' && noModifier) {
      drawingMode.value = 'draw'
    } else if (e.code === 'KeyR' && noModifier) {
      drawingMode.value = 'rectangle'
    } else if (e.code === 'KeyE' && noModifier) {
      drawingMode.value = 'ellipse'
    } else if (e.code === 'KeyC' && noModifier) {
      clearDrauu()
    } else if (e.code.startsWith('Digit') && noModifier && +e.code[5] <= brushColors.length) {
      brush.value = {
        ...brush.value,
        color: brushColors[+e.code[5] - 1]
      }
    } else {
      handled = false
    }

    if (handled) {
      e.preventDefault()
      e.stopPropagation()
    }
  },
  false
)
