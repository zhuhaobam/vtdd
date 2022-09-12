<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <vue-cal
    class="vuecal--green-theme"
    :locale="locale"
    :selected-date="dayjs(new Date()).format('YYYY-MM-DD')"
    :time-from="8 * 60"
    :time-to="20 * 60"
    :time-step="60"
    active-view="week"
    :special-hours="specialHours"
    :disable-days="[
      dayjs(new Date()).subtract(2, 'day').format(),
      dayjs(new Date()).format(),
      dayjs(new Date()).add(2, 'day').format()
    ]"
    events-on-month-view="short"
    :events="events"
    style="width: 100%; height: calc(100vh - 244px)"
  >
  </vue-cal>
</template>
<script setup lang="ts" name="cal">
import dayjs from 'dayjs'
import VueCal from 'vue-cal'
import 'vue-cal/dist/vuecal.css'
import { useNewSettingStore } from '@store/new-setting'
const newSettingStore = useNewSettingStore()
// https://antoniandre.github.io/vue-cal/
const locale = ref()
watch(
  () => newSettingStore.headerSetting.mLocal,
  (newVal, oldVal) => {
    if (newVal === 'zh-CN') {
      locale.value = 'zh-cn'
    } else {
      locale.value = 'en'
    }
  },
  { immediate: true, deep: true }
)

// 特殊时间在周视图和日视图中可见，并允许您单独突出显示一周中每一天的特定时间范围。
// 在组件的数据中，周一到周五的特殊时间。
// 请注意，您可以为同一天提供多个块的数组。
const specialHours = ref({
  1: {
    from: 8 * 60,
    to: 17 * 60,
    class: 'cell-class',
    label: 'CellClass 1Full day shift'
  },
  2: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'cell-class-two',
    label: 'CellClass 2Full day shift'
  },
  3: [
    {
      from: 8 * 60,
      to: 12 * 60,
      class: 'cell-class',
      label: 'CellClass 1Morning shift'
    },
    {
      from: 14 * 60,
      to: 19 * 60,
      class: 'cell-class-three',
      label: 'CellClass 3Afternoon shift'
    }
  ],
  4: {
    from: 8 * 60,
    to: 17 * 60,
    class: 'cell-class',
    label: 'CellClass 1Full day shift'
  },
  5: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'cell-class-three',
    label: 'CellClass 3Full day shift'
  },
  6: {
    from: 9 * 60,
    to: 18 * 60,
    class: 'cell-class-two',
    label: 'CellClass 2Full day shift'
  },
  7: {
    from: 7 * 60,
    to: 20 * 60,
    class: 'closed',
    label: 'Closed'
  }
})
const events = ref([
  {
    start: '2022-09-08 15:00',
    end: '2022-09-08 17:30',
    title: '月视图事件',
    content: '<i class="icon material-icons">block</i><br>I am not draggable, not resizable and not deletable.',
    class: 'blue-event',
    deletable: false,
    resizable: false,
    draggable: false
  }
  // other events.
])
// test
</script>
<style lang="scss">
/* Green-theme. */

.vuecal__menu,
.vuecal__cell-events-count {
  background-color: #42b983;
}

.vuecal__title-bar {
  background-color: #e4f5ef;
}

.vuecal__cell--today,
.vuecal__cell--current {
  background-color: rgb(240 240 255 / 40%);
}

.vuecal:not(.vuecal--day-view) .vuecal__cell--selected {
  background-color: rgb(235 255 245 / 40%);
}

.vuecal__cell--selected::before {
  border-color: rgb(66 185 131 / 50%);
}

/* Cells and buttons get highlighted when an event is dragged over it. */

.vuecal__cell--highlighted:not(.vuecal__cell--has-splits),
.vuecal__cell-split--highlighted {
  background-color: rgb(195 255 225 / 50%);
}

.vuecal__arrow.vuecal__arrow--highlighted,
.vuecal__view-btn.vuecal__view-btn--highlighted {
  background-color: rgb(136 236 191 / 25%);
}

// test

.vuecal__cell--disabled {
  color: #bbb;
  text-decoration: line-through;
}

// test

.vuecal--month-view .vuecal__cell {
  height: 80px;
}

.vuecal--month-view .vuecal__cell-content {
  height: 100%;
  align-items: flex-end;
  justify-content: flex-start;
}

.vuecal--month-view .vuecal__cell-date {
  padding: 4px;
}

.vuecal--month-view .vuecal__no-event {
  display: none;
}

.vuecal__special-hours {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  em {
    color: #999;
    font-size: 0.9em;
  }
}

.cell-class {
  background-color: #f0fff1;
  color: #81d58b;
}

.cell-class-two {
  background-color: #f0f6ff;
  color: #689bee;
}

.cell-class-three {
  background-color: #fcf0ff;
  color: #d168ee;
}

.closed {
  background: #fff7f0
    repeating-linear-gradient(
      -45deg,
      rgb(255 162 87 / 25%),
      rgb(255 162 87 / 25%) 5px,
      rgb(255 255 255 / 0%) 5px,
      rgb(255 255 255 / 0%) 15px
    );
  color: #f6984c;
}
</style>
<route lang="yaml">
meta:
  breadcrumb: page.cal
  icon: i-ant-design:read-filled
  sort: -15
  padding: 40px
</route>
