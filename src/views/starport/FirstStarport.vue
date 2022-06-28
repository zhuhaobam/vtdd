<template>
  <div>
    <div v-for="(image, index) in images" :key="image">
      <Starport :port="'my-id' + index" style="height: 160px; width: 120px">
        <my-component :index="index" />
      </Starport>
    </div>
  </div>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStarportStore } from '@/store'

const starport = useStarportStore()
const { images } = storeToRefs(starport)
</script>
