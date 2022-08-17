<!-- eslint-disable vue/multi-word-component-names -->
<template>
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
      <!-- <howler-component v-model:current="current" :player="player" /> -->
    </template>
  </n-card>
  <menu-component v-model:active="active" v-model:menu-run="menuRun" :menu-list="musicMenuList" />
</template>
<script setup lang="ts" name="music">
import { musicMenuListData } from './songs'
import { musicMenuListCombinationType, musicMenuType, musicMenuRunType } from '@/types/musicType'
import { useMusicStore } from '@store/music'
const musicStore = useMusicStore()

const musicMenuList = ref<musicMenuListCombinationType>()
const active = ref<boolean>(false)
const menuRun = ref<Map<string, musicMenuRunType>>()

const openMenu = async () => {
  active.value = true
  await nextTick()
  if (musicStore.getCount === 0) {
    initMenuList()
    musicStore.setMusicMenuListSingle(musicMenuList.value!)
  }
}
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
    const musicMenuListCombinationValue: musicMenuListCombinationType = musicStore.getMusicMenuList
    musicMenuList.value = musicMenuListCombinationValue
    const menuRunValue: Map<string, musicMenuRunType> = musicStore.getMapRun
    if (menuRunValue.size > 0) {
      menuRun.value = menuRunValue
    } else {
      const menuRunMap = new Map<string, musicMenuRunType>()
      musicMenuListCombinationValue.musicMenuList.forEach((v: musicMenuType) => {
        menuRunMap.set(v.id + '', 'none')
      })
      menuRun.value = menuRunMap
    }
  }
})
const initMenuList = async () => {
  const musicMenuListValue: musicMenuType[] = musicMenuListData() ?? []
  musicMenuList.value = {
    count: musicMenuListValue.length,
    musicMenuList: musicMenuListValue
  }
  const menuRunMap = new Map<string, musicMenuRunType>()
  musicMenuListValue.forEach((v: musicMenuType) => {
    menuRunMap.set(v.id + '', 'none')
  })
  menuRun.value = menuRunMap
}
</script>
<route lang="yaml">
meta:
  breadcrumb: page.music
  icon: file-markdown-filled
  sort: 20000
</route>
