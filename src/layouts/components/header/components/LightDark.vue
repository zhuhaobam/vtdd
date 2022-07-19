<template>
  <div>
    <n-switch v-model:value="themebool" :rail-style="railStyle" @update:value="handleChange">
      <template #checked> 浅色 </template>
      <template #unchecked> 深色 </template>
      <template #checked-icon>
        <svg-icon name="sun" color="red" />
      </template>
      <template #unchecked-icon>
        <svg-icon name="moon" color="red" />
      </template>
    </n-switch>
  </div>
</template>

<script lang="ts" setup>
import { CSSProperties } from 'vue'
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@store/theme'
const themeStore = useThemeStore()
const themebool = ref<boolean>(themeStore.getTheme === null)

function handleChange(value: boolean) {
  themeStore.setTheme(value ? null : darkTheme)
}

const railStyle = ({ focused, checked }: { focused: boolean; checked: boolean }) => {
  const style: CSSProperties = {}
  if (checked) {
    style.background = 'gold'
    if (focused) {
      style.boxShadow = '0 0 0 2px gold'
    }
  } else {
    style.background = '#073763'
    if (focused) {
      style.boxShadow = '0 0 0 2px #073763'
    }
  }
  return style
}
</script>
