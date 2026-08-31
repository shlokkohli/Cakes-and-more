import { env } from '@/env'
import { createAuthClient } from 'better-auth/client'
import { phoneNumberClient } from 'better-auth/client/plugins'

export const authClient = createAuthClient({
  baseURL: env.NEXT_PUBLIC_APP_URL,
  plugins: [phoneNumberClient()],
})
