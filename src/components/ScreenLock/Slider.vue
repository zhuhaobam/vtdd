<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div ref="slider" class="screen-slider">
    <div class="screen-locker-placeholder">{{ $t('project.sliding-unlocking') }}</div>
    <div ref="sliderButton" class="screen-slider-button" @mousedown="onMousedown">
      <n-icon v-if="isTrigger" size="25">
        <i-ant-design:unlock-filled />
      </n-icon>
      <n-icon v-else size="25">
        <i-ant-design:arrow-right-outlined />
      </n-icon>
    </div>
  </div>
</template>

<script setup lang="ts" name="Slider">
import { useNewSettingStore } from '@store/new-setting'
const newSettingStore = useNewSettingStore()
const emitLockOpen = (value: boolean) => {
  newSettingStore.settingMLock(value)
}

const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false
  }
})

const slider = ref<HTMLElement>()
const sliderButton = ref<HTMLElement>()
let startX = 0
let distance = 0
let maxDistance = 0
let minDistance = 0
const isTrigger = ref(false)
watch(
  () => props.open,
  () => {
    if (props.open) {
      isTrigger.value = false
    }
  }
)

function onMousedown(e: MouseEvent) {
  const sliderDom = slider.value as HTMLElement
  const sliderButtonDom = sliderButton.value as HTMLElement
  distance = 0
  maxDistance = 0
  minDistance = 0
  isTrigger.value = false
  sliderButtonDom.style.transition = ''
  startX = e.screenX
  maxDistance = sliderDom.clientWidth - sliderButtonDom.clientWidth - 10
  document.addEventListener('mousemove', onMousemove)
  document.addEventListener('mouseup', onMouseup)
}
function onMousemove(e: MouseEvent) {
  distance = e.screenX - startX
  if (isTrigger.value) {
    distance = maxDistance
  }
  if (distance <= minDistance) {
    distance = minDistance
  }
  if (distance >= maxDistance) {
    distance = maxDistance
    if (!isTrigger.value) {
      isTrigger.value = true
      setTimeout(() => {
        emitLockOpen(false)
      }, 500)
    }
  }
  if (!props.open) {
    const sliderButtonDom = sliderButton.value as HTMLElement
    sliderButtonDom.style.transform = `translateX(${distance}px)`
  }
}
function onMouseup(e: MouseEvent) {
  if (!isTrigger.value) {
    // 恢复原始状态
    distance = 0
    maxDistance = 0
    minDistance = 0
    isTrigger.value = false
    if (!props.open) {
      const sliderButtonDom = sliderButton.value as HTMLElement
      sliderButtonDom.style.transition = 'all 0.4s'
      sliderButtonDom.style.transform = `translateX(${distance}px)`
    }
  }
  document.removeEventListener('mousemove', onMousemove)
  document.removeEventListener('mouseup', onMouseup)
}
</script>

<style lang="scss" scoped>
.screen-slider {
  position: relative;
  width: 300px;
  height: 50px;
  animation: sun 7s infinite;
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgb(255 255 255 / 40%), rgb(72 168 237 / 25%));

  /* 背景渐变色大小 */
  background-size: 200%;

  /* background: rgb(72 168 237 / 25%); */
  border-radius: 100px;
  box-shadow: 0 0 20px 2px rgb(0 0 0 / 15%);
}

.screen-slider::before {
  position: absolute;

  /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
  z-index: -1;
  top: -6px;
  right: -6px;
  bottom: -6px;
  left: -6px;
  animation: sun 7s infinite;

  /* 背景渐变色 */
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgb(255 255 255 / 40%), rgb(72 168 237 / 25%));

  /* 背景渐变色大小 */
  background-size: 200%;
  border-radius: 60px;
  content: '';

  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  opacity: 0.5;
}

.screen-slider-button {
  display: flex;
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  margin: 5px;
  backdrop-filter: blur(10px);
  border-radius: 50%;
  box-shadow: 0 0 5px 2px rgb(0 0 0 / 15%);
}

.screen-locker-placeholder {
  position: absolute;
  top: 50%;
  left: 50%;
  opacity: 0.5;
  pointer-events: none;
  transform: translate3d(-50%, -50%, 0);
  user-select: none;
}

@keyframes sun {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}
</style>
