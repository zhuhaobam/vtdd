<template>
  <transition enter-active-class="screen-locker-lock" leave-active-class="screen-locker-unlock">
    <div v-if="props.open" class="screen-locker">
      <div class="screen-avatar">
        <n-avatar round :size="128" :src="getAssetsFile('cafe.png')" />
        <div class="screen-nickname">{{ $t('project.lock-screen') }}</div>
      </div>
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
    </div>
  </transition>
</template>

<script setup lang="ts">
import { NIcon, NAvatar } from 'naive-ui'
import getAssetsFile from '@/plugins/assets-kit'
const emit = defineEmits(['lockOpen'])
const emitLockOpen = (value: boolean) => {
  emit('lockOpen', value)
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
      }, 50)
    }
  }
  if (props.open) {
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
    if (props.open) {
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
.screen-locker {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 9999;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.screen-locker-lock {
  animation: lock-down 1s ease-in-out;
}

.screen-locker-unlock {
  animation: lock-up 1s ease-in-out;
}

@keyframes lock-down {
  0% {
    transform: translate3d(0, -100%, 0);
  }

  60% {
    /*  opacity: 1;*/
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0px, 0, 0);
  }

  90% {
    transform: translate3d(0px, 0, 0);
  }

  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0px, 0);
  }

  90% {
    transform: translate3d(0px, -100%, 0);
  }

  100% {
    transform: none;
    opacity: 0;
  }
}

.screen-avatar {
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.screen-nickname {
  font-size: 30px;
  font-weight: 400;
  margin-top: 10px;
}

.screen-slider {
  width: 300px;
  height: 60px;
  /*background: rgb(72 168 237 / 25%);*/
  border-radius: 100px;
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  /* 背景渐变色大小 */
  background-size: 200%;
  animation: sun 7s infinite;
  position: relative;
  box-shadow: 0 0 20px 2px rgba(0, 0, 0, 0.15);
}

.screen-slider:before {
  content: '';
  position: absolute;
  top: -6px;
  bottom: -6px;
  left: -6px;
  right: -6px;
  border-radius: 60px;
  /* 背景渐变色 */
  background-image: linear-gradient(to right, rgb(72 168 237 / 25%), rgba(255, 255, 255, 0.4), rgb(72 168 237 / 25%));
  /* 背景渐变色大小 */
  background-size: 200%;
  /* 元素的位置 底层或者顶层  -值表示底层 + 值表示顶层 */
  z-index: -1;
  /* 设置模糊度 显示发光效果 */
  filter: blur(10px);
  opacity: 0.5;
  animation: sun 7s infinite;
}

.screen-slider-button {
  width: 50px;
  height: 50px;
  margin: 5px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(10px);
}

.screen-locker-placeholder {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -50%, 0);
  pointer-events: none;
  opacity: 0.5;
  user-select: none;
}

@keyframes sun {
  100% {
    /* 背景位置 */
    background-position: -400% 0;
  }
}
</style>
