<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <div>
      <Starport port="donghua" style="width: 120px; height: 120px">
        <starport-componet :index="starportIndex" style="width: 120px; height: 120px" />
      </Starport>
    </div>
    <div overflow-hidden w-full h-full transition-all duration-900 relative select-none>
      <h1>{{ $t('ci1') }}</h1>
      <div>{{ $t('ci11') }}</div>
      <div>{{ $t('ci12') }}</div>
      <div>{{ $t('ci13') }}</div>
      <div>{{ $t('login.poetry') }}</div>
      <div>{{ $t('ci15') }}</div>
      <div>{{ $t('ci16') }}</div>
      <div>{{ $t('ci17') }}</div>
      <div>{{ $t('ci18') }}</div>
      <div>{{ $t('ci19') }}</div>
      <div>{{ $t('ci110') }}</div>
    </div>
  </div>
</template>
<script setup lang="ts" name="starport-twopage">
const starportIndex = ref(1)
</script>
<route lang="yaml">
meta:
  breadcrumb: page.starport.twopage
  icon: i-carbon:condition-point
  sort: 60
</route>
