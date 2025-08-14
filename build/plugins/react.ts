import reactBabel from '@vitejs/plugin-react'
import reactSwc from '@vitejs/plugin-react-swc'
// 根据环境选择插件
export const reactPlugin = (isProd) => {
  return isProd
    ? reactBabel({
        // 生产环境 Babel 配置（可加自定义插件）
        babel: {
          presets: ['@babel/preset-env'],
          plugins: [
            // 生产优化，比如移除 PropTypes
            ['babel-plugin-transform-react-remove-prop-types', { removeImport: true }],
          ],
        },
      })
    : reactSwc({
        // 开发环境 SWC 配置（速度优先）
        jsxImportSource: 'react',
        tsDecorators: true,
      })
}
