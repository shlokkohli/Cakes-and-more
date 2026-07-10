import { OTPPayload } from '@/types/otp'
import prisma from './prisma'

export const CheckOTP = async ({
  phoneNumber,
  code,
}: OTPPayload): Promise<boolean> => {
  const record = await prisma.verification.findFirst({
    where: { identifier: phoneNumber },
    orderBy: { createdAt: 'desc' },
  })

  if (!record) {
    return false
  }

  const [storedCode, attempts] = record.value.split(':')

  if (new Date() > record.expiresAt) {
    return false
  }

  // too many attmepts, default is 3
  if (Number(attempts) > 3) {
    return false
  }

  if (storedCode !== code) {
    prisma.verification.update({
      where: { id: record.id },
      data: { value: `${storedCode}:${Number(attempts) + 1}` },
    })
    return false
  }

  // if it is verified successfully, delete the record so it cant be checked again
  await prisma.verification.delete({
    where: { id: record.id },
  })

  return true
}
