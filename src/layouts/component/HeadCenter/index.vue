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
    <div flex items-center>
      <n-avatar round :src="getAssetsFile('cafe.png')"></n-avatar>
      <n-ellipsis style="width: 50px">
        {{ $t('project.default') }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup name="HeadCenter">
import { useRouter } from 'vue-router'
import { init } from '@store/index'
import { getAssetsFile } from '@/plugins/assets-kit'
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
      init()
      router.push({ name: 'login' })
      break
    default:
  }
}
</script>
