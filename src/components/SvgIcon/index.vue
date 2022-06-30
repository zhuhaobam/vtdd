<template>
  <svg :class="svgClass" :style="{ width: size + 'px', height: size + 'px', 'vertical-align': va }" aria-hidden="true">
    <use :xlink:href="symbolId" :fill="color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  className: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: '#333'
  },
  size: {
    type: Number,
    default: 16
  },
  va: {
    type: String,
    default: 'bottom'
  }
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
const svgClass = computed(() => {
  if (props.className !== '') {
    return `svg-icon ${props.className}`
  }
  return `svg-icon`
})
</script>
<style lang="scss" scoped>
.svg-icon {
  overflow: hidden;
  fill: currentcolor;
}
</style>
