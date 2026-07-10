import * as z from 'zod'

export const OTPSchema = z.object({
  otp: z.string().length(4, 'OTP must be 4 digits'),
})

export type OTPFormInput = z.input<typeof OTPSchema>
