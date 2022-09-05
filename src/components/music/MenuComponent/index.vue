<template>
  <n-drawer
    v-model:show="active"
    :on-after-leave="onAfterLeave"
    :width="screen !== 'xs' && screen !== 's' ? 450 : 280"
    placement="right"
    :trap-focus="false"
    :block-scroll="false"
    :to="to"
    :style="
      'background-image: url(' +
      getAssetsFile('music-bg.webp') +
      ');background-position:center;background-repeat:no-repeat;background-position: bottom right;background-size: auto 240px;'
    "
  >
    <n-drawer-content :native-scrollbar="false">
      <template #header>
        <div
          class="flex justify-between odd:"
          :style="'width:' + (screen !== 'xs' && screen !== 's' ? 400 : 230) + 'px'"
        >
          <span class="opacity-50" style="font-size: 0.875rem">共 {{ menus.count }} 首 </span>
          <n-button type="primary" text @click="handleRestClick"> 清空列表 </n-button>
        </div>
      </template>
      <n-empty v-if="menus.count === 0" class="mt-20" description="您还未添加任何歌曲">
        <template #extra>
          <n-button text type="primary" @click="handleGoHemeClick"> 去首页发现音乐 </n-button>
        </template>
      </n-empty>
      <DynamicScroller
        class="scroller"
        :items="menus.musicMenuList"
        :min-item-size="height"
        :item-size="height"
        key-field="id"
      >
        <template #default="{ item, index }">
          <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.message]" :data-index="index">
            <div h13 cursor-pointer flex :class="stripedClass(index)" @dblclick="handleDoubleClick(item.id)">
              <n-grid x-gap="12" :cols="24" flex items-center>
                <n-gi span="3">
                  <div v-if="menuRun.get(item.id) === 'playing'" pl-4 flex items-center>
                    <n-icon
                      size="18"
                      color="#18a058"
                      :component="menuRun.get(item.id) === 'playing' ? MusicalNotesOutline : undefined"
                    />
                  </div>
                </n-gi>
                <n-gi span="4" flex items-center>
                  <n-avatar size="small" :src="item.al.picUrl" b-rd-1 />
                </n-gi>
                <n-gi span="6" truncate>
                  {{ item.name }}
                </n-gi>
                <n-gi span="5" truncate>
                  {{ formateSongsAuthor(item.ar) }}
                </n-gi>
                <n-gi
                  span="6"
                  flex
                  :class="screen !== 'xs' && screen !== 's' ? 'flex-row justify-around' : 'flex-col '"
                >
                  <span
                    v-if="!['onplay', 'onend', 'onpause', '0'].includes(menuSeekRun?.get(item.id) ?? '0')"
                    colorhex-18a058
                  >
                    {{ dayjs(Number(menuSeekRun.get(item.id)) * 1000).format('mm:ss') }}
                  </span>
                  <n-time opacity-40 format="mm:ss" :time="item.dt" />
                </n-gi>
              </n-grid>
            </div>
          </DynamicScrollerItem>
        </template>
      </DynamicScroller>
    </n-drawer-content>
  </n-drawer>
</template>
<script setup lang="ts">
import { getAssetsFile } from '@/plugins/assets-kit'
import { MusicalNotesOutline } from '@vicons/ionicons5'
import { musicMenuRunType, musicMenuListCombinationType } from '@/types/musicType'
import { useMusicStore } from '@store/music'
import { useFullscreen } from '@vueuse/core'
import { useFullStore } from '@store/full'
import dayjs from 'dayjs'
import { Howler } from 'howler'
import { createDiscreteApi } from 'naive-ui'
import { ComputedRef } from 'vue'
const { message } = createDiscreteApi(['message'])

// 屏幕大小
const screen = computed(() => {
  return inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')?.value
})

/**
 * 每列高度
 */
const height = ref<Number>(52)
const { isFullscreen } = useFullscreen()
const musicStore = useMusicStore()
const fullStore = useFullStore()

const emit = defineEmits<{
  (e: 'update:active', active: boolean): void
}>()

const to = ref()

/**
 * 获取组件传值
 */
const props = withDefaults(
  defineProps<{
    active: boolean
    menuRun: Map<string, musicMenuRunType>
    menuSeekRun: Map<string, string>
    menuList: musicMenuListCombinationType
  }>(),
  {
    active: false,
    menuRun: () => {
      return new Map<string, musicMenuRunType>()
    },
    menuSeekRun: () => {
      return new Map<string, string>()
    },
    menuList: () => {
      return {
        count: 0,
        musicMenuList: []
      }
    }
  }
)
const active = ref<boolean>(false)
const menuRun = computed(() => props.menuRun)
const menuSeekRun = computed(() => props.menuSeekRun)
const menus = computed(() => props.menuList)
watch(
  () => props.active,
  (newVal, oldVal) => {
    if (newVal === true) {
      // 处理tag栏目的那个全屏功能，需要结合查看layouts文件夹下面的tags文件
      to.value = isFullscreen.value === true && fullStore.getPage === 'inner:true' ? '#app-main' : undefined
      active.value = true
    }
  }
)

/**
 * 抽屉关闭回调
 */
const onAfterLeave = () => {
  emit('update:active', false)
}

/**
 * 双击 播放、暂停
 */
const handleDoubleClick = async (id: string) => {
  const menuMap: Map<string, musicMenuRunType> = menuRun.value
  if (menuMap.get(id) === 'none' || menuMap.get(id) === 'pause') {
    menuMap.set(id, 'playing')
  } else {
    menuMap.set(id, 'pause')
  }
  musicStore.setMapRun(menuMap)
}
/**
 * 点击清空
 */
const handleRestClick = () => {
  // 卸载播放器
  Howler.unload()
  // 清空存储
  musicStore.init()
}
const handleGoHemeClick = () => {
  message.info('点一点模拟切换按钮再来看看')
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
    classes = 'bg-white hover:bg-#F3F4F6 dark:bg-#25252580 dark:hover:bg-#e5e7eb1a'
  } else {
    classes = 'bg-#F9FAFB hover:bg-#F3F4F6 dark:bg-#252525 dark:hover:bg-#e5e7eb1a'
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

:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
  padding-bottom: 15px;
}
</style>
