<template>
  <div>
    <div v-for="(image, index) in images" :key="image" ml-30>
      <Starport :port="'my-id' + index" style="height: 120px; width: 120px">
        <my-component :index="index" />
      </Starport>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useStarportStore } from '@/store'

const starport = useStarportStore()
const images = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F0F420110430%2F200F4110430-6-1200.jpg&amp;refer=http%3A%2F%2Fimg.jj20.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1658570176&amp;t=b0baf8fc004c0ba24a0d2fac73afcb5d',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1114%2F0G020114924%2F200G0114924-15-1200.jpg&amp;refer=http%3A%2F%2Fimg.jj20.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1658570176&amp;t=28e54077bf06a9f5d8916d53c7910026',
]
starport.setImages(images)
</script>
