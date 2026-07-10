import { betterAuth, boolean } from 'better-auth'
import prisma from './prisma'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { phoneNumber } from 'better-auth/plugins'
import { SendOTP } from './send_sms'
import { CheckOTP } from './checkOTP'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  user: {
    additionalFields: {
      onboardingCompleted: {
        type: 'boolean',
        input: false,
      },
    },
  },
  plugins: [
    phoneNumber({
      sendOTP: ({ phoneNumber, code }) => {
        SendOTP({ phoneNumber, code })
      },
      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          return `${phoneNumber}@my-site.com`
        },
        getTempName: () => {
          return 'User'
        },
      },
      verifyOTP: async ({ phoneNumber, code }) => {
        return await CheckOTP({ phoneNumber, code })
      },
      otpLength: 4,
    }),
  ],
})
