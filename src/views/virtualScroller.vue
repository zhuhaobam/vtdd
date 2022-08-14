<template>
  <div>
    <n-card title="歌词滚动">
      <div style="opacity: 1" class="flex flex-col flex-1 py-20 items-center control">
        <div class="absolute z-50 w-full footer-player" />
        <div style="width: 300px" class="flex justify-between items-center">
          <n-icon class="custom-icon" :size="22" :component="currentPlayModeIcon" @click="handlePlayModeClick" />
          <n-icon class="prev custom-icon" :size="22" :component="CaretBackSharp" @click="handlePrevClick" />
          <div
            class="flex justify-center items-center w-8 h-8 bg-neutral-200/60 hover:bg-neutral-200 dark:bg-slate-100/20 dark:hover:bg-slate-100/40 rounded-full"
            @click="togglePlayStatus"
          >
            <n-icon :size="playing ? 14 : 20" :component="playing ? StopCircle : LogoGooglePlaystore" />
          </div>
          <n-icon class="next custom-icon" :size="22" :component="CaretForwardSharp" @click="handleNextClick" />
        </div>
        <div class="flex items-center mt-1">
          <span class="mr-2 text-xs opacity-50">{{ currentPlayTime }}</span>
          <div class="flex flex-1 items-center" :style="{ width: progressWidth + 'px' }">
            <slider-bar
              v-model="percentage"
              :load-value="progressValue"
              @on-done="handleSliderDone"
              @change="handleSliderChange"
            />
          </div>
          <span class="ml-2 text-xs opacity-50">
            <n-time format="mm:ss" :time="getCurrentPlaySong?.dt" />
          </span>
        </div>
      </div>
      <audio
        ref="audioRef"
        :src="getAssetsDirFile('along.mp3')"
        preload="auto"
        @timeupdate="handleTimeupdate"
        @ended="handleEnded"
        @playing="handlePlaying"
        @progress="updateBuffer"
        @loadeddata="handleLoadeddata"
        @error="handleError"
        @waiting="handleWaiting"
      />
      <LyricByMusic flex justify-center />
    </n-card>
    <n-card title="菜单虚拟滚动条">
      <n-button @click="active = !active"> 菜单虚拟滚动条 </n-button>
    </n-card>
    <n-drawer v-model:show="active" :width="450" placement="right" :trap-focus="false" :block-scroll="false">
      <n-drawer-content :native-scrollbar="false">
        <template #header>
          <div class="flex justify-between odd:" style="width: 400px">
            <span class="opacity-50" style="font-size: 0.875rem">共 {{ play.playListCount }} 首 </span>
            <n-button type="primary" text @click="handleRestClick"> 清空列表 </n-button>
          </div>
        </template>
        <!--  -->
        <n-empty v-if="play.playList.length === 0" class="mt-20" description="您还未添加任何歌曲">
          <template #extra>
            <n-button text type="primary" @click="handleGoHemeClick"> 去首页发现音乐 </n-button>
          </template>
        </n-empty>
        <DynamicScroller class="scroller" :items="play.playList" :min-item-size="45" key-field="id">
          <template #default="{ item, index }">
            <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.message]" :data-index="index">
              <div
                :class="'flex justify-between item ' + stripedClass(index)"
                style="line-height: 3rem"
                @dblclick="handleDoubleClick(index)"
              >
                <div flex overflow-hidden flex-1 items-center pr-2>
                  <n-icon
                    v-if="+play.currentPlayIndex === index"
                    pr-2
                    size="20"
                    :color="play.playing ? 'green' : 'blue'"
                    :component="play.playing ? ColorWand : ColorPaletteSharp"
                  />
                  <p class="truncate" style="max-width: 140px">
                    {{ item.name }}
                  </p>
                  <n-tag
                    v-if="item.mv !== 0"
                    size="small"
                    :color="{
                      textColor: '#63e2b7',
                      borderColor: '#63e2b7'
                    }"
                    ml-10
                  >
                    MV
                  </n-tag>
                  <n-tag
                    v-if="item.fee === 1"
                    size="small"
                    :color="{
                      textColor: '#63e2b7',
                      borderColor: '#63e2b7'
                    }"
                    ml-10
                  >
                    VIP
                  </n-tag>
                </div>
                <p class="w-100 truncate">
                  {{ formateSongsAuthor(item?.ar) }}
                </p>
                <n-time class="pl-4 pt-16 opacity-40" format="mm:ss" :time="item?.dt" />
              </div>
            </DynamicScrollerItem>
          </template>
        </DynamicScroller>
      </n-drawer-content>
    </n-drawer>
  </div>
</template>
<script setup lang="ts" name="virtualScroller">
import {
  StopCircle,
  LogoGooglePlaystore,
  CaretBackSharp,
  CaretForwardSharp,
  LogoPlaystation,
  AnalyticsSharp,
  ApertureSharp
} from '@vicons/ionicons5'
import { useAudioLoadProgress } from '@hooks/useAudioLoadProgress'
import { getAssetsDirFile } from '@/plugins/assets-kit'
import dayjs from 'dayjs'
import obverser from '@/utils/observer'
import { useMusicStore } from '@store/music'
import lyricText from '@/utils/lrcText'
import songs from '@/utils/songs.json'
import { ColorWand, ColorPaletteSharp } from '@vicons/ionicons5'
import { useThemeStore } from '@store/theme'
import { storeToRefs } from 'pinia'
let isLoad = false
// audio元素
const audioRef = ref<HTMLAudioElement>()
const { updateBuffer, progressValue } = useAudioLoadProgress(audioRef, songs[0]?.dt / 1000)
// 进度条百分比
const percentage = ref(0)
// 当前播放时间
const currentPlayTime = ref('00:00')
const progressWidth = 500
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let slideValueChange = false // 记录slider值是否手动发生了改变
let triggerOriginalAudioTimeUpdate = true
const themeStore = useThemeStore()
const musicStore = useMusicStore()
const { playing, playMode, getCurrentPlaySong } = storeToRefs(musicStore)

musicStore.setIsNotLyric(false)
musicStore.setLyric(lyricText)
musicStore.setShowMusicDetail(true)
musicStore.setPlayList(songs)

onMounted(() => {
  obverser.on('selectLyricPlay', time => {
    console.log('updatePlayTime(time, true)')
    updatePlayTime(time, true)
  })
  obverser.on('scrollComplete', () => {
    console.log('triggerOriginalAudioTimeUpdate')
  })
})

watch(
  () => musicStore.getCurrentPlaySong,
  (val, oldVal) => {
    if (oldVal && val.id !== oldVal.id) {
      // 重新加载媒体资源
      audioRef.value?.load()
      resetState()
      tryPlay()
    }
  },
  { immediate: true }
)
watch(
  () => musicStore.playList,
  val => {
    if (val.length === 0) {
      percentage.value = 0
    }
  }
)
watch(
  () => musicStore.playing,
  val => {
    if (val) {
      tryPlay()
    } else {
      audioRef.value?.pause()
    }
  }
)

const currentPlayModeIcon = computed(() => {
  if (playMode?.value === 'order') {
    return LogoPlaystation
  } else if (playMode?.value === 'random') {
    return ApertureSharp
  }
  return AnalyticsSharp
})

// 点击切换上一首
const handlePrevClick = async () => {
  if (isLoad) return
  isLoad = true
  console.log('点击切换上一首')
  await musicStore.togglePrev()
  isLoad = false
}
// 点击切换下一首
const handleNextClick = async () => {
  if (isLoad) return
  isLoad = true
  console.log('点击切换下一首')
  await musicStore.toggleNext()
  isLoad = false
}

const resetState = () => {
  currentPlayTime.value = '00:00'
  percentage.value = 0
  progressValue.value = 0
  audioRef.value!.currentTime = 0
}

// 播放进度变化
const handleTimeupdate = (event: Event) => {
  if (triggerOriginalAudioTimeUpdate) {
    console.log('handleTimeupdate')
    const target = event.target as HTMLAudioElement
    updatePlayTime(target.currentTime)
  }
}
const handleEnded = () => {
  console.log('handleEnded')
  // 如果为单曲循环模式,则重新播放
  if (playMode?.value === 'singleLoop') {
    audioRef.value!.currentTime = 0
    audioRef.value?.play()
  } else {
    // musicStore.toggleNext()
  }
  obverser.emit('ended')
}

// 媒体的第一帧加载完成
const handleLoadeddata = () => {
  console.log('handleLoadeddata', playing?.value, audioRef.value?.paused)
  // if (playing && audioRef.value?.paused) {
  //   audioRef.value?.play()
  // }
}
//处理数据还未加载完成时,播放暂停
const handleWaiting = () => {
  console.log('handleWaiting')
  musicStore.changeWaiting(true)
}
// 因为缺少数据而暂停或延迟的状态结束，播放准备开始
const handlePlaying = () => {
  console.log('handlePlaying')
  musicStore.changeWaiting(false)
}

const handleError = async () => {
  console.log('handleError')
  if (audioRef.value?.error!.code === 4 || audioRef.value?.error!.code === 2) {
    console.log('媒体资源过期,重新获取数据')
    resetState()
  }
}

const updatePlayTime = async (time: number, triggerPlay = false) => {
  // 如果当前滑动条正在改变,则不设置对应的值, 避免冲突
  if (!slideValueChange) {
    currentPlayTime.value = dayjs(time * 1000).format('mm:ss')
    percentage.value = Math.round(((time * 1000) / getCurrentPlaySong.value?.dt) * 100)
  }
  if (triggerPlay) {
    tryPlay()
    await nextTick()
    if (audioRef.value) {
      audioRef.value!.currentTime = time
    }
  }
  obverser.emit('timeUpdate', Math.round(time))
}

// 切换播放状态
const togglePlayStatus = async () => {
  console.log('togglePlayStatus')
  if (audioRef.value?.paused) {
    tryPlay()
  } else {
    audioRef.value?.pause()
    musicStore.changePlaying(false)
  }
}
const tryPlay = () => {
  if (audioRef.value && audioRef.value!.readyState >= 2 && audioRef.value?.paused) {
    audioRef.value?.play()
  }
  musicStore.changePlaying(true)
}

// 处理鼠标在进度条上抬起或者按下操作
const handleSliderDone = () => {
  triggerOriginalAudioTimeUpdate = false
  const currentTime = (getCurrentPlaySong.value?.dt * percentage.value) / 100
  currentPlayTime.value = dayjs(currentTime).format('mm:ss')
  audioRef.value!.currentTime = currentTime / 1000
  slideValueChange = false
  obverser.emit('slideValueChange', Math.round(currentTime / 1000), true)
}
const handleSliderChange = () => {
  slideValueChange = true
  const currentTime = (getCurrentPlaySong.value?.dt * percentage.value) / 100
  currentPlayTime.value = dayjs(currentTime).format('mm:ss')
}

// 点击切换播放模式
const handlePlayModeClick = () => {
  if (playMode?.value === 'order') {
    console.log('随机播放')
    musicStore.changePlayMode('random')
  } else if (playMode?.value === 'random') {
    console.log('单曲循环')
    musicStore.changePlayMode('singleLoop')
  } else {
    console.log('顺序播放')
    musicStore.changePlayMode('order')
  }
}

const active = ref(false)
type playListType = {
  playListCount: number
  currentPlayIndex: number
  playing: boolean
  playList: any[]
}
const play = ref<playListType>({
  playListCount: songs.length,
  currentPlayIndex: 1,
  playing: true,
  playList: songs
})
// 双击
const handleDoubleClick = async (index: number) => {
  console.log('双击', index)
}
// 点击清空
const handleRestClick = () => {
  console.log('点击清空')
}
const handleGoHemeClick = () => {
  console.log('GoHeme')
  active.value = false
}

const formateSongsAuthor = (ar?: any[]) => {
  const ars = ar ?? []
  if (ars.length > 0) {
    return ars
      .map((v: any) => {
        return v.name
      })
      .join(',')
  }
  return ''
}

const stripedClass = (index: number) => {
  let classes = ''
  if (index % 2 === 0) {
    classes = themeStore.getTheme === null ? 'bg-white hover:bg-#F3F4F6' : 'bg-#25252580 hover:bg-#e5e7eb1a'
  } else {
    classes = themeStore.getTheme === null ? 'bg-#F9FAFB hover:bg-#F3F4F6' : ' bg-#252525 hover:bg-#e5e7eb1a'
  }
  return classes
}
</script>
<style lang="scss" scoped>
.scroller {
  height: 100%;
}

:deep(.resize-observer) {
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  display: block;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  opacity: 0;
  pointer-events: none;
}

.item {
  padding: 0 20px;
  cursor: pointer;
}

:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
  padding-bottom: 15px;
}
</style>
<route lang="yaml">
meta:
  breadcrumb: page.virtualScroller
  icon: i-carbon:color-palette
  sort: 8000
</route>
