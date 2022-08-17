<template>
  <n-space vertical>
    <div v-if="playList[0]?.howler">
      <div flex items-center>
        <n-button v-if="current[0].play === 'ready'" type="success" @click="playZi(0)"
          >【播放器组件】孤勇者ready</n-button
        >
        <n-button v-else type="success" @click="pauseZi(0)">【播放器组件】孤勇者play</n-button>
        <div w-300 flex justify-center items-center>
          <div w-80>{{ time[0] }}</div>
          <n-slider
            v-model:value="timeSlider[0]"
            :on-update:value="
          (value: number) => {
            timeChange(0, value)
          }
        "
            :step="1"
            :max="timeMaxSlider[0]"
          />
          <div w-80>{{ duration[0] }}</div>
        </div>
      </div>
    </div>
    <div v-if="playList[1]?.howler">
      <div flex items-center>
        <n-button v-if="current[1].play === 'ready'" type="success" @click="playZi(1)"
          >【播放器组件】好运来ready</n-button
        >
        <n-button v-else type="success" @click="pauseZi(1)">【播放器组件】好运来play</n-button>
        <div w-300 flex justify-center items-center>
          <div w-80>{{ time[1] }}</div>
          <n-slider
            v-model:value="timeSlider[1]"
            :on-update:value="
          (value: number) => {
            timeChange(1, value)
          }
        "
            :step="1"
            :max="timeMaxSlider[1]"
          />
          <div w-80>{{ duration[1] }}</div>
        </div>
      </div>
    </div>
  </n-space>
  <n-space justify-center>
    全局音量
    <div w-300>
      <n-slider :default-value="10" :on-update:value="volumeChange" :step="10" />
    </div>
  </n-space>
</template>
<script setup lang="ts" name="howler-component">
import { Howl, Howler } from 'howler'
import dayjs from 'dayjs'

const emit = defineEmits<{
  (e: 'update:current', current: currentType[]): void
}>()

type playType = {
  title: string
  src: string[]
  format: string[]
  howler?: Howl
}
type currentType = {
  index: number
  play: 'play' | 'ready' | 'noexist'
}

/**
 * 获取组件传值
 */
const props = withDefaults(
  defineProps<{
    current: currentType[]
    player: playType[]
  }>(),
  {
    current: () => {
      return []
    },
    player: () => {
      return []
    }
  }
)
const playList = computed(() => props.player)
const current = computed(() => props.current)

const timeSlider = ref<number[]>([])
const timeMaxSlider = ref<number[]>([])
const duration = ref<string[]>([])
const time = ref<string[]>([])

watch(
  () => props.player,
  (newVal, oldVal) => {
    Howler.unload()
  }
)

watch(
  () => [...props.current],
  (newVal, oldVal) => {
    newVal.forEach(nv => {
      const index = nv.index
      if (nv.play === 'play') {
        play(index)
      } else if (nv.play === 'ready') {
        pause(index)
      }
    })
  }
)

const playZi = (index: number) => {
  play(index)
  current.value[index] = { index: index, play: 'play' }
  emit('update:current', current.value)
}

const pauseZi = (index: number) => {
  if (playList.value.length < index + 1) {
    current.value[index] = { index: index, play: 'noexist' }
    emit('update:current', current.value)
    return
  }
  const sound = playList.value[index]?.howler
  if (sound && sound.playing()) {
    sound.pause()
    current.value[index] = { index: index, play: 'ready' }
    emit('update:current', current.value)
  }
}

const play = (index: number) => {
  if (playList.value.length < index + 1) {
    current.value[index] = { index: index, play: 'noexist' }
    emit('update:current', current.value)
    return
  }
  const playData = playList.value[index]
  const sound = playData.howler
    ? playData.howler
    : (playData.howler = new Howl({
        src: playData.src,
        format: playData.format,
        onplay: function () {
          // Display the duration.
          const durationV = Math.round(sound.duration() || 0)
          duration.value[index] = dayjs(durationV * 1000).format('mm:ss')
          timeMaxSlider.value[index] = durationV
          // 第一次播放触发
          step(index)
        },
        onload: function () {
          console.log('onload')
        },
        onend: function () {
          console.log('onend')
        },
        onpause: function () {
          console.log('onpause')
        },
        onstop: function () {
          console.log('onstop')
        },
        onseek: function () {
          // 设置seek进度触发
          step(index)
        }
      }))
  sound.play()
}

const step = (index: number) => {
  const playData = playList.value[index]
  const sound = playData.howler
  if (sound) {
    const seek = Math.round(sound.seek() || 0)
    timeSlider.value[index] = seek
    time.value[index] = dayjs(seek * 1000).format('mm:ss')
    // 是否在播放，在播放就查询下一次进度
    if (sound.playing()) {
      setTimeout(() => {
        step(index)
      }, 1000)
    }
  }
}

const pause = (index: number) => {
  const sound = playList.value[index]?.howler
  if (sound) {
    sound.pause()
  }
}

// 音量设置
const volumeChange = (value: number) => {
  Howler.volume(value * 0.01)
}

// 进度
const timeChange = (index: number, value: number) => {
  const playData = playList.value[index]
  const sound = playData.howler
  if (sound) {
    sound.seek(value)
  } else {
    timeSlider.value[index] = 0
  }
}
</script>

<style lang="scss" scoped></style>
