<template>
  <div v-if="sssss">
    <XlsxTable :headers="sssss.headers" :rows="sssss.rows">
      <template #items="{ row, ty }">
        <td :data-qa-name="row.name.dataQaName" :class="ty">
          {{ row.name.content }}
        </td>
        <td :data-qa-name="row.taxIdNumber.dataQaName" :class="ty">
          {{ row.taxIdNumber.content }}
        </td>
        <td :data-qa-name="row.address.dataQaName" :class="ty">
          {{ row.address.content }}
        </td>
        <td :data-qa-name="row.accountNo.dataQaName" :class="ty">
          {{ row.accountNo.content }}
        </td>
      </template>
    </XlsxTable>
  </div>
</template>
<script setup lang="ts" name="xlsx">
import { Workbook } from 'exceljs'
import { Importer } from 'xlsx-import/lib/Importer'
const getInvoiceConfig = () => ({
  seller: {
    worksheet: 'Invoice',
    type: 'object',
    fields: [
      { row: 1, col: 1, key: 'name' },
      { row: 2, col: 1, key: 'taxIdNumber' },
      { row: 3, col: 1, key: 'address' },
      { row: 4, col: 1, key: 'accountNo' }
    ]
  }
})

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
interface SellerSingle {
  name: string
  taxIdNumber: string
  address: string
  accountNo: string
}

interface Sssss {
  headers: string[]
  rows: Seller[]
}
const good = async () => {
  const invoiceFile = await fetch('./src/assets/invoice.xlsx').then(r => r.blob())
  const reader = new FileReader()
  reader.readAsArrayBuffer(invoiceFile)
  reader.addEventListener('loadend', async () => {
    const wb = new Workbook()
    await wb.xlsx.load(reader.result as ArrayBuffer)
    await nextTick()
    const importer = new Importer(wb)
    const seller = importer.getAllItems<SellerSingle>(getInvoiceConfig().seller)[0]
    sssss.value = {
      headers: ['Name', 'Tax ID', 'Address', 'Account Number'],
      rows: [
        {
          name: {
            dataQaName: 'seller-name',
            content: seller.name
          },
          taxIdNumber: {
            dataQaName: 'seller-tax-id',
            content: seller.taxIdNumber
          },
          address: {
            dataQaName: 'seller-address',
            content: seller.address
          },
          accountNo: {
            dataQaName: 'seller-account',
            content: seller.accountNo
          }
        }
      ]
    }
  })
}
good()
const sssss = ref<Sssss>()
</script>
<route lang="yaml">
meta:
  breadcrumb: page.xlsx
  icon: i-ant-design:file-excel-filled
  sort: -2
  padding: 40px
</route>
