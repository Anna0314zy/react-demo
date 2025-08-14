import { VitePWA } from 'vite-plugin-pwa'
import packageJson from '../../package.json'
/**
 * JS/CSS 资源预缓存

字体长期缓存

图片缓存

API 数据缓存
 */
export const pwaPlugin = VitePWA({
  // 自动注入 Service Worker 注册代码
  injectRegister: 'auto',

  // 新 SW 安装后立即激活并覆盖旧版本
  registerType: 'autoUpdate',

  // 不生成 manifest.json，可根据需要改为 true
  manifest: false,

  // 自定义 SW 文件名，带版本号和时间戳，保证每次打包更新
  filename: `sw.${packageJson.version}_${Date.now()}.js`,

  // Workbox 配置
  workbox: {
    // 自动清理旧缓存
    cleanupOutdatedCaches: true,

    // 新 SW 安装后立即激活
    skipWaiting: true,

    // 新 SW 激活后立即控制所有客户端
    clientsClaim: true,

    // 预缓存的文件类型
    globPatterns: ['**/*.{js,css}'],

    // 忽略不缓存的文件
    globIgnores: ['**/node_modules/**/*', 'workbox-*.js'],

    // 不配置 fallback 页面
    navigateFallback: null,

    // 运行时缓存策略
    runtimeCaching: [
      // 字体文件缓存
      {
        urlPattern: /(.*?)\.(woff|ttf|woff2)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'fonts-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 365, // 365 天
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // 图片缓存（jpg/png/svg/gif/webp）
      {
        urlPattern: /(.*?)\.(png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 200, // 最多缓存 200 张图片
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 天
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },

      // API 请求缓存（示例：GET /api/**）
      {
        urlPattern: /\/api\/.*$/,
        handler: 'NetworkFirst', // 优先请求网络，没有再用缓存
        options: {
          cacheName: 'api-cache',
          networkTimeoutSeconds: 5, // 网络请求超时 5 秒使用缓存
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24, // 1 天
          },
          cacheableResponse: { statuses: [0, 200] },
        },
      },
    ],
  },
})
