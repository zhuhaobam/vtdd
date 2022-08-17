<template>
  <div>
    <n-tooltip placement="bottom">
      <template #trigger>
        <n-switch v-model:value="themebool" :rail-style="railStyle" @update:value="handleChange">
          <template #checked> {{ $t('project.light') }} </template>
          <template #unchecked> {{ $t('project.dark') }} </template>
          <template #checked-icon>
            <div i="carbon-sun" />
          </template>
          <template #unchecked-icon>
            <div i="carbon-moon" />
          </template>
        </n-switch>
      </template>
      <span>{{ $t(themebool ? 'project.light' : 'project.dark') }}</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup name="lightDark">
import { useDark, useToggle } from '@vueuse/core'
import { CSSProperties } from 'vue'
import { darkTheme } from 'naive-ui'
import { useThemeStore } from '@store/theme'
const themeStore = useThemeStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const themebool = ref<boolean>(themeStore.getTheme === null)
function handleChange(value: boolean) {
  if ((value === false && isDark.value === false) || (value === true && isDark.value === true)) {
    toggleDark()
  }
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
