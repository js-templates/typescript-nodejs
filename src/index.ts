import { env } from './env.js'

console.info(
  `Running in ${env.isDevelopment ? 'development' : 'production'} mode`,
)
