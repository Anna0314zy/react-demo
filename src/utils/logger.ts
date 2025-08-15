// src/utils/logger.ts
const isProd = import.meta.env.PROD
import * as Sentry from '@sentry/browser'
type LogArgs = unknown[]

export const logger = {
  log: (...args: LogArgs) => {
    if (!isProd) console.log(...args)
  },
  info: (...args: LogArgs) => {
    if (!isProd) console.info(...args)
  },
  warn: (...args: LogArgs) => {
    if (!isProd) console.warn(...args)
  },
  error: (...args: LogArgs) => {
    // 错误线上也打印（方便监控收集）
    console.error(...args)
    if (import.meta.env.PROD) {
      Sentry.captureException(args[0])
    }
  },
}
