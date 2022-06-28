<template>
  <div>
    <div h8>
      <nav flex items-center justify-between>
        <div>
          <router-link to="/">
            {{ $t('home') }}
          </router-link>
          |
          <router-link to="/about">
            {{ $t('about') }}
          </router-link>
          |
          <router-link to="/first">
            {{ $t('starport1') }}
          </router-link>
          |
          <router-link to="/second">
            {{ $t('starport2') }}
          </router-link>
        </div>
        <div flex justify-between>
          <UseColorMode>
            <div @click="next()">
              <div flex items-center pl-1 pr-1>
                <el-icon :size="20">
                  <i
                    :class="{
                      'i-carbon-sun': mode === 'light',
                      'i-carbon-moon': mode === 'moon',
                      'i-carbon-cafe': mode === 'cafe',
                    }"
                  />
                </el-icon>
              </div>
            </div>
          </UseColorMode>
          <div w18 @click="toggleLocales">
            {{ $t('toggle-language') }}
          </div>
        </div>
      </nav>
    </div>
    <StarportCarrier>
      <RouterView />
    </StarportCarrier>
  </div>
</template>

<script setup lang="ts">
import DevicePixelRatio from '@plugins/devicePixelRatio'
onMounted(() => {
  // 校正windows页面在系统进行缩放后导致页面被放大的问题，通常放大比例是125%、150%
  DevicePixelRatio.init()
})

// 国际化切换
const { availableLocales, locale } = useI18n()
const setLang = (lang: string) => {
  const storage = useLocalStorage('site_locale', '')
  storage.value = lang
}
const toggleLocales = () => {
  const locales = availableLocales
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length]
  setLang(locale.value)
}

// 变色
const mode = useColorMode({
  modes: {
    light: 'light',
    moon: 'moon',
    cafe: 'cafe',
  },
})
const { next } = useCycleList(['light', 'moon', 'cafe'], {
  initialValue: mode,
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html {
  color: rgba(0, 0, 0, 0.8);
  border-color: #ede7da;
  background: #0f1112 url(@assets/sun.png) repeat fixed;
}

html a {
  color: green;
}

html.moon {
  color: #ebf4f1;
  border-color: #0f1112;
  background: #0f1112 url(@assets/moon.png) repeat fixed;
}

html.moon a {
  color: #e0ce9e;
}

html.cafe {
  color: #433422;
  border-color: #e0ce9e;
  background: #e0ce9e url(@assets/cafe.png) repeat fixed;
}
</style>
