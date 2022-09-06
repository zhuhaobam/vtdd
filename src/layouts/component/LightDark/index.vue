<template>
  <div>
    <n-tooltip placement="bottom">
      <template #trigger>
        <div flex items-center>
          <n-button quaternary circle @click="handleChange(!themebool)">
            <template #icon>
              <div v-if="themebool" i="carbon-sun" />
              <div v-else i="carbon-moon" />
            </template>
          </n-button>
        </div>
      </template>
      <span>{{ $t(themebool ? 'project.light' : 'project.dark') }}</span>
    </n-tooltip>
  </div>
</template>

<script lang="ts" setup name="lightDark">
import { useDark, useToggle } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { useNewSettingStore } from '@store/new-setting'
const newSettingStore = useNewSettingStore()
const isDark = useDark()
const toggleDark = useToggle(isDark)
const themebool = ref<boolean>(unref(newSettingStore.headerSetting.mTheme) === null)
function handleChange(value: boolean) {
  if ((value === false && isDark.value === false) || (value === true && isDark.value === true)) {
    toggleDark()
  }
  themebool.value = value
  newSettingStore.settingMTheme(value ? null : darkTheme)
}
</script>
