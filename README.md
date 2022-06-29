# vtdd vite + ts + dd

# 地址
## github
`https://github.com/zhuhaobam/vtdd`
## gitee
`https://gitee.com/zhline/vtdd`

# 自动分析

- rollup-plugin-visualizer build 自动打开 stats.html
- http://localhost:3200/\_\_inspect/ dev 访问

# husky git 提交内容格式化和检查，提交 commit 检查

## npm 下载包准备

- npm i -D @commitlint/cli @commitlint/config-conventional husky lint-staged
- commitlint 参考 1 https://blog.csdn.net/m0_37602317/article/details/122081365
- commitlint 参考 2 https://github.com/conventional-changelog/commitlint/#what-is-commitlint

## husky 操作

- "husky 官网": "https://typicode.github.io/husky/#/"
- Install husky
  - npm install husky --save-dev
- Enable Git hooks
  - npx husky install
- To automatically have Git hooks enabled after install, edit package.json
  - "prepare": "husky install"
- 提交前检查文件格式
  - npx husky add .husky/pre-commit 'npx lint-staged'
  - npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
- 如果你想去掉（卸载）husky
  - 找到当前项目的.git 目录，删除里面的 husky 文件
  - 将 package.json 里面的 husky lint-staged 两个包卸载，并把 script 的 prepare 命令去掉，并删除 husky lint-staged 两个节点
  - 删除项目根目录的.husky 文件

# 初步的实现

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
