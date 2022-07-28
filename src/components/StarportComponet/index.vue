<template>
  <div overflow-hidden w-full h-full transition-all duration-900 relative select-none>
    <img object-cover block w-full h-full bg-gray-400:20 :src="src" />
    <div
      class="starport-componet"
      absolute
      pt-5
      left-0
      right-0
      bottom-0
      bg-gradient-to-t
      from-black:40
      to-transparent
      text-white
      font-mono
      flex
      items-center
      justify-center
    >
      {{ counter }}{{ t('starport') }}
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
interface Props {
  index: number
}
const props = withDefaults(defineProps<Props>(), {
  index: 0
})
const { index } = toRefs(props)
const images: any[] = [
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F0F420110430%2F200F4110430-6-1200.jpg&amp;refer=http%3A%2F%2Fimg.jj20.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1658570176&amp;t=b0baf8fc004c0ba24a0d2fac73afcb5d',
  'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F0F420110430%2F200F4110430-6-1200.jpg&amp;refer=http%3A%2F%2Fimg.jj20.com&amp;app=2002&amp;size=f9999,10000&amp;q=a80&amp;n=0&amp;g=0n&amp;fmt=auto?sec=1658570176&amp;t=b0baf8fc004c0ba24a0d2fac73afcb5d'
]
const src = ref(images[index.value])
const counter = ref(Math.round(Math.random() * 100))
</script>
