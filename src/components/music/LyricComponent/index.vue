<template>
  <div ref="mainRef" class="page-main clearfix">
    <DynamicScroller
      ref="scrollBarRef"
      class="scroller"
      :items="lyricData"
      :min-item-size="height"
      :item-size="height"
      key-field="id"
      @scroll="handleScroll"
      @wheel="handleWheel"
    >
      <template #default="{ item, index, active }">
        <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.message]" :data-index="index">
          <p :style="currentLyricStyle(index)" flex justify-center flex-col>
            <span flex justify-center>{{ item.content }}</span>
            <span v-if="item.translateContent" flex justify-center>
              {{ item.translateContent }}
            </span>
          </p>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <div v-show="showSelectLyric" class="line-div" flex justify-between items-center>
      <span pointer-events-none :style="'color:' + (playing ? '#18a058' : '')">
        <span v-if="['onplay', 'onend'].includes(props.seekRun ?? '0')">00:00</span>
        <n-time
          v-else-if="['onpause'].includes(props.seekRun ?? '0')"
          format="mm:ss"
          :time="Number(currentPlayLineTime) * 1000" />
        <n-time v-else format="mm:ss" :time="Number(props.seekRun ?? '0') * 1000"
      /></span>
      <span cursor-pointer @click="seekJoin">
        <div
          v-if="!triggerPlayLyric"
          flex
          justify-center
          items-center
          :style="playing ? 'color:gold;font-weight: bolder;' : ''"
        >
          <n-time format="mm:ss" :time="Number(idState.selectLyricLineTime) * 1000" /><i-ant-design:arrow-right-outlined
            v-show="playing"
            pl-2
          />
        </div>
        <n-time v-else format="mm:ss" :time="props.seekDt" />
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { parseLyric, parseRangeLyric, type LineItem } from './lyricKit'
import { useThemeVars } from 'naive-ui'
import { CSSProperties } from 'vue'
import { useMusicStore } from '@store/music'
import { musicMenuRunType } from '@/types/musicType'
import { IdState } from 'vue-virtual-scroller'
const musicStore = useMusicStore()
// naive-ui样式
const themeVars = useThemeVars()
// 滚动条对象
const scrollBarRef = ref<any>()
const mainRef = ref<any>()
// 滚动条hover监听
const isHoverMainRef = useElementHover(mainRef)
// 显示歌词选择线
const showSelectLyric = ref(false)
// DynamicScroller不会自行检测大小变化，但您可以将可能影响项目大小的值size-dependencies放在
const currentPlayLine = ref<number>(0)
const currentPlayLineTime = ref<number>(0)

IdState({
  // You can customize this
  idProp: vm => vm.item.id
})
const idState = ref<{
  selectLyricLine: Number
  selectLyricLineTime: Number
}>({
  // 当前滚动选择的歌词
  selectLyricLine: 0,
  selectLyricLineTime: 0
})
// 回退滚动位置延时器，滚动和进度不干扰
let timeId: any
// 设置滚动是否触发延时器
let clearTriggerScrollTimer: any
// 设置滚动
let triggerScroll = false
// 歌词滚动
const triggerPlayLyric = ref<boolean>(true)
// 歌曲是否正在播放中
const playing = ref<boolean>(false)
const pause = ref<boolean>(false)
/**
 * 每列高度
 */
const height = ref<Number>(52)
/**
 * 歌词滑动高亮偏移量
 */
const offset = ref<Number>(1)

/**
 * 获取组件传值
 */
const props = defineProps<{
  seekRun: string
  seekDt: number
  seekId: string
  tlyric: string | undefined
  lyric: string | undefined
}>()

onMounted(() => {
  seekRunFuc(props.seekRun)
  mapRunFuc(musicStore.getMapRun)
})

watch(
  () => props.seekRun,
  (newVal, oldVal) => {
    seekRunFuc(newVal)
  }
)

const seekRunFuc = (newVal: string) => {
  const key = ['onplay', 'onend', 'onpause', '0'].includes(newVal ?? '0')
  if (!key) {
    const time = Number(newVal)
    currentPlayLineTime.value = time
    const lli: LineItem | undefined = rangeLyricList.value.get(time)
    if (lli) {
      currentPlayLine.value = lli.index
      if (triggerPlayLyric.value) {
        scrollToItem(lli.index)
      }
    } else {
      const indexSimilar = findSimilar(time)
      if (indexSimilar) {
        currentPlayLine.value = indexSimilar.index
        if (triggerPlayLyric.value) {
          scrollToItem(indexSimilar.index)
        }
      }
    }
  } else if (newVal === 'onpause') {
    if (currentPlayLine.value > 0) {
      scrollToItem(currentPlayLine.value)
    }
  } else if (newVal === 'onend') {
    if (currentPlayLine.value > 0) {
      scrollToItem(0)
    }
  } else if (newVal === '0') {
    scrollToItem(0)
  }
}

/**
 * 查询时间最新的一条歌词记录
 */
const findSimilar = (taget: number) => {
  const newArr = []
  for (const [time] of rangeLyricList.value) {
    newArr.push(time)
  }
  const absArr = newArr.map((k: Number) => {
    return Math.abs(Number(k) - taget)
  })
  const min = Math.min.apply(Math, absArr)
  return rangeLyricList.value.get(newArr[absArr.indexOf(min)])
}

watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    mapRunFuc(newVal)
  }
)

const mapRunFuc = (newVal: Map<string, musicMenuRunType>) => {
  if (newVal.size !== 0) {
    const menuRunValue: Map<string, musicMenuRunType> = newVal
    const seekObj: musicMenuRunType | undefined = menuRunValue.get(props.seekId)
    if (seekObj) {
      playing.value = seekObj === 'playing'
      pause.value = seekObj === 'pause'
    }
  }
}

const scrollToItem = async (id: number) => {
  scrollBarRef.value.scrollToItem(id)
}

const handleScroll = (event: Event) => {
  if (!triggerScroll) return
  const target = event.target as HTMLElement
  triggerScroll = true
  triggerPlayLyric.value = false
  const { scrollTop, scrollHeight, clientHeight } = target
  clearTimeout(timeId)
  const index = Math.round(scrollTop / Number(height.value)) + Number(offset.value)
  const newIndex = scrollHeight - scrollTop === clientHeight ? lyricData.value.length - 1 : index
  idState.value.selectLyricLine = newIndex
  idState.value.selectLyricLineTime = lyricData.value[newIndex].time
  timeId = setTimeout(() => {
    triggerPlayLyric.value = true
    idState.value.selectLyricLine = 0
    scrollToItem(currentPlayLine.value)
  }, 2500)
}

const handleWheel = () => {
  triggerScroll = true
  clearTimeout(clearTriggerScrollTimer)
  clearTriggerScrollTimer = setTimeout(() => {
    triggerScroll = false
  }, 1000)
}

const seekJoin = () => {
  if (playing.value) {
    clearTimeout(timeId)
    triggerPlayLyric.value = true
    const el = scrollBarRef.value.$el
    const { scrollTop, scrollHeight, clientHeight } = el
    const index = Math.round(scrollTop / Number(height.value)) + Number(offset.value)
    const newIndex = scrollHeight - scrollTop === clientHeight ? lyricData.value.length - 1 : index
    musicStore.setSeekJoinRun({
      id: props.seekId,
      seek: lyricData.value[newIndex].time,
      timeStamp: new Date().getTime()
    })
  }
}

const lyricData = computed(() => {
  let tlyricData: LineItem[] | undefined
  if (props.tlyric) {
    tlyricData = parseLyric(props.tlyric)
  }
  if (!props.lyric) {
    return []
  }
  const lyric = parseLyric(props.lyric)
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
    // idState.value.selectLyricLine会标记到当前滚动到的列的index
    const selectLyricLine = idState.value.selectLyricLine
    return {
      color:
        isCurrent && (playing.value || pause.value)
          ? themeVars.value.primaryColor
          : selectLyricLine !== 0 && selectLyricLine === index && showSelectLyric.value
          ? themeVars.value.primaryColorSuppl
          : '#646463',
      fontWeight: isCurrent && (playing.value || pause.value) ? 'bolder' : '500',
      fontSize: isCurrent && (playing.value || pause.value) ? '16px' : '14px'
    } as CSSProperties
  }
})

watch(isHoverMainRef, val => {
  if (val) {
    showSelectLyric.value = true
  } else {
    showSelectLyric.value = false
  }
})
</script>

<style lang="scss" scoped>
.scroller {
  overflow: visible;
  height: 208px;
  padding: 0;
  -ms-overflow-style: none; /* IE 10+ */
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.page-main {
  position: relative;
  height: 208px;
}

.line-div {
  position: absolute;
  top: 44%;
  width: 100%;
}

/* 伪元素添加的标签是行内, 要求块 */

.clearfix::after {
  /* 伪元素添加的标签是行内, 要求块 */
  display: block;
  height: 0;
  clear: both;
  content: '';
  visibility: hidden;

  /* 补充代码：在网页中看不到伪元素 */

  /* 为了兼容性 */
}
</style>
