import visualizer from 'rollup-plugin-visualizer'

// 打包分析,可视化并分析构建包，查看哪些模块占用空间大小，以及模块的依赖关系
export default function createVisualizer() {
  return visualizer({
    // 打包后自动打开分析报告
    open: true
  })
}
