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
        <div v-if="(musicMenuList?.count ?? 0) === 0">
          <n-button dashed> 【虚拟滚动条DynamicScroller】音乐菜单 </n-button>
        </div>
        <n-badge v-else :value="musicMenuList?.count ?? 0" :max="10">
          <n-button type="success" @click="openMenu"> 【虚拟滚动条DynamicScroller】音乐菜单 </n-button>
        </n-badge>
      </template>
      <template #footer>
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
              <span v-if="(menuSeekRun?.get(item.id) ?? '0') !== '0'" style="font-size: 0.875rem">
                {{ dayjs(Number(menuSeekRun?.get(item.id)) * 1000).format('mm:ss') }}
              </span>
            </n-button>
            <div flex flex-row>
              <n-card
                v-for="(item, index) in musicMenuList?.musicMenuList"
                :key="index"
                :title="item.name + '歌词'"
                hoverable
                style="width: 500px"
              >
                <lyric-component
                  :seek-run="seekRunMap?.get(item.id) ?? '0'"
                  tlyric=""
                  :lyric="lyricMap?.get(item.id)"
                />
              </n-card>
            </div>
          </n-space>
        </div>
      </template>
      <template #action>
        <n-alert title="讲解：本项目只有技术价值😀 " type="default">
          <template #icon>
            <n-icon>
              <alarm-outline />
            </n-icon>
          </template>
          *、
          最大的特点是我在`router-view`外面包裹了一个自定义组件`music-global`,我可以全局跳转不影响音乐页面的操作和显示，刷新保持增加复杂度尝试了还是不做)
          <br />
          #、
          要点：TypeScript类型的定义，Pinia的状态使用，Persist的使用（为难Persist存储Map数据结构，需要存取各自转换），watch监听store和双向绑定modal（最少的操作对象，要不然你会发现总是在触发），Howler的基本使用,global缓存Howler（不刷新操作的秘密）<br />
          &、 控制台打印了埋点信息，我调试的时候留下的 <br />
          %、
          缺点：1.库的缓存和我自己的缓存以及状态存储，刷新都给清空了。2.多首歌曲播放进度每一秒全部更新了一遍，监听处理的压力比较大，刷新或者切换菜单都给清空了。3.希望有更好的方式
          <br />
          1、 点击“模拟切换音乐菜单”按钮，加载新的播放菜单 <br />
          2、 选择“页面播放列表（防抖一秒）”（单击播放）或者“虚拟滚动条DynamicScroller】音乐菜单”（双击播放）<br />
          3、 Howler.js支持同时播放多首歌曲，此处按照多首歌曲同时播放来做的【播放、暂停、菜单显示、页面显示、进度显示】
        </n-alert>
      </template>
    </n-card>
    <menu-component
      v-model:active="active"
      v-model:menu-run="menuRun"
      v-model:menu-seek-run="menuSeekRun"
      :menu-list="musicMenuList"
    />
  </div>
</template>
<script setup lang="ts" name="music">
import { MusicalNotesOutline, AlarmOutline } from '@vicons/ionicons5'
import { musicMenuListData, musicSrcListData, musicLyricListData } from './songs'
import {
  musicMenuListCombinationType,
  musicMenuType,
  musicMenuRunType,
  musicSrcType,
  musicLyricsType
} from '@/types/musicType'
import { useMusicStore } from '@store/music'
import dayjs from 'dayjs'
import { Howler } from 'howler'
import { cloneDeep } from 'lodash'
const musicStore = useMusicStore()

const musicMenuList = ref<musicMenuListCombinationType>()
const active = ref<boolean>(false)
const menuRun = ref<Map<string, musicMenuRunType>>()
const menuSeekRun = ref<Map<string, string>>()
const player = ref<musicSrcType[]>()

// 测试歌词
const lyricMap = ref<Map<string, string>>()
const seekRunMap = ref<Map<string, string>>()
const openMenu = () => {
  active.value = true
  // console.log('获取历史菜单、播放资源数据【' + musicStore.getCount + '】')
}

const changeOneMenu = async () => {
  // console.log('changeOneMenu，卸载播放器，清空存储，初始化菜单、菜单状态、播放资源')
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
  // 菜单seek状态
  const menuSeekRunMap = new Map<string, string>()
  menuSeekRunMap.set(musicMenuListValue[1].id, '0')
  menuSeekRun.value = menuSeekRunMap
  // 播放资源
  const musicSrcListValue: musicSrcType[] = musicSrcListData() ?? []
  player.value = [musicSrcListValue[1]]
  musicStore.setPlayer(player.value!)

  // 歌词
  const lyricRunMap = new Map<string, string>()
  musicLyricListData().forEach((v: musicLyricsType) => {
    lyricRunMap.set(v.id, v.text)
  })
  lyricMap.value = lyricRunMap
}

const changeTwoMenu = async () => {
  // console.log('changeTwoMenu，卸载播放器，清空存储，初始化菜单、菜单状态、播放资源')
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
  // 菜单seek状态
  const menuSeekRunMap = new Map<string, string>()
  musicMenuListValue.forEach((v: musicMenuType) => {
    menuSeekRunMap.set(v.id, '0')
  })
  menuSeekRun.value = menuSeekRunMap
  // 播放资源
  const musicSrcListValue: musicSrcType[] = musicSrcListData() ?? []
  player.value = musicSrcListValue
  musicStore.setPlayer(player.value)
  // 歌词
  const lyricRunMap = new Map<string, string>()
  musicLyricListData().forEach((v: musicLyricsType) => {
    lyricRunMap.set(v.id, v.text)
  })
  lyricMap.value = lyricRunMap
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
  // console.log('useDebounceFn')
  musicStore.setMapRun(menuMap)
}, 1000)

/**
 * 改变菜单状态播放显示
 */
watch(
  () => musicStore.getMapRun,
  (newVal, oldVal) => {
    // console.log('改变菜单状态播放显示')
    const menuRunValue: Map<string, musicMenuRunType> = newVal
    menuRun.value = menuRunValue
  }
)

watch(
  () => musicStore.getMapSeekRun,
  (newVal, oldVal) => {
    // console.log('改变菜单seek状态播放显示', newVal)
    const menuSeekRunValue: Map<string, string> = newVal
    menuSeekRun.value = menuSeekRunValue
    seekRunMap.value = menuSeekRunValue
  }
)

/**
 * 如果列表为空，菜单播放显示状态也置为空
 */
watch(
  () => musicStore.getMusicMenuList,
  (newVal, oldVal) => {
    if (newVal.count === 0) {
      // console.log('列表为空，运行状态也置为空，列表为空说明列表我在更新中')
      musicMenuList.value = { count: 0, musicMenuList: [] }
      const menuRunMap = new Map<string, musicMenuRunType>()
      menuRun.value = menuRunMap
    } else {
      // console.log('列表(bu)为空，照旧')
    }
  }
)

onMounted(() => {
  if (musicStore.getCount > 0) {
    // console.log('onMounted，存储历史菜单、菜单状态、播放资源,回填')
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
  sort: -20
</route>
