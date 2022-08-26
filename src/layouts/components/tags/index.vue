<template>
  <n-scrollbar x-scrollable>
    <div pt-5 pb7 pl-5 flex flex-nowrap>
      <n-tooltip placement="bottom">
        <template #trigger>
          <n-icon size="18" mx-3 my-4 cursor-pointer hover:color-primary @click="toggleTrigger()">
            <i-ant-design-fullscreen-outlined />
          </n-icon>
        </template>
        <span>{{ $t('tag.full.screen') }}</span>
      </n-tooltip>
      <n-tag
        v-for="tag in tagsStore.tags"
        :key="tag.path"
        mx-3
        cursor-pointer
        hover:color-primary
        :type="tagsStore.activeTag === tag.path ? 'primary' : 'default'"
        :closable="tagsStore.tags.length > 1"
        @click="handleTagClick(tag.path)"
        @close.stop="tagsStore.removeTag(tag.path)"
        @contextmenu.prevent="handleContextMenu($event, tag)"
      >
        {{ $t(tag.meta.breadcrumb as string) }}
        <span v-if="tag.params">{{ tag.params.id ?? '' }}</span>
        <template #icon>
          <n-icon :component="renderMenuIcon(tag.meta.icon as string)" />
        </template>
      </n-tag>
    </div>
  </n-scrollbar>
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
import { renderAssetsIcon } from '@/utils/hFunctionRender'
import router from '@/router'
import { useTagsStore } from '@store/tags'
import { useAppStore } from '@store/app'
import { RouteLocationMatched } from 'vue-router'
import { NIcon } from 'naive-ui'
import { Refresh, ArrowBackOutline, Close, Expand, ArrowUp } from '@vicons/ionicons5'
import { Component } from 'vue'
const { t } = useI18n()
const emit = defineEmits<{
  (e: 'fullScreenDo'): void
}>()

const toggleTrigger = () => {
  emit('fullScreenDo')
}
const tagsStore = useTagsStore()
const appStore = useAppStore()
const handleTagClick = (path: any) => {
  tagsStore.setActiveTag(path)
  router.push(path)
}
function renderMenuIcon(icon: string) {
  return h(renderAssetsIcon(icon))
}
// 右击菜单
const optionsRef = ref<any[]>([])
const showDropdownRef = ref(false)
const xRef = ref(0)
const yRef = ref(0)
const tagRm = ref<RouteLocationMatched>()
const onClickoutside = () => {
  showDropdownRef.value = false
}
const handleSelect = (key: string | number) => {
  showDropdownRef.value = false
  const tagCurrent: RouteLocationMatched | undefined = tagRm.value
  if (tagCurrent) {
    if (String(key) === 'tag.close.other') {
      tagsStore.removeOtherTag(tagCurrent.path)
    }
    if (String(key) === 'tag.close.me') {
      tagsStore.removeTag(tagCurrent.path)
    }
    if (String(key) === 'tag.fresh') {
      appStore.setReload()
    }
    if (String(key) === 'tag.open') {
      tagsStore.setActiveTag(tagCurrent.path)
      router.push(tagCurrent.path)
    }
    if (String(key) === 'tag.full.screen') {
      toggleTrigger()
    }
  }
}

const renderIcon = (icon: Component) => {
  return () => {
    return h(NIcon, null, {
      default: () => h(icon)
    })
  }
}

const handleContextMenu = async (e: MouseEvent, tag: RouteLocationMatched) => {
  e.preventDefault()
  showDropdownRef.value = false
  nextTick().then(() => {
    showDropdownRef.value = true
    xRef.value = e.clientX
    yRef.value = e.clientY
  })
  tagRm.value = tag
  optionsRef.value = [
    {
      label: t('tag.open'),
      key: 'tag.open',
      disabled: tagsStore.activeTag === tag.path,
      icon: renderIcon(ArrowUp)
    },
    {
      label: t('tag.fresh'),
      key: 'tag.fresh',
      disabled: tagsStore.activeTag !== tag.path,
      icon: renderIcon(Refresh)
    },
    {
      label: t('tag.close.other'),
      key: 'tag.close.other',
      disabled: tagsStore.activeTag !== tag.path || !tagsStore.leastTwo,
      icon: renderIcon(ArrowBackOutline)
    },
    {
      label: t('tag.close.me'),
      key: 'tag.close.me',
      disabled: tagsStore.activeTag !== tag.path || !tagsStore.leastTwo,
      icon: renderIcon(Close)
    },
    {
      label: t('tag.full.screen'),
      key: 'tag.full.screen',
      disabled: tagsStore.activeTag !== tag.path,
      icon: renderIcon(Expand)
    }
  ]
}
</script>
