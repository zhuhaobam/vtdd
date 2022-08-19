<template>
  <n-drawer
    v-model:show="active"
    :on-after-leave="onAfterLeave"
    :width="450"
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
        <div class="flex justify-between odd:" style="width: 400px">
          <span class="opacity-50" style="font-size: 0.875rem">共 {{ menus.count }} 首 </span>
          <n-button type="primary" text @click="handleRestClick"> 清空列表 </n-button>
        </div>
      </template>
      <n-empty v-if="menus.count === 0" class="mt-20" description="您还未添加任何歌曲">
        <template #extra>
          <n-button text type="primary" @click="handleGoHemeClick"> 去首页发现音乐 </n-button>
        </template>
      </n-empty>
      <DynamicScroller class="scroller" :items="menus.musicMenuList" :min-item-size="50" key-field="id">
        <template #default="{ item, index }">
          <DynamicScrollerItem :item="item" :active="active" :size-dependencies="[item.message]" :data-index="index">
            <div :class="'flex justify-between item ' + stripedClass(index)" @dblclick="handleDoubleClick(item.id)">
              <div flex overflow-hidden flex-1 items-center pr-2>
                <div v-if="menuRun.get(item.id) === 'playing'">
                  <n-icon
                    mr-4
                    flex
                    justify-center
                    items-center
                    size="20"
                    color="#18a058"
                    :component="menuRun.get(item.id) === 'playing' ? MusicalNotesOutline : undefined"
                  />
                </div>
                <n-avatar size="small" :src="item.al.picUrl" mr-6 b-rd-5 />
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
                {{ formateSongsAuthor(item.ar) }}
              </p>
              <div pl-2 flex items-center><n-time class="opacity-40" format="mm:ss" :time="item.dt" /></div>
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
import { Howler } from 'howler'
import { createDiscreteApi } from 'naive-ui'
const { message } = createDiscreteApi(['message'])

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
    menuList: musicMenuListCombinationType
  }>(),
  {
    active: false,
    menuRun: () => {
      return new Map<string, musicMenuRunType>()
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
const menus = computed(() => props.menuList)
watch(
  () => props.active,
  (newVal, oldVal) => {
    if (newVal === true) {
      // 处理tag栏目的那个全屏功能，需要结合查看layouts文件夹下面的tags文件
      to.value = isFullscreen.value === true && fullStore.getPage === 'inner' ? '#app-main' : undefined
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
  musicStore.destroy()
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

.item {
  padding: 0 20px;
  cursor: pointer;
}

:deep(.n-drawer-body-content-wrapper) {
  padding: 0 !important;
  padding-bottom: 15px;
}
</style>
