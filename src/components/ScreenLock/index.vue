<template>
  <transition enter-active-class="screen-locker-lock" leave-active-class="screen-locker-unlock">
    <div v-if="props.open" class="screen-locker" flex justify-evenly items-center flex-col>
      <div class="local-time" :class="screen !== 'xs' && screen !== 's' ? 'absolute left-20 bottom-20' : ''">
        <div class="time">{{ hour }}:{{ minute }}:{{ second }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
        <div class="mg">{{ message }}</div>
      </div>
      <!--充电-->
      <recharge
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
        :calc-charging-time="calcChargingTime"
      />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useTime } from '@hooks/useTime'
import { useBattery } from '@hooks/useBattery'
import { ComputedRef } from 'vue'
// 屏幕大小
const screen = inject<ComputedRef<'s' | 'xs' | 'm' | 'l' | 'xl' | '2xl'>>('provide-screen')
const { month, day, hour, minute, second, week, message } = useTime()
const { battery, batteryStatus, calcDischargingTime, calcChargingTime } = useBattery()
const props = defineProps({
  open: {
    type: Boolean,
    required: false,
    default: false
  }
})
</script>
<style lang="scss" scoped>
.screen-locker {
  position: fixed;
  z-index: 9999;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  backdrop-filter: blur(10px);
  background: #000;
  box-shadow: 0 0 20px 5px #0000000f;
  color: white;
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
    /*  opacity: 1; */
    transform: translate3d(0, 25px, 0);
  }

  75% {
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, 0, 0);
  }

  100% {
    transform: none;
  }
}

@keyframes lock-up {
  0% {
    transform: translate3d(0, 0, 0);
  }

  90% {
    transform: translate3d(0, -100%, 0);
  }

  100% {
    opacity: 0;
    transform: none;
  }
}

// -------

.local-time {
  .time {
    font-size: 50px;
  }

  .date {
    font-size: 25px;
    text-align: center;
  }

  .mg {
    color: red;
    font-size: 20px;
    font-weight: bold;
  }
}
</style>
