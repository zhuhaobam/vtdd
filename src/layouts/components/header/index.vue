<template>
  <div flex items-center justify-between pl-8 pr-8 h-16>
    <n-space>
      <div flex items-center h-16>
        <UserLogo />
      </div>
      <div flex items-center h-16>
        <MenuCollapse />
      </div>
    </n-space>
    <n-space>
      <div flex items-center h-16>
        <FullScreen />
      </div>
      <div flex items-center h-16>
        <LightDark />
      </div>
      <div flex items-center h-16>
        <UserAvatar />
      </div>
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import MenuCollapse from './components/MenuCollapse.vue'
import LightDark from './components/LightDark.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import LoGo from './components/LoGo.vue'
import UserLogo from './components/UserLogo.vue'
</script>

<style lang="scss" scoped></style>
