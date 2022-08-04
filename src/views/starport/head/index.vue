<template>
  <div>
    <div>
      <Starport port="donghua" style="width: 160px; height: 160px" pl-20>
        <starport-componet :index="starportIndex" style="width: 160px; height: 160px" />
      </Starport>
    </div>
    <div overflow-hidden w-full h-full transition-all duration-900 relative select-none>
      <h1>{{ t('ci2') }}</h1>
      <div>北国风光，千里冰封，万里雪飘。</div>
      <div>望长城内外，惟余莽莽；大河上下，顿失滔滔。山舞银蛇，原驰蜡象，欲与天公试比高。</div>
      <div>
        须晴日，看红装素裹，分外妖娆。
        江山如此多娇，引无数英雄竞折腰。惜秦皇汉武，略输文采；唐宗宋祖，稍逊风骚。一代天骄，成吉思汗，只识弯弓射大雕。俱往矣，数风流人物，还看今朝。
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="starportHead">
const starportIndex = ref(1)
const { t } = useI18n()
</script>
<route lang="yaml">
label: head
meta:
  breadcrumb: analysis
  icon: sun
  keepAlive: true
  sort: 5
  alwaysShow: false
</route>
