<template>
  <div :style="screen !== 'xs' && screen !== 's' ? '' : 'margin: 11px 20px'">
    <n-scrollbar style="width: calc(100vw - 40px)" x-scrollable>
      <div flex items-center flex-nowrap>
        <n-tooltip v-if="screen !== 'xs' && screen !== 's'" placement="bottom">
          <template #trigger>
            <n-icon size="18" mx-3 my-4 cursor-pointer hover:color-primary @click="toggleTrigger()">
              <i-ant-design-fullscreen-outlined />
            </n-icon>
          </template>
          <span>{{ $t('tag.full.screen') }}</span>
        </n-tooltip>
        <n-tag
          v-for="tag in tagsStore.getTags"
          :key="tag.path"
          mx-3
          cursor-pointer
          hover:color-primary
          :type="tagsStore.getActiveTag === tag.path ? 'primary' : 'default'"
          :closable="tagsStore.getTags.length > 1"
          @click="handleTagClick(tag.path)"
          @close.stop="tagsStore.removeTag(tag.path)"
          @contextmenu.prevent="handleContextMenu($event, tag)"
        >
          {{ $t(tag.breadcrumb ?? 'tag.default') }}
          <span v-if="tag.params && tag.params.did">({{ tag.params.did ?? '' }})</span>
          <template #icon>
            <n-icon v-if="tag.icon" :component="renderMenuIcon(tag.icon)" />
          </template>
        </n-tag>
      </div>
    </n-scrollbar>
  </div>
  <n-dropdown
    placement="bottom-start"
    trigger="manual"
    :x="xRef"
    :y="yRef"
    :options="optionsRef"
    :show="showDropdownRef"
    :on-clickoutside="onClickoutside"
    @select="handleSelect"
  />
</template>
<script lang="ts" setup>
import { hFunctionIcon } from '@/utils/hFunctionRender'
import router from '@/router'
import { useTagsStore } from '@store/tags'
import { useNewSettingStore } from '@store/new-setting'
import { NIcon } from 'naive-ui'
import { Refresh, ArrowBackOutline, Close, Expand, ArrowUp } from '@vicons/ionicons5'
import { Component, ComputedRef } from 'vue'
import { tagsType } from '@/types/tagsType'
import { RouteLocationMatched } from 'vue-router'
const { t } = useI18n()

type Props = {
  screen: string
}
withDefaults(defineProps<Props>(), {
  screen: 'xl'
})
// 路由处理
const currentRoute = useRoute()
onMounted(() => {
  const mmatched = currentRoute.matched
  const lastMatched: RouteLocationMatched = mmatched[mmatched.length - 1]
  const tag: tagsType = {
    path: lastMatched.path,
    params: currentRoute.params,
    breadcrumb: lastMatched.meta.breadcrumb ?? '',
    icon: lastMatched.meta.icon ?? ''
  }
  tagsStore.addTag(tag)
})

// 屏幕大小
const screen = inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')

const emit = defineEmits<{
  (e: 'full-screen-do'): void
}>()

const toggleTrigger = () => {
  emit('full-screen-do')
}

const tagsStore = useTagsStore()
const newSettingStore = useNewSettingStore()
const handleTagClick = (path: any) => {
  router.push(path)
}

// 右击菜单
const optionsRef = ref<any[]>([])
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const tagRm = ref<tagsType>()
const onClickoutside = () => {
  showDropdownRef.value = false
}
const handleSelect = (key: string | number) => {
  showDropdownRef.value = false
  const tagCurrent: tagsType | undefined = tagRm.value
  if (tagCurrent) {
    if (String(key) === 'tag.close.other') {
      tagsStore.removeOtherTag(tagCurrent.path)
    }
    if (String(key) === 'tag.close.me') {
      tagsStore.removeTag(tagCurrent.path)
    }
    if (String(key) === 'tag.fresh') {
      newSettingStore.settingReload()
    }
    if (String(key) === 'tag.open') {
      router.push(tagCurrent.path)
    }
    if (String(key) === 'tag.full.screen') {
      toggleTrigger()
    }
  }
}

const renderIcon = (icon: Component) => {
  return () =>
    h(NIcon, null, {
      default: () => h(icon)
    })
}

const handleContextMenu = async (e: MouseEvent, tag: tagsType) => {
  e.preventDefault()
  showDropdownRef.value = false
  nextTick().then(() => {
    showDropdownRef.value = true
    xRef.value = e.clientX
    yRef.value = e.clientY
  })
  tagRm.value = tag
  const activeTag = tagsStore.getActiveTag
  const options = [
    {
      label: t('tag.open'),
      key: 'tag.open',
      disabled: activeTag === tag.path,
      icon: renderIcon(ArrowUp)
    },
    {
      label: t('tag.fresh'),
      key: 'tag.fresh',
      disabled: activeTag !== tag.path,
      icon: renderIcon(Refresh)
    },
    {
      label: t('tag.close.other'),
      key: 'tag.close.other',
      disabled: activeTag !== tag.path || !tagsStore.leastTwo,
      icon: renderIcon(ArrowBackOutline)
    },
    {
      label: t('tag.close.me'),
      key: 'tag.close.me',
      disabled: activeTag !== tag.path || !tagsStore.leastTwo,
      icon: renderIcon(Close)
    }
  ]
  if (screen?.value !== 'xs' && screen?.value !== 's') {
    options.push({
      label: t('tag.full.screen'),
      key: 'tag.full.screen',
      disabled: activeTag !== tag.path,
      icon: renderIcon(Expand)
    })
  }
  optionsRef.value = options
}
function renderMenuIcon(icon: string) {
  return h(hFunctionIcon(icon))
}
</script>
