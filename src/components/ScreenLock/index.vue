<template>
  <transition enter-active-class="screen-locker-lock" leave-active-class="screen-locker-unlock">
    <div v-if="props.open" class="screen-locker">
      <!--充电-->
      <recharge
        :battery="battery"
        :battery-status="batteryStatus"
        :calc-discharging-time="calcDischargingTime"
        :calc-charging-time="calcChargingTime"
      />
      <div class="local-time">
        <div class="time">{{ hour }}:{{ minute }}:{{ second }}</div>
        <div class="date">{{ month }}月{{ day }}号，星期{{ week }}</div>
        <div class="mg">{{ message }}</div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { useTime } from '@hooks/useTime'
import { useBattery } from '@hooks/useBattery'
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
  display: flex;
  background: #000;
  color: white;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px 5px #0000000f;
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
  position: absolute;
  bottom: 60px;
  left: 60px;
  font-family: helvetica;
  .time {
    font-size: 70px;
  }
  .date {
    font-size: 40px;
  }
  .mg {
    font-size: 20px;
    color: red;
    font-weight: bold;
  }
}
</style>
