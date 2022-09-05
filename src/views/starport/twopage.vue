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
  padding: 40px
</route>
