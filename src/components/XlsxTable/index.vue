<template>
  <div class="overflow-auto">
    <table cellspacing="0">
      <thead>
        <tr>
          <th v-for="item in props.headers" :key="item" fw6 bg-gray>
            {{ item }}
          </th>
        </tr>
      </thead>
      <tbody style="border: 3px solid red">
        <tr
          v-for="(row, idx) in props.rows"
          :key="idx"
          text-center
          :data-qa-name="props.dataQaName ? props.dataQaName + '-' + idx : undefined"
        >
          <slot name="items" :ty="'color-lightBlue border-lightBlue border-1 px-5'" :row="row" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup lang="ts" name="xlsxTable">
interface Cell {
  dataQaName: string
  content: string
}

interface Seller {
  name: Cell
  taxIdNumber: Cell
  address: Cell
  accountNo: Cell
}
const props = withDefaults(
  defineProps<{
    headers?: string[]
    rows?: Seller[]
    dataQaName?: String
  }>(),
  {
    headers: () => {
      return []
    },
    rows: () => {
      return []
    },
    dataQaName: () => {
      return ''
    }
  }
)
</script>
