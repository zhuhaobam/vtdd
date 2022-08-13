<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="container">
    <div class="number">{{ battery.level }}%</div>
    <div class="contrast">
      <div class="circle"></div>
    </div>
    <div class="charging">
      <div>{{ batteryStatus }}</div>
      <div v-show="Number.isFinite(battery.dischargingTime) && battery.dischargingTime != 0">
        剩余可使用时间：{{ calcDischargingTime }}
      </div>
      <span v-show="Number.isFinite(battery.chargingTime) && battery.chargingTime != 0">
        距离电池充满需要：{{ calcChargingTime }}
      </span>
    </div>
    <slider mt-50 />
  </div>
</template>

<script setup lang="ts" name="Recharge">
interface Battery {
  charging: boolean // 当前电池是否正在充电
  chargingTime: number // 距离充电完毕还需多少秒，如果为0则充电完毕
  dischargingTime: number // 代表距离电池耗电至空且挂起需要多少秒
  level: number // 代表电量的放大等级，这个值在 0.0 至 1.0 之间
  [key: string]: any
}
type Props = {
  battery: Battery
  calcDischargingTime: string
  calcChargingTime: string
  batteryStatus: string
}
const props = withDefaults(defineProps<Props>(), {
  battery: () => {
    return {
      charging: false,
      chargingTime: 0,
      dischargingTime: 0,
      level: 100
    }
  },
  calcDischargingTime: '',
  calcChargingTime: '',
  batteryStatus: ''
})
const { battery, calcDischargingTime, calcChargingTime, batteryStatus } = toRefs(props)
</script>

<style lang="scss" scoped>
.container {
  position: absolute;

  .number {
    position: absolute;
    z-index: 10;
    top: 20%;
    width: 300px;
    color: #fff;
    font-size: 32px;
    text-align: center;
  }

  .contrast {
    overflow: hidden;
    animation: hueRotate 10s infinite linear;
    background-color: #000;
    filter: contrast(15) hue-rotate(0);

    .circle {
      position: relative;
      width: 300px;
      height: 300px;
      box-sizing: border-box;
      filter: blur(8px);

      &::after {
        position: absolute;
        top: 40%;
        left: 50%;
        width: 200px;
        height: 200px;
        animation: rotate 10s infinite linear;
        background-color: #00ff6f;
        border-radius: 42% 38% 62% 49% / 45%;
        content: '';
        transform: translate(-50%, -50%) rotate(0);
      }

      &::before {
        position: absolute;
        z-index: 10;
        top: 40%;
        left: 50%;
        width: 176px;
        height: 176px;
        background-color: #000;
        border-radius: 50%;
        content: '';
        transform: translate(-50%, -50%);
      }
    }
  }

  .charging {
    font-size: 20px;
    text-align: center;
  }
}

@keyframes rotate {
  50% {
    border-radius: 45% / 42% 38% 58% 49%;
  }

  100% {
    transform: translate(-50%, -50%) rotate(720deg);
  }
}

@keyframes moveToTop {
  90% {
    opacity: 1;
  }

  100% {
    opacity: 0.1;
    transform: translate(-50%, -180px);
  }
}

@keyframes hueRotate {
  100% {
    filter: contrast(15) hue-rotate(360deg);
  }
}
</style>
