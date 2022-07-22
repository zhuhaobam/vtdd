<template>
  <n-dropdown @select="handleSelect">
    <div class="avatar">
      <img :src="getAssetsFile('cafe.png')" />
      <n-gradient-text type="danger"> 名字 </n-gradient-text>
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
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
