---
title: MD结构适配
noi18n: yes
icon: file-markdown-filled
sort: 20
---


### 首先我的vue的路由生成是由这两个组件支配的，所以就参考了展现形式

- vite-plugin-pages
- vite-plugin-vue-layouts

### 我使用md插件搞了个读取md的适配页面

- 如果你有一个文件夹，你想通过文件夹来安排md，你就需要建一个同名的md文件在文件夹同一级
- 建一个空文件夹，glob没法识别
- 目前需要一个空的md配置title等参数充当目录
- 由于写i18n文件很麻烦，我又加了个参数noi18n来不适用国际化，直接写标题，舒服多了

### 当前md的头数据

```
title: md结构适配
noi18n: yes
icon: language-java
sort: 60
```
