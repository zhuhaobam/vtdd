import vueSetupExtend from 'vite-plugin-vue-setup-extend'

// 使 vue 脚本设置语法支持 name 属性
// <script setup lang="ts" name="home">
// </script>
export default function createVueSetupExtend() {
  return vueSetupExtend()
}
