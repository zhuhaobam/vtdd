<template>
  <div class="page-main">
    <DynamicScroller
      ref="scrollBarRef"
      class="scroller"
      :items="lyricData"
      :min-item-size="50"
      :item-size="50"
      key-field="id"
      @wheel="handleWheel"
    >
      <template #default="{ item, index }">
        <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.id]" :data-index="index">
          <p :style="currentLyricStyle(item.id)" flex justify-center flex-col class="transition-color">
            <span flex justify-center>{{ item.content }}</span>
            <span v-if="item.translateContent" flex justify-center>
              {{ item.translateContent }}
            </span>
          </p>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>
    <div class="line-div" flex justify-center items-center>
      <span class="line">》-----------------------------------------------------------------------》中间线</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { parseLyric, parseRangeLyric, type LineItem } from './lyricKit'
import { useThemeVars } from 'naive-ui'
import { CSSProperties } from 'vue'
const themeVars = useThemeVars()
const scrollBarRef = ref<any>()
// 如果视图离开屏幕，则可以停用视图，并且可以随时将视图重新用于新可见的项目。
const active = ref<boolean>(false)
// DynamicScroller不会自行检测大小变化，但您可以将可能影响项目大小的值size-dependencies放在
const currentPlayLine = ref<number>(0)
// 当前滚动选择的歌词
const selectLyricLine = ref<{ time: number; index: number } | null>(null)
// 滚动歌词
let weelPlayLyric = false
// 回退滚动位置延时器，滚动和进度不干扰
let timeId: any
onMounted(() => {
  active.value = true
})

/**
 * 获取组件传值
 */
const props = defineProps<{
  seekRun: string
  tlyric: string | undefined
  lyric: string | undefined
}>()

watch(
  () => props.seekRun,
  (newVal, oldVal) => {
    const lli: LineItem | undefined = rangeLyricList.value.get(Number(newVal))
    if (lli !== undefined && Number(newVal) !== 0) {
      currentPlayLine.value = lli.id
      if (!weelPlayLyric) {
        scrollToItem(lli.id)
      }
    }
    if (Number(newVal) === 0) {
      if (currentPlayLine.value > 0) {
        scrollToItem(currentPlayLine.value)
      }
    }
  }
)

const scrollToItem = (id: number) => {
  scrollBarRef.value.scrollToItem(id)
  weelPlayLyric = false
}

const handleWheel = () => {
  weelPlayLyric = true
  clearTimeout(timeId)
  timeId = setTimeout(() => {
    const id = currentPlayLine.value
    scrollToItem(id)
  }, 2000)
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
    const isCurrent = index === currentPlayLine.value && currentPlayLine.value !== 0
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
</script>

<style lang="scss" scoped>
.scroller {
  position: relative;
  height: 200px;
  -ms-overflow-style: none; /* IE 10+ */
  overflow-y: scroll;
  scrollbar-width: none; /* Firefox */
}

::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.page-main {
  position: relative;
}

.line-div {
  position: absolute;
  top: 50%;
  width: 100%;
  height: 0;
}
</style>
