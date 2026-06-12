import { betterAuth } from 'better-auth'
import prisma from './prisma'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { phoneNumber } from 'better-auth/plugins'
import { SendOTP } from './send_sms'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }, ctx) => {
        console.log('This is the ctx ', ctx)
        SendOTP(phoneNumber, code)
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`
        },
      },
    }),
  ],
})
