<template>
  <div flex items-center justify-between h16>
    <n-space flex items-center>
      <UserLogo />
      <MenuCollapse />
    </n-space>
    <n-space flex items-center>
      <RouterLink flex items-center to="/" :title="t('button.home')">
        <n-icon size="20" color="#333">
          <div i-carbon-campsite />
        </n-icon>
      </RouterLink>
      <RouterLink flex items-center to="/startport/head" :title="t('button.home')">
        <n-icon size="20" color="#333">
          <div i-carbon-campsite />
        </n-icon>
      </RouterLink>
      <RouterLink flex items-center to="/startport/headinfo" :title="t('button.about')">
        <n-icon size="20" color="#333">
          <div i-carbon-dicom-overlay />
        </n-icon>
      </RouterLink>
      <n-icon
        flex
        items-center
        size="24"
        color="#333"
        :depth="2"
        style="cursor: pointer"
        :title="t('button.toggle_dark')"
        @click="toggleDark()"
      >
        <div i="carbon-sun dark:carbon-moon" />
      </n-icon>
      <n-icon
        flex
        items-center
        size="24"
        color="#333"
        :depth="2"
        style="cursor: pointer"
        :title="t('button.toggle_langs')"
        @click="toggleLocales()"
      >
        <div i-carbon-language />
      </n-icon>
      <FullScreen />
      <LightDark />
      <UserAvatar />
    </n-space>
  </div>
</template>

<script lang="ts" setup>
import MenuCollapse from './components/MenuCollapse.vue'
import LightDark from './components/LightDark.vue'
import FullScreen from './components/FullScreen.vue'
import UserAvatar from './components/UserAvatar.vue'
import UserLogo from './components/UserLogo.vue'
const { t, availableLocales, locale } = useI18n()

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
}
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style lang="scss" scoped></style>
