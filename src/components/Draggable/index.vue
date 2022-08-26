<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div ref="el" class="fixed" :style="style">
    <slot />
  </div>
</template>
<script setup lang="ts">
// 使一块元素拖拽
const props = defineProps<{
  storageKey?: string
  initial?: { x: number; y: number }
}>()

const el = ref<HTMLElement | null>(null)
const initial = props.initial ?? { x: 0, y: 0 }
const point = props.storageKey ? useStorage(props.storageKey, initial) : ref(initial)
// useDraggable让一个元素变成可拖拽
const { style } = useDraggable(el, { initialValue: point })
</script>
