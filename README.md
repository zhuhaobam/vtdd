# vtdd vite + ts + dd

# 自动分析

- rollup-plugin-visualizer build 自动打开 stats.html
- http://localhost:3200/\_\_inspect/ dev 访问

# husky git提交内容格式化和检查，提交commit检查

- "husky官网": "https://typicode.github.io/husky/#/"
- Install husky
  - npm install husky --save-dev
- Enable Git hooks
  - npx husky install
- To automatically have Git hooks enabled after install, edit package.json
  - "prepare": "husky install"
- 提交前检查文件格式
  - npx husky add .husky/pre-commit 'npx lint-staged'

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
