import twilio from 'twilio'
import { env } from '@/env'
import { OTPPayload } from '@/types/otp'

const accountSid = env.TWILIO_ACCOUNT_SID
const authToken = env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)

export async function SendOTP({
  phoneNumber,
  code,
}: OTPPayload) {
  const message = await client.messages.create({
    body: `Your OTP is ${code}`,
    from: env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  })
}
