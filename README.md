# 请运行之前清空浏览器的Application下的all Storage 【重构代码，会对pinia 本地存储数据有影响，比如几个刷新后还保持原样效果的展示】

# vtdd 源码检查结果

[![OSCS Status](https://www.oscs1024.com/platform/badge/zhuhaobam/vtdd.svg?size=large)](https://www.oscs1024.com/project/zhuhaobam/vtdd?ref=badge_large)

## dev、build、preview、lint、prettier、stylelint以及github page均通过

## 目前pnpm一直是最新版本的，依赖包也通过pnpm update最新的

## 提交检验=》控制台先pnpm run  prepare=>再使用git那一系列命令

## 目前已经趟过无数的疑难杂症，上面dev到github page通过不容易啊

## 项目在线预览地址

https://zhuhaobam.github.io

## 请求和 tag 右键展示

![请求和tag右键展示](https://raw.githubusercontent.com/zhuhaobam/vtdd/main/docbyexplain/page1.png)

## 提取图片背景色

![提取图片背景色](https://raw.githubusercontent.com/zhuhaobam/vtdd/main/docbyexplain/page2.png)

## 歌曲兴趣

![歌曲兴趣](https://raw.githubusercontent.com/zhuhaobam/vtdd/main/docbyexplain/page3.png)

## markdown 本地读取目录展示

![markdown本地读取目录展示](https://raw.githubusercontent.com/zhuhaobam/vtdd/main/docbyexplain/page4.png)

## 绘图截图

![绘图截图](https://raw.githubusercontent.com/zhuhaobam/vtdd/main/docbyexplain/page5.png)

# 项目地址

## pnpm 包管理器

`pnpm run dev`

## github

`https://github.com/zhuhaobam/vtdd`

## gitee

`https://gitee.com/zhline/vtdd`

# 描述

- 代码格式化
- 代码检查
- 自动依赖组件 API
- 自动依赖组件
- Mock 配置开启
- 自定义 svg
- 国际化
- starport 页面切换头像平滑
- 其他

# npm 库

- vite
- ts
- mock
- pinia
- pinia 本地存储
- i18
- unocss
- starport
- eslint
- prettier

# vscode 插件

- Prettier-Code formatter
- ESLint
- TypeScript Vue Plugin (Volar)
- Vue Language Features (Volar)
- EditoerConfig for VS Code
- UnoCss

# 提交规范

## `<type>(<scope>): <subject>`

### type

- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式，不影响代码逻辑
- refactor: 重构代码，理论上不影响现有功能
- perf: 提升性能
- test: 增加修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等）
- deps: 升级依赖

### scope

> 修改文件的范围（包括但不限于 doc, middleware, proxy, core, config）

# vscode setting.json

```

{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.stylelint": true
  },
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascript",
    "typescript",
    "typescriptreact",
    "javascriptreact",
    "jsx",
    "html",
    "vue"
  ],
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "stylelint.validate": ["vue", "less", "css", "html", "scss", "sass"],
  "eslint.options": {
    "overrideConfig": {
      "env": {
        "browser": true,
        "es6": true
      },
      "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
          "jsx": true
        }
      },
      "rules": {
        "no-debugger": "off"
      }
    }
  },
  "[vue]": {
    "editor.defaultFormatter": "Vue.volar"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "settingsSync.ignoredExtensions": [

  ],
  "window.zoomLevel": 2
}


```
