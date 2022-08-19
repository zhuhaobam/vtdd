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
onMounted(() => {
  Howler.unload()
  musicStore.destroy()
})
watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    console.log('改变播放器')
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
)

const newHowl = (musicSrc: musicSrcType): Howl => {
  const howlObj = new Howl({
    src: [...musicSrc.src],
    format: [...musicSrc.format],
    onplay: function () {
      console.log('onplay')
      const durationV = Math.round(howlObj.duration() || 0)
      console.log(musicSrc.name[0] + '[' + musicSrc.id + ']时长:' + dayjs(durationV * 1000).format('mm:ss'))
      step(musicSrc.name[0], musicSrc.id)
    },
    onload: function () {
      console.log('onload')
    },
    onend: function () {
      const id = musicSrc.id
      const menuMap: Map<string, musicMenuRunType> = musicStore.getMapRun
      if (menuMap.get(id) === 'none' || menuMap.get(id) === 'pause') {
        menuMap.set(id, 'playing')
        musicStore.setMapRun(menuMap)
      } else {
        menuMap.set(id, 'pause')
        musicStore.setMapRun(menuMap)
      }
      console.log('onend', mapHowlPause.value, menuMap)
    },
    onpause: function () {
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
      howlOld.play()
      const seek = howlOld.seek(howlId)
      console.log('历史播放', howlId, seek)
      mapHowlPause.value.set(musicSrc.id, { howl: howlOld, howlId: howlId, seek: seek })
    }
  } else {
    const howlObj: Howl = newHowl(musicSrc)
    const howlId = howlObj.play()
    console.log('新建播放', howlId, 0)
    mapHowlPause.value.set(musicSrc.id, { howl: howlObj, howlId: howlId, seek: 0 })
  }
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

const step = (name: string, id: string) => {
  const howlPauseObjOld: globalHowlPauseType | undefined = mapHowlPause.value?.get(id)
  if (howlPauseObjOld?.howl) {
    const howlOld: Howl = howlPauseObjOld.howl
    const howlId = howlPauseObjOld.howlId
    if (howlOld.playing(howlId)) {
      const seekV = Math.round(howlOld.seek(howlId) || 0)
      console.log(name + '[' + id + ']进度:' + dayjs(seekV * 1000).format('mm:ss'))
      setTimeout(() => {
        step(name, id)
      }, 5000)
    }
  }
}
</script>

<style lang="scss" scoped>
// test
</style>
