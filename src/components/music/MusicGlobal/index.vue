<template>
  <div>
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="music-global">
import { musicMenuRunType, musicSrcType, globalHowlPauseType } from '@/types/musicType'
import { useMusicStore } from '@store/music'
import { Howl, Howler } from 'howler'
import dayjs from 'dayjs'
const musicStore = useMusicStore()
const mapHowlPause = ref<Map<string, globalHowlPauseType>>(new Map<string, globalHowlPauseType>())
const mapHowlPauseStepTimeAssert = ref<Map<string, number>>(new Map<string, number>())
onMounted(() => {
  Howler.unload()
  musicStore.destroy()
})
watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    console.log('改变播放器' + (newVal.size === 0 ? '【没有运行数据】' : '【有运行数据】'))
    if (newVal.size === 0) {
      mapHowlPause.value = new Map<string, globalHowlPauseType>()
      mapHowlPauseStepTimeAssert.value = new Map<string, number>()
    } else {
      const musicPlayerValue: musicSrcType[] = musicStore.getPlayer
      const menuRunValue: Map<string, musicMenuRunType> = newVal
      for (const [id, musicMenuRun] of menuRunValue) {
        if (musicMenuRun === 'playing') {
          const musicSrc: musicSrcType = musicPlayerValue.find((v: musicSrcType) => v.id === id)!
          playing(musicSrc)
        } else if (musicMenuRun === 'pause') {
          pause(id)
        }
      }
    }
  }
)

const newHowl = (musicSrc: musicSrcType): Howl => {
  const howlObj = new Howl({
    src: [...musicSrc.src],
    format: [...musicSrc.format],
    onplay: function () {
      console.log('onplay')
      const durationV = Math.round(howlObj.duration() || 0)
      console.log(musicSrc.name[0] + '[' + musicSrc.id + ']时长:' + dayjs(durationV * 1000).format('mm:ss'))
      const stepTimeAssert: number | undefined = mapHowlPauseStepTimeAssert.value.get(musicSrc.id)
      if (stepTimeAssert) {
        step(musicSrc.name[0], musicSrc.id, stepTimeAssert)
      }
    },
    onload: function () {
      console.log('onload')
    },
    onend: function () {
      const id = musicSrc.id
      const menuMap: Map<string, musicMenuRunType> = musicStore.getMapRun
      menuMap.set(id, 'none')
      musicStore.setMapRun(menuMap)
      musicStore.setMapSeekRunOne(musicSrc.id, '')
      console.log('onend', mapHowlPause.value, menuMap)
    },
    onpause: function () {
      musicStore.setMapSeekRunOne(musicSrc.id, '')
      console.log('onpause')
    },
    onstop: function () {
      console.log('onstop')
    },
    onseek: function () {
      // 设置seek进度触发
    }
  })
  return howlObj
}

const playing = (musicSrc: musicSrcType) => {
  const howlPauseObjOld: globalHowlPauseType | undefined = mapHowlPause.value?.get(musicSrc.id)
  if (howlPauseObjOld) {
    const howlOld: Howl = howlPauseObjOld.howl
    const howlId = howlPauseObjOld.howlId
    if (!howlOld.playing(howlId)) {
      if (howlOld.state() === 'unloaded') {
        const howlObj: Howl = newHowl(musicSrc)
        const howlId = howlObj.play()
        console.log('历史unload新建播放', howlId, 0)
        mapHowlPause.value.set(musicSrc.id, { howl: howlObj, howlId: howlId, seek: 0 })
        mapHowlPauseStepTimeAssert.value.set(musicSrc.id, 1)
      } else {
        howlOld.play()
        const seek = howlOld.seek(howlId)
        console.log('历史播放', howlId, seek)
        mapHowlPause.value.set(musicSrc.id, { howl: howlOld, howlId: howlId, seek: seek })
        mapHowlPauseStepTimeAssert.value.set(musicSrc.id, new Date().getTime())
      }
    }
  } else {
    const howlObj: Howl = newHowl(musicSrc)
    const howlId = howlObj.play()
    console.log('新建播放', howlId, 0)
    mapHowlPause.value.set(musicSrc.id, { howl: howlObj, howlId: howlId, seek: 0 })
    mapHowlPauseStepTimeAssert.value.set(musicSrc.id, 1)
  }
  console.log('播放器缓存大小', mapHowlPause.value.size)
}

const pause = (id: string) => {
  const howlPauseObjOld: globalHowlPauseType | undefined = mapHowlPause.value?.get(id)
  if (howlPauseObjOld?.howl) {
    const howlOld: Howl = howlPauseObjOld.howl
    const howlId = howlPauseObjOld.howlId
    if (howlOld.playing(howlId)) {
      howlOld.pause(howlId)
      const seek = howlOld.seek(howlId)
      console.log('暂停', howlId, seek)
      mapHowlPause.value.set(id, { howl: howlOld, howlId: howlId, seek: seek })
    }
  }
}

const step = (name: string, id: string, date: number) => {
  const stepTimeAssert: number | undefined = mapHowlPauseStepTimeAssert.value.get(id)
  // stepTimeAssert && stepTimeAssert === date 断言因为暂停和播放导致的历史step还在运行，历史step没有及时的停下自我调用
  if (date === 0 || (stepTimeAssert && stepTimeAssert === date)) {
    const howlPauseObjOld: globalHowlPauseType | undefined = mapHowlPause.value?.get(id)
    if (howlPauseObjOld?.howl) {
      const howlOld: Howl = howlPauseObjOld.howl
      const howlId = howlPauseObjOld.howlId
      if (howlOld.playing(howlId)) {
        const seekV = Math.round(howlOld.seek(howlId) || 0)
        const progressV = dayjs(seekV * 1000).format('mm:ss')
        musicStore.setMapSeekRunOne(id, progressV)
        const consoleStr = 'progress时间戳【%d】歌名:【%s】歌曲id:【%d】progress:【%s】'
        console.log(consoleStr, date, name, id, progressV)
        setTimeout(() => {
          step(name, id, date)
        }, 5000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
// test
</style>
