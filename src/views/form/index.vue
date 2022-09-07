<template>
  <n-space vertical>
    <n-form ref="formRef" :model="modelRef" :rules="rules">
      <n-form-item label="输入点什么去掉 error" path="input">
        <n-input v-model:value="modelRef.input" />
      </n-form-item>
      <n-form-item label="Datetime" path="datetimeValue">
        <n-date-picker v-model:value="modelRef.datetimeValue" type="datetime" />
      </n-form-item>
      <div style="display: flex; justify-content: flex-end">
        <n-button round type="primary" @click="handleValidateButtonClick"> 验证 </n-button>
      </div>
    </n-form>
  </n-space>
</template>
<script setup lang="ts" name="such-form">
import { FormInst, FormItemRule, FormRules, useMessage } from 'naive-ui'
import { useNewSettingStore } from '@store/new-setting'
const newSettingStore = useNewSettingStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)
const messageLocale: Record<string, Record<string, string>> = {
  'zh-CN': {
    input: '中文',
    datetime: '请输入日期时间'
  },
  en: {
    input: 'english',
    datetime: 'please enter date and time'
  }
}
const messageLocaleInfo = ref(messageLocale['zh-CN'])
watch(
  () => newSettingStore.getMLocal,
  (newVal, oldVal) => {
    if (newVal) {
      messageLocaleInfo.value = messageLocale[newVal]
    }
    formRef.value?.restoreValidation()
  },
  { immediate: true, deep: true }
)
const rules: FormRules = {
  input: {
    required: true,
    trigger: ['blur', 'input'],
    renderMessage: () => {
      return messageLocaleInfo.value.input
    }
  },
  datetimeValue: {
    type: 'number',
    required: true,
    trigger: ['blur', 'change'],
    asyncValidator: (rule: FormItemRule, value: number) => {
      return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (value > 0) {
            resolve()
          } else {
            reject(messageLocaleInfo.value.datetime)
          }
        }, 3000)
      })
    }
  }
}
const modelRef = ref({
  input: null,
  datetimeValue: null
})

const handleValidateButtonClick = (e: MouseEvent) => {
  e.preventDefault()
  const messageReactive = message.loading('验证中', {
    duration: 0
  })
  formRef.value
    ?.validate(errors => {
      if (!errors) {
        message.success('验证成功')
      } else {
        message.error('验证失败')
      }
      messageReactive.destroy()
    })
    .catch(({ errors, fields }) => {
      // nothing
    })
}
</script>
<route lang="yaml">
meta:
  breadcrumb: page.form
  icon: i-ant-design:read-filled
  sort: -2
  padding: 40px
</route>
