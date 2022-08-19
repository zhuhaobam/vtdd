<template>
  <n-scrollbar x-scrollable>
    <div pt-5 pb7 pl-5 flex flex-nowrap>
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
        <template #icon>
          <n-icon :component="renderMenuIcon(tag.meta.icon as string)" />
        </template>
      </n-tag>
      <n-icon size="18" mx-3 my-4 cursor-pointer hover:color-primary @click="toggleTrigger()">
        <i-ant-design-fullscreen-outlined />
      </n-icon>
    </div>
  </n-scrollbar>
</template>
<script lang="ts" setup>
import router from '@/router'
import { renderAssetsIcon } from '@/utils/render'
import { useTagsStore } from '@store/tags'
const emit = defineEmits<{
  (e: 'fullScreenDo'): void
}>()

const toggleTrigger = () => {
  emit('fullScreenDo')
}
const tagsStore = useTagsStore()
const handleTagClick = (path: any) => {
  tagsStore.setActiveTag(path)
  router.push(path)
}
function renderMenuIcon(icon: string) {
  return h(renderAssetsIcon(icon))
}
// 右击菜单
async function handleContextMenu(e: any, tag: any) {}
</script>
