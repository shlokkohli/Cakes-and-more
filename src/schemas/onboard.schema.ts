import * as z from 'zod'

export const onboardSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, 'First name must be atleast 2 characters long'),
  lastName: z
    .string()
    .trim()
    .min(1, 'Last name cannot be empty'),
})

export type onboardFormInput = z.input<typeof onboardSchema>
