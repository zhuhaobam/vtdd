<template>
  <h1>JSON Forms Vue 3</h1>
</template>

<script lang="ts" setup name="test-ui">
// AJV 无需将数据验证和清理逻辑编写为冗长的代码，您可以使用简洁、
// 易于阅读和跨平台的JSON Schema声明对数据的要求 或
// JSON 类型定义 规范并在数据到达您的应用程序后立即对其进行验证。
import Ajv, { JTDErrorObject, JTDSchemaType } from 'ajv/dist/jtd'
import { useNewSettingStore } from '@store/new-setting'
import localizezh from 'ajv-i18n/localize/zh'
import localizeen from 'ajv-i18n/localize/en'
const newSettingStore = useNewSettingStore()
const ajv = new Ajv()

interface DataCellInter {
  name: string
  label: string
}
interface DataInter {
  foo: number
  bar?: string
  info: DataCellInter
}

const schema: JTDSchemaType<DataInter> = {
  properties: {
    foo: { type: 'int32' },
    info: {
      properties: {
        name: { type: 'string' },
        label: { type: 'string' }
      }
    }
  },
  optionalProperties: {
    bar: { type: 'string' }
  }
}

const validate = ajv.compile(schema)
// const validate = ajv.compile<DataInter>(schema)

const data = {
  foo: 1,
  bar: '123',
  info: {
    name: '1',
    label: '2'
  }
}

watch(
  () => newSettingStore.headerSetting.mLocal,
  (newVal, oldVal) => {
    if (validate(data)) {
      console.log(data)
    } else {
      if (newVal === 'zh-CN') {
        localizezh(validate.errors)
      } else {
        localizeen(validate.errors)
      }
      for (const err of validate.errors as JTDErrorObject[]) {
        switch (err.keyword) {
          case 'type':
            console.log(err)
            break
          default:
            console.log('default')
        }
      }
      console.log(ajv.errorsText(validate.errors, { separator: '\n' }))
    }
  },
  { immediate: true, deep: true }
)
</script>
<route lang="yaml">
meta:
  breadcrumb: page.ui
  icon: i-ant-design:read-filled
  sort: -2
  padding: 40px
</route>
