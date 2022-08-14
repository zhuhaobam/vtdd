<template>
  <div ref="scrollContainerRef" class="scrollContainer">
    <n-scrollbar ref="scrollBarRef" style="width: 550px; height: 350px" :on-scroll="handleScroll" @wheel="handleWheel">
      <div style="height: 100px" />
      <div v-if="!musicStore.currentPlaySong?.isNotLyric" ref="lyricContainer">
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
      <div style="height: 100px" />
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
import obverser from '@/utils/observer'
import { useThemeVars } from 'naive-ui'
import { ArrowForward } from '@vicons/ionicons5'
import { useMusicStore } from '@store/music'
import { parseLyric, parseRangeLyric, type LineItem, type RangeLyricItem } from './lyricKit'
import { CSSProperties } from 'vue'
let timeId: any // 回退滚动位置延时器
let clearTriggerScrollTimer: any // 设置滚动是否触发延时器
let triggerScroll = true
let triggerPlayLyric = true
let selectLyricLineIndex = 0
let pendingSetScrollFn: (() => void) | null = null
const musicStore = useMusicStore()
const themeVars = useThemeVars()
const currentPlayLine = ref(0)
const eleScrollTopMap = new Map() // 歌词元素对应的scrollTop 集合
const selectLyricLine = ref<{ time: number; index: number } | null>(null) // 当前滚动选择的歌词
const showSelectLyric = ref(false)
const lyricContainer = ref<HTMLDivElement>()
const scrollBarRef = ref<{ scrollTo: (data: { left?: number; top?: number; behavior: string }) => void }>()
const scrollContainerRef = ref()
const footerMaskBackground = ref<CSSProperties>({})
const topMaskBackground = ref<CSSProperties>({})
const isHover = useElementHover(scrollContainerRef)
let currentScrollTop = 0
const lyricData = computed(() => {
  let tlyricData: LineItem[] | undefined
  if (musicStore.currentPlaySong?.tlyric) {
    tlyricData = parseLyric(musicStore.currentPlaySong?.tlyric)
  }
  if (!musicStore.currentPlaySong?.lyric) {
    return []
  }
  const lyric = parseLyric(musicStore.currentPlaySong?.lyric)
  if (tlyricData) {
    return lyric.map(item => {
      const target = tlyricData!.find(val => val.time === item.time)
      if (target) {
        item.translateContent = target.content
      }
      return item
    })
  }
  return lyric
})
const rangeLyricList = computed(() => {
  return parseRangeLyric(toRaw(lyricData.value))
})
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

function handlePlayLyric(time: number, listenScroll = false) {
  // 如果当前鼠标正在滚动歌词
  if (selectLyricLine.value) return
  if (!triggerPlayLyric) return
  triggerLyricChange(time, listenScroll)
}
const handleSliderChange = (time: number, listenScroll = false) => {
  if (musicStore.showMusicDetail) {
    triggerLyricChange(time, listenScroll)
  } else {
    pendingSetScrollFn = () => triggerLyricChange(time, listenScroll)
  }
}
const triggerLyricChange = (time: number, listenScroll = false) => {
  if (musicStore.currentPlaySong.isNotLyric) return
  if (!lyricData.value.length) return
  const currentLyric = rangeLyricList.value.get(time) as RangeLyricItem
  if (currentLyric) {
    currentPlayLine.value = currentLyric.index
    musicStore.setCurrentPlayLyric(currentLyric.content)
    setScroll(currentLyric.time, listenScroll)
  }
}
const handleScroll = (event: Event) => {
  if (!triggerScroll) return
  if (musicStore.currentPlaySong.isNotLyric) return
  const target = event.target as HTMLElement
  triggerScroll = true
  const { scrollTop } = target
  const current = eleScrollTopMap.get(scrollTop)
  if (!selectLyricLine.value) {
    selectLyricLine.value = current
  } else if (current && selectLyricLine.value.time !== current.time) {
    selectLyricLine.value = current
  }
  if (!musicStore.currentPlaySong?.isNotLyric) {
    showSelectLyric.value = true
  }
  if (selectLyricLine.value) {
    selectLyricLineIndex = selectLyricLine.value!.index
  }
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
const handlePlayIconClick = () => {
  const time = selectLyricLine.value!.time
  currentPlayLine.value = selectLyricLine.value!.index
  selectLyricLineIndex = currentPlayLine.value
  showSelectLyric.value = false
  triggerScroll = false
  selectLyricLine.value = null
  obverser.emit('selectLyricPlay', time)
}
const handleWheel = () => {
  triggerScroll = true
  clearTimeout(clearTriggerScrollTimer)
  clearTriggerScrollTimer = setTimeout(() => {
    triggerScroll = false
  }, 1000)
}
const initEleScrollTopMap = () => {
  eleScrollTopMap.clear()
  const lyricContainerDom = lyricContainer.value as HTMLDivElement
  const children = Array.from(lyricContainerDom!.children) as HTMLDivElement[]
  const valueList = children.map((child, index) => {
    return {
      offsetTop: child.offsetTop - 100,
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
const setScroll = (time: number, listen = false) => {
  const targetELe = document.querySelector(`#time${time}`) as HTMLElement
  if (targetELe) {
    currentScrollTop = targetELe!.offsetTop - 100
    scrollTo(currentScrollTop, listen)
  }
}
const scrollTo = (top: number, listen = false) => {
  triggerScroll = false
  scrollBarRef.value?.scrollTo({ top: top, behavior: 'smooth' })
  if (listen) {
    listenScrollComplete(top, () => {
      obverser.emit('scrollComplete')
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
watch(isHover, val => {
  console.log('watch isHover')
  if (!val) {
    showSelectLyric.value = false
  } else if (selectLyricLine.value && !musicStore.currentPlaySong?.isNotLyric) {
    showSelectLyric.value = true
  } else {
    showSelectLyric.value = false
  }
})
watch(
  () => musicStore.currentPlaySong,
  async () => {
    console.log('watch musicStore.currentPlaySong')
    currentScrollTop = 0
    scrollTo(0)
    if (musicStore.showMusicDetail && !musicStore.currentPlaySong?.isNotLyric) {
      await nextTick()
      initEleScrollTopMap()
    }
  }
)
watch(
  () => musicStore.showMusicDetail,
  async val => {
    console.log('watch musicStore.showMusicDetail')
    if (val && eleScrollTopMap.size === 0 && !musicStore.currentPlaySong?.isNotLyric) {
      await nextTick()
      initEleScrollTopMap()
      console.log('watch musicStore.showMusicDetail initEleScrollTopMap')
    }
    if (val) {
      setTimeout(() => {
        pendingSetScrollFn && pendingSetScrollFn()
      }, 500)
    } else {
      pendingSetScrollFn = null
    }
  },
  { immediate: true }
)
watch(
  lyricData,
  val => {
    console.log('watch lyricData')
    if (val.length) {
      musicStore.setCurrentPlayLyric(val[0].content)
    }
  },
  { immediate: true }
)
obverser.on('updateLyricMaskStyle', ({ footerMaskStyle, topMaskStyle }) => {
  if (footerMaskStyle !== footerMaskBackground.value) {
    footerMaskBackground.value = footerMaskStyle
  }
  if (topMaskStyle !== topMaskBackground.value) {
    topMaskBackground.value = topMaskStyle
  }
})
onMounted(() => {
  obverser.on('timeUpdate', handlePlayLyric)
  obverser.on('slideValueChange', handleSliderChange)
  obverser.on('ended', () => {
    currentScrollTop = 0
    scrollTo(0)
  })
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
  top: 225px;
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
