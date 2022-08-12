---
title: MD结构适配
noi18n: yes
icon: file-markdown-filled
sort: 20
---

### 首先我的 vue 的路由生成是由这两个组件支配的，所以就参考了展现形式

- vite-plugin-pages
- vite-plugin-vue-layouts

### 我使用 md 插件搞了个读取 md 的适配页面

- 如果你有一个文件夹，你想通过文件夹来安排 md，你就需要建一个同名的 md 文件在文件夹同一级
- 建一个空文件夹，glob 没法识别
- 目前需要一个空的 md 配置 title 等参数充当目录
- 由于写 i18n 文件很麻烦，我又加了个参数 noi18n 来不适用国际化，直接写标题，舒服多了

### 当前 md 的头数据

```
title: md结构适配
noi18n: yes
icon: language-java
sort: 60
```
