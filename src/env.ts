import { config } from 'dotenv'
import { z } from 'zod'

// Load .env file
config({ quiet: true })

const EnvSchema = z
  .object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
  })
  .transform((raw) => ({
    isDevelopment: raw.NODE_ENV === 'development',
    isProduction: raw.NODE_ENV === 'production',
  }))

export type Env = z.infer<typeof EnvSchema>

export function load(): Env {
  const result = EnvSchema.safeParse(process.env)

  if (!result.success) {
    console.error('Configuration validation failed:')
    for (const issue of result.error.issues) {
      console.error(`  ${issue.path.join('.')}: ${issue.message}`)
    }

    throw new Error('Invalid configuration')
  }

  return result.data
}

export const env = load()
