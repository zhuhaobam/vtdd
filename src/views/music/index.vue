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
        <n-space>
          <n-button type="success" @click="changeOneMenu"> 模拟切换音乐菜单【1首】 </n-button>
          <n-button type="success" @click="changeTwoMenu"> 模拟切换音乐菜单【2首】 </n-button>
        </n-space>
        <div pt-20>
          <n-space v-if="(musicMenuList?.count ?? 0) > 0" vertical>
            <h3>页面播放列表（防抖一秒）</h3>
            <n-button
              v-for="(item, index) in musicMenuList?.musicMenuList"
              :key="index"
              type="success"
              @click="handleClick(item.id)"
            >
              <div v-if="menuRun?.get(item.id) === 'playing'">
                <n-icon
                  pr-2
                  size="20"
                  :component="menuRun.get(item.id) === 'playing' ? MusicalNotesOutline : undefined"
                />
              </div>
              {{ item.name }}
            </n-button>
          </n-space>
        </div>
      </template>
    </n-card>
    <menu-component v-model:active="active" v-model:menu-run="menuRun" :menu-list="musicMenuList" />
  </div>
</template>
<script setup lang="ts" name="music">
import { MusicalNotesOutline } from '@vicons/ionicons5'
import { musicMenuListData, musicSrcListData } from './songs'
import { musicMenuListCombinationType, musicMenuType, musicMenuRunType, musicSrcType } from '@/types/musicType'
import { useMusicStore } from '@store/music'
import { Howler } from 'howler'
import { cloneDeep } from 'lodash'
const musicStore = useMusicStore()

const musicMenuList = ref<musicMenuListCombinationType>()
const active = ref<boolean>(false)
const menuRun = ref<Map<string, musicMenuRunType>>()
const player = ref<musicSrcType[]>()

const openMenu = () => {
  active.value = true
  console.log('获取历史菜单、播放资源数据【' + musicStore.getCount + '】')
}

const changeOneMenu = async () => {
  console.log('changeOneMenu，卸载播放器，清空存储，初始化菜单、菜单状态、播放资源')
  // 卸载播放器
  Howler.unload()
  // 清空存储
  musicStore.destroy()
  await nextTick()
  // 菜单
  const musicMenuListValue: musicMenuType[] = musicMenuListData() ?? []
  musicMenuList.value = {
    count: 1,
    musicMenuList: [musicMenuListValue[1]]
  }
  musicStore.setMusicMenuList(1, [musicMenuListValue[1]])
  // 菜单状态
  const menuRunMap = new Map<string, musicMenuRunType>()
  menuRunMap.set(musicMenuListValue[1].id, 'none')
  menuRun.value = menuRunMap
  // 播放资源
  const musicSrcListValue: musicSrcType[] = musicSrcListData() ?? []
  player.value = [musicSrcListValue[1]]
  musicStore.setPlayer(player.value!)
}

const changeTwoMenu = async () => {
  console.log('changeTwoMenu，卸载播放器，清空存储，初始化菜单、菜单状态、播放资源')
  // 卸载播放器
  Howler.unload()
  // 清空存储
  musicStore.destroy()
  await nextTick()
  // 菜单
  const musicMenuListValue: musicMenuType[] = musicMenuListData() ?? []
  musicMenuList.value = {
    count: musicMenuListValue.length,
    musicMenuList: musicMenuListValue
  }
  musicStore.setMusicMenuListSingle(musicMenuList.value)
  // 菜单状态
  const menuRunMap = new Map<string, musicMenuRunType>()
  musicMenuListValue.forEach((v: musicMenuType) => {
    menuRunMap.set(v.id, 'none')
  })
  menuRun.value = menuRunMap
  // 播放资源
  const musicSrcListValue: musicSrcType[] = musicSrcListData() ?? []
  player.value = musicSrcListValue
  musicStore.setPlayer(player.value)
}

/**
 * 双击 播放、暂停
 */
const handleClick = (id: string) => {
  // 其它页面可以通过监听store里面的menuRun来对播放进行更改，此处页面有且能更新侧边菜单
  const menuMap: Map<string, musicMenuRunType> = menuRun.value ?? new Map<string, musicMenuRunType>()
  if (menuMap.size !== 0) {
    if (menuMap.get(id) === 'none' || menuMap.get(id) === 'pause') {
      menuMap.set(id, 'playing')
    } else {
      menuMap.set(id, 'pause')
    }
    debouncedFn(cloneDeep(menuMap))
  }
}

const debouncedFn = useDebounceFn((menuMap: Map<string, musicMenuRunType>) => {
  console.log('useDebounceFn')
  musicStore.setMapRun(menuMap)
}, 1000)

/**
 * 改变菜单状态播放显示
 */
watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    console.log('改变菜单状态播放显示')
    const menuRunValue: Map<string, musicMenuRunType> = newVal
    menuRun.value = menuRunValue
  }
)

/**
 * 如果列表为空，菜单播放显示状态也置为空
 */
watch(
  () => musicStore.getMusicMenuList,
  (newVal, oldVal) => {
    if (newVal.count === 0) {
      console.log('列表为空，运行状态也置为空，列表为空说明列表我在更新中')
      musicMenuList.value = { count: 0, musicMenuList: [] }
      const menuRunMap = new Map<string, musicMenuRunType>()
      menuRun.value = menuRunMap
    } else {
      console.log('列表(bu)为空，照旧')
    }
  }
)

onMounted(() => {
  if (musicStore.getCount > 0) {
    console.log('onMounted，存储历史菜单、菜单状态、播放资源,回填')
    // 菜单
    const musicMenuListCombinationValue: musicMenuListCombinationType = musicStore.getMusicMenuList
    musicMenuList.value = musicMenuListCombinationValue
    // 菜单状态
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
    // 播放资
    const musicPlayerValue: musicSrcType[] = musicStore.getPlayer
    player.value = musicPlayerValue
  }
})
</script>
<route lang="yaml">
meta:
  breadcrumb: page.music
  icon: file-markdown-filled
  sort: 20000
</route>
