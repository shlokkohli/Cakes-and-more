import twilio from 'twilio'

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const client = twilio(accountSid, authToken)
import { OTPPayload } from '@/types/otp'

export async function SendOTP({ phoneNumber, code }: OTPPayload) {
  const message = await client.messages.create({
    body: `Your OTP is ${code}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: phoneNumber,
  })
}
