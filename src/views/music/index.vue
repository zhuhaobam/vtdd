<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <n-card
      title="DIV 基于howler的播放器"
      :segmented="{
        content: true,
        footer: 'soft'
      }"
    >
      <template #header-extra>
        <n-button type="success" @click="openMenu"> 【虚拟滚动条DynamicScroller】音乐菜单 </n-button>
      </template>
      <template #action>
        <n-input />
      </template>
    </n-card>
    <menu-component v-model:active="active" v-model:menu-run="menuRun" :menu-list="musicMenuList" />
  </div>
</template>
<script setup lang="ts" name="music">
import { musicMenuListData, musicSrcListData } from './songs'
import { musicMenuListCombinationType, musicMenuType, musicMenuRunType, musicSrcType } from '@/types/musicType'
import { useMusicStore } from '@store/music'
const musicStore = useMusicStore()

const musicMenuList = ref<musicMenuListCombinationType>()
const active = ref<boolean>(false)
const menuRun = ref<Map<string, musicMenuRunType>>()
const player = ref<musicSrcType[]>()

const openMenu = async () => {
  active.value = true
  await nextTick()
  if (musicStore.getCount === 0) {
    initMenuList()
    musicStore.setMusicMenuListSingle(musicMenuList.value!)
    musicStore.setPlayer(player.value!)
  }
}

watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    const menuRunValue: Map<string, musicMenuRunType> = newVal
    menuRun.value = menuRunValue
    console.log('改变菜单播放显示')
  }
)

watch(
  () => musicStore.getMusicMenuList,
  (newVal, oldVal) => {
    if (newVal.count === 0) {
      musicMenuList.value = { count: 0, musicMenuList: [] }
      const menuRunMap = new Map<string, musicMenuRunType>()
      menuRun.value = menuRunMap
    }
  }
)

onMounted(() => {
  if (musicStore.getCount > 0) {
    // 菜单
    const musicMenuListCombinationValue: musicMenuListCombinationType = musicStore.getMusicMenuList
    musicMenuList.value = musicMenuListCombinationValue
    const menuRunValue: Map<string, musicMenuRunType> = musicStore.getMapRun
    if (menuRunValue.size > 0) {
      menuRun.value = menuRunValue
    } else {
      const menuRunMap = new Map<string, musicMenuRunType>()
      musicMenuListCombinationValue.musicMenuList.forEach((v: musicMenuType) => {
        menuRunMap.set(v.id, 'none')
      })
      menuRun.value = menuRunMap
    }
    // 播放器
    const musicPlayerValue: musicSrcType[] = musicStore.getPlayer
    player.value = musicPlayerValue
  }
})
const initMenuList = async () => {
  // 菜单
  const musicMenuListValue: musicMenuType[] = musicMenuListData() ?? []
  musicMenuList.value = {
    count: musicMenuListValue.length,
    musicMenuList: musicMenuListValue
  }
  const menuRunMap = new Map<string, musicMenuRunType>()
  musicMenuListValue.forEach((v: musicMenuType) => {
    menuRunMap.set(v.id, 'none')
  })
  menuRun.value = menuRunMap
  // 播放器
  const musicSrcListValue: musicSrcType[] = musicSrcListData() ?? []
  player.value = musicSrcListValue
}
</script>
<route lang="yaml">
meta:
  breadcrumb: page.music
  icon: file-markdown-filled
  sort: 20000
</route>
