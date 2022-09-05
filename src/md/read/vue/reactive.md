---
title: reactive
breadcrumb: md.md
noi18n: yes
icon: i-ant-design:read-filled
sort: 2
padding: 0 210px 40px 40px
---

<anchor-md-script>

<div style="display: none;">

[TOC]

</div>

# 为 reactive() 标注类型

```js
import { reactive } from 'vue'

interface Book {
  title: string
  year?: number
}

const book: Book = reactive({ title: 'Vue 3 指引' })
```

_TIP_

> 不推荐使用 reactive() 的泛型参数，因为处理了深层次 ref 解包的返回值与泛型参数的类型不同。

</anchor-md-script>
