<template>
  <div bg-white p5>
    <n-tag
      v-for="tag in tagsStore.tags"
      :key="tag.path"
      class="px-15 mx-5 cursor-pointer hover:color-primary"
      :type="tagsStore.activeTag === tag.path ? 'primary' : 'default'"
      :closable="tagsStore.tags.length > 1"
      @click="handleTagClick(tag.path)"
      @close.stop="tagsStore.removeTag(tag.path)"
      @contextmenu.prevent="handleContextMenu($event, tag)"
    >
      {{ $t(tag.meta.breadcrumb as string) }}
    </n-tag>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
import { useTagsStore } from '@store/tags'
const tagsStore = useTagsStore()
const handleTagClick = (path: any) => {
  tagsStore.setActiveTag(path)
  router.push(path)
}
// 右击菜单
async function handleContextMenu(e: any, tag: any) {}
</script>
