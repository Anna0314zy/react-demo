import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import { visualizer } from 'rollup-plugin-visualizer'
import compression from 'vite-plugin-compression'
import { Plugin } from 'vite'
/**
 * ）是 Vite 官方提供的一个本地开发 HTTPS 插件，主要作用是让你的 本地开发服务器支持 HTTPS。
 * 某些场景必须使用 HTTPS 才能正常运行：

WebRTC（摄像头、麦克风）

Service Worker / PWA（只能在 HTTPS 下注册）

浏览器安全策略要求的跨域 API 或 Cookie

测试第三方 SDK（比如支付、地理定位）
 */
import basicSsl from '@vitejs/plugin-basic-ssl'
/**
vite-plugin-pwa 就是让 Vite 项目秒变“像原生 App 一样能离线运行和安装”的网页 的神器。
 * 
 */
import { pwaPlugin } from './build/plugins'
import { resolve } from 'path'
/**
 * 让 CommonJS 模块（require/module.exports）能在 Vite 项目中正常使用。

因为 Vite 默认是基于 ESModule（import/export）的，如果你引入一些老的 npm 包（比如 lodash 的旧版本），可能会因为它是 CommonJS 格式而无法直接运行，这个插件就是做转换的。
 */
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import reactSwc from '@vitejs/plugin-react-swc'
export default defineConfig(({ command }) => {
  console.log(command)
  // 判断是否是生产环境
  return {
    plugins: [
      legacy({
        targets: ['> 1%', 'last 2 versions', 'IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      reactSwc({
        jsxImportSource: 'react',
        tsDecorators: true,
      }),
      ...(Array.isArray(pwaPlugin) ? pwaPlugin : [pwaPlugin]),
      compression(),
      visualizer({
        filename: './dist/stats.html', // 输出报告文件
        open: true, // 构建完成后自动打开浏览器
        template: 'treemap', // 可选：treemap | sunburst | network
      }) as Plugin,
      viteCommonjs({ exclude: ['ali-oss'] }) as Plugin,
      basicSsl(),
    ],
    base: './',
    server: {
      strictPort: false,
      port: 5175,
      proxy: {
        // 当请求匹配这个路径前缀时，将请求转发到目标服务器
        '/api': {
          target: 'https://test-class-api-online.saasp.vdyoo.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'dist/',
      rollupOptions: {
        input: {
          index: resolve(__dirname, './index.html'),
        },
      },
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true, // 删除所有 console
          drop_debugger: true, // 删除 debugger
        },
      },
    },

    envDir: 'env',
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  }
})
