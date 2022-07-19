<template>
  <StarportCarrier>
    <RouterView />
  </StarportCarrier>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@utils/devicePixelRatio'
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
