import * as z from 'zod'

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .length(10, 'Phone Number must be 10 digits')
    .regex(/^\d{10}$/, 'Phone Number must contain only digits'),
})

export type phoneNumberInput = z.input<typeof phoneNumberSchema>
