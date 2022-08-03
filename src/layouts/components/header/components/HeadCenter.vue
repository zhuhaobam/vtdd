<template>
  <n-dropdown
    trigger="hover"
    :options="[
      {
        label: '个人设置',
        key: 1
      },
      {
        label: '退出登录',
        key: 2
      }
    ]"
    @select="avatarSelect"
  >
    <div class="avatar">
      <n-avatar round :src="getAssetsFile('cafe.png')"> Z </n-avatar>
      <n-ellipsis style="width: 50px">
        {{ $t('name') }}
      </n-ellipsis>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup name="HeadCenter">
import { useRouter } from 'vue-router'
import getAssetsFile from '@/plugins/assets-kit'
const router = useRouter()
//头像下拉菜单
const avatarSelect = (key: number) => {
  switch (key) {
    case 1:
      router.push({ name: 'setting' })
      break
    case 2:
      console.log(2)
      break
    default:
      console.log('default')
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
