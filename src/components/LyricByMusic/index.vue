<template>
  <div ref="scrollContainerRef" class="scrollContainer">
    <n-scrollbar ref="scrollBarRef" style="width: 550px; height: 350px" :on-scroll="handleScroll" @wheel="handleWheel">
      <div style="height: 175px" />
      <div v-if="!currentPlaySong?.isNotLyric" ref="lyricContainer">
        <div
          v-for="(item, index) in lyricData"
          :id="'time' + item.time"
          :key="index"
          class="text-center lyric-item"
          :data-time="item.time"
        >
          <p :style="currentLyricStyle(index)" class="transition-color">
            {{ item.content }}
          </p>
          <p v-if="item.translateContent" :style="currentLyricStyle(index)" class="transition-color">
            {{ item.translateContent }}
          </p>
        </div>
      </div>
      <div v-else class="text-center opacity-40">暂无歌词...</div>
      <div style="height: 175px" />
    </n-scrollbar>
    <!-- 歌词滚动选择 -->
    <div v-show="showSelectLyric" class="select-lyric-container">
      <div class="flex items-center">
        <n-time v-if="selectLyricLine" format="mm:ss" :time="selectLyricLine.time * 1000" />
        <div class="ml-2 bg-gradient-to-r from-gray-300 dark:from-gray-500 line" />
      </div>
      <div class="flex items-center">
        <div class="mr-2 bg-gradient-to-l from-gray-300 dark:from-gray-500 line" />
        <n-icon :component="ArrowForward" :size="20" @click="handlePlayIconClick" />
      </div>
    </div>
    <div class="top-mask" :style="{ background: 'transparent' }" />
    <div class="footer-mask" :style="{ background: 'transparent' }" />
  </div>
</template>
<script setup lang="ts">
import { useThemeVars } from 'naive-ui'
import { ArrowForward } from '@vicons/ionicons5'
import { lyricText } from '@/utils/lrc'
import { parseLyric, type LineItem } from '@/utils/lyric'
import { CSSProperties } from 'vue'
const lyricContainer = ref<HTMLDivElement>()
const themeVars = useThemeVars()
let timeId: any // 回退滚动位置延时器
let clearTriggerScrollTimer: any // 设置滚动是否触发延时器
let triggerScroll = true
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let triggerPlayLyric = true
let currentScrollTop = 0
const currentPlayLine = ref(0)
const eleScrollTopMap = new Map() // 歌词元素对应的scrollTop 集合
const selectLyricLine = ref<{ time: number; index: number } | null>(null) // 当前滚动选择的歌词
const showSelectLyric = ref(false)
const scrollBarRef = ref<{ scrollTo: (data: { left?: number; top?: number; behavior: string }) => void }>()
let selectLyricLineIndex = 0
const currentPlaySong = {
  isNotLyric: false
}
const lyricData = computed(() => {
  const lyric: LineItem[] | undefined = parseLyric(lyricText)
  return lyric
})

const handleScroll = (event: Event) => {
  if (!triggerScroll) return
  if (currentPlaySong.isNotLyric) return
  const target = event.target as HTMLElement
  triggerScroll = true
  const { scrollTop } = target
  const current = eleScrollTopMap.get(scrollTop)
  if (!selectLyricLine.value) {
    selectLyricLine.value = current
  } else if (current && selectLyricLine.value.time !== current.time) {
    selectLyricLine.value = current
  } else {
    selectLyricLine.value = { index: 0, time: 0 }
  }
  if (!currentPlaySong?.isNotLyric) {
    showSelectLyric.value = true
  }
  console.log('handleScroll selectLyricLine', selectLyricLine.value)

  selectLyricLineIndex = selectLyricLine.value!.index
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    if (selectLyricLineIndex && selectLyricLineIndex !== currentPlayLine.value) {
      triggerPlayLyric = false
      scrollTo(currentScrollTop, true)
    }
    selectLyricLine.value = null
    showSelectLyric.value = false
  }, 2500)
}
const scrollTo = (top: number, listen = false) => {
  triggerScroll = false
  scrollBarRef.value?.scrollTo({ top: top, behavior: 'smooth' })
  if (listen) {
    listenScrollComplete(top, () => {
      // obverser.emit('scrollComplete')
      triggerPlayLyric = true
    })
  }
}
const createListenScrollComplete = (
  selector = '.scrollContainer > .n-scrollbar > .n-scrollbar-container',
  wait = 50
) => {
  let scrollTargetEle: null | HTMLElement = null
  let timer: any
  return async (top: number, callback: () => void) => {
    await nextTick()
    if (!scrollTargetEle) {
      scrollTargetEle = document.querySelector(selector) as HTMLElement
    }
    timer = setInterval(() => {
      if (scrollTargetEle?.scrollTop === top) {
        callback()
        clearInterval(timer)
      }
    }, wait)
  }
}
const listenScrollComplete = createListenScrollComplete()
// -------------
const handlePlayIconClick = () => {
  const time = selectLyricLine.value!.time
  currentPlayLine.value = selectLyricLine.value!.index
  selectLyricLineIndex = currentPlayLine.value
  showSelectLyric.value = false
  triggerScroll = false
  selectLyricLine.value = null
  console.log(time)
  // obverser.emit('selectLyricPlay', time)
}

const handleWheel = () => {
  console.log('handleWheel')
  triggerScroll = true
  clearTimeout(clearTriggerScrollTimer)
  clearTriggerScrollTimer = setTimeout(() => {
    triggerScroll = false
  }, 1000)
}

const currentLyricStyle = computed(() => {
  return (index: number) => {
    const isCurrent = index === currentPlayLine.value
    return {
      color: isCurrent
        ? themeVars.value.primaryColor
        : selectLyricLine.value?.index === index
        ? themeVars.value.primaryColorSuppl
        : '#646463',
      fontWeight: isCurrent ? 'bold' : '500',
      fontSize: isCurrent ? '16px' : '14px'
    } as CSSProperties
  }
})
const initEleScrollTopMap = () => {
  eleScrollTopMap.clear()
  const children = Array.from(lyricContainer.value!.children) as HTMLElement[]
  const valueList = children.map((child, index) => {
    return {
      offsetTop: child.offsetTop - 175,
      index,
      time: child.getAttribute('data-time')
    }
  })
  let currentIndex = 0
  let nextIndex = 1
  while (currentIndex !== valueList.length - 1) {
    const cur = valueList[currentIndex]
    const next = valueList[nextIndex]
    for (let start = cur.offsetTop; start < next.offsetTop; start++) {
      eleScrollTopMap.set(start, {
        index: cur.index,
        time: cur.time
      })
    }
    if (next) {
      currentIndex++
      nextIndex++
    }
    if (currentIndex === valueList.length - 1) {
      eleScrollTopMap.set(next.offsetTop, {
        index: next.index,
        time: next.time
      })
    }
  }
}
currentScrollTop = 0
scrollTo(0)
nextTick(() => {
  initEleScrollTopMap()
})
</script>

<style lang="scss" scoped>
.lyric-item {
  width: 500px;

  p {
    color: #646463;
    line-height: 35px;
  }
}

.footer-mask {
  position: absolute;
  bottom: 0;
  width: 500px;
  height: 50px;
}

.top-mask {
  position: absolute;
  bottom: 300px;
  width: 500px;
  height: 50px;
}

.select-lyric-container {
  position: absolute;
  top: 175px;
  display: flex;
  width: 540px;
  align-items: center;
  justify-content: space-between;
}

.line {
  width: 60px;
  height: 1px;
}
</style>
