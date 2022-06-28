<template>
  <div class="home">
    <img alt="Vue logo" src="@assets/logo.png" />
    <p>{{ images }}</p>
    <p>{{ counter }}</p>

    <button @click="clickedFn">UseDebounceFn</button>
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useStarportStore } from '@/store'
import { getArticle } from '@/apis/article'

const starport = useStarportStore()
const { images } = storeToRefs(starport)
onMounted(() => {
  getArticle().then((res: any) => {
    console.log(res)
  })
})

// 防抖
const counter = ref(0)
// 第三个参数为最大等待时间，类似于 lodash debounce
const debouncedFn = useDebounceFn(
  () => {
    counter.value += 1
  },
  1000,
  { maxWait: 5000 }
)

const clickedFn = () => {
  debouncedFn()
}
</script>
