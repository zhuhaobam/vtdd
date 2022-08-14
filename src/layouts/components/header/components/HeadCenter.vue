<template>
  <n-dropdown
    trigger="hover"
    :options="[
      {
        label: $t('page.user'),
        key: 1
      },
      {
        label: $t('page.setting'),
        key: 2
      },
      {
        label: $t('page.logout'),
        key: 3
      }
    ]"
    @select="avatarSelect"
  >
    <div class="avatar">
      <n-avatar round :src="getAssetsFile('cafe.png')"> Z </n-avatar>
      <n-ellipsis style="width: 50px">
        {{ $t('project.default') }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup name="HeadCenter">
import { useRouter } from 'vue-router'
import { useUserStore } from '@store/user'
import { useTagsStore } from '@store/tags'
import getAssetsFile from '@/plugins/assets-kit'
const userStore = useUserStore()
const tagsStore = useTagsStore()
const router = useRouter()
//头像下拉菜单
const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      router.push({ name: 'system-user' })
      break
    case 2:
      router.push({ name: 'system-setting' })
      break
    case 3:
      userStore.setToken('')
      tagsStore.clear()
      router.push({ name: 'login' })
      break
    default:
      console.log('头像下拉菜单没有匹配')
  }
}
</script>
<style lang="scss" scoped>
.avatar {
  display: flex;
  height: 64px;
  align-items: center;
}
</style>
