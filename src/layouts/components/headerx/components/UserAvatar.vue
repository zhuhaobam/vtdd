<template>
  <n-dropdown @select="handleSelect">
    <div class="avatar">
      <img :src="getAssetsFile('cafe.png')" />
      <n-gradient-text w-15 type="danger"> {{ $t('name') }} </n-gradient-text>
    </div>
  </n-dropdown>
</template>

<script lang="ts" setup>
import getAssetsFile from '@utils/assets-kit'

function handleSelect(key: string) {
  if (key === 'logout') {
    // userStore.logout()
    //     '已退出登录'
  }
}
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 100%;
    width: 35px;
    height: 35px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
</style>
