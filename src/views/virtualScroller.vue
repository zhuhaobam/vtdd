<template>
  <div>
    <div>虚拟滚动条</div>
    <n-button @click="active = !active"> 打开 </n-button>
    <div>
      <LyricByMusic />
    </div>
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
import songs from '@/utils/songs.json'
import { ColorWand, ColorPaletteSharp } from '@vicons/ionicons5'
import { useThemeStore } from '@store/theme'
const themeStore = useThemeStore()
const active = ref(false)
type playListType = {
  playListCount: number
  currentPlayIndex: number
  playing: boolean
  playList: any[]
}
const play = reactive<playListType>({
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
