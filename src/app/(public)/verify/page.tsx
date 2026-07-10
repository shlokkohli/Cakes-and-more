'use client'
import { authClient } from '@/lib/auth-client'
import {
  phoneNumberSchema,
  phoneNumberInput,
} from '@/schemas/phone-number.schema'
import { ShieldCheck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm, SubmitHandler } from 'react-hook-form'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'

const page = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<phoneNumberInput>({
    resolver: zodResolver(phoneNumberSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const submitMobileNumber: SubmitHandler<phoneNumberInput> = async (
    formData: phoneNumberInput
  ) => {
    const phoneNumber = '+91-' + formData.phoneNumber
    try {
      const { error } = await authClient.phoneNumber.sendOtp({
        phoneNumber: phoneNumber,
      })
      if (error) {
        toast.error(error.message)
        return
      }
      router.push(`/auth?phone=${encodeURIComponent(phoneNumber)}`)
    } catch (error) {
      console.log('Error occured sending OTP', error)
      toast.error('Something went wrong, please try again')
    }
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white p-8">
        <div className="w-fit rounded-full bg-[#F6EDEC] p-4 text-center">
          <ShieldCheck
            height={30}
            width={30}
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Let's get you started
          </h1>
          <p className="font-medium text-gray-500">
            Enter your phone number
          </p>
        </div>

        <form
          className="space-y-4"
          onSubmit={handleSubmit(submitMobileNumber)}
        >
          <div className="flex w-full flex-col gap-1 self-start">
            <label
              htmlFor="phone"
              className="text-sm font-bold"
            >
              Phone Number
            </label>
            <div className="flex items-center rounded-md border border-gray-300 p-1 px-2 focus-within:border-transparent focus-within:ring-3 focus-within:ring-[#D7A9A5]">
              <span className="text-sm text-gray-500">+91</span>
              <input
                id="phone"
                type="tel"
                className="p-1 px-2 focus:outline-none"
                placeholder="1234567890"
                maxLength={10}
                {...register('phoneNumber', {
                  required: true,
                })}
              />
            </div>
            {errors.phoneNumber && (
              <p className="text-sm text-red-500">
                {errors.phoneNumber?.message}
              </p>
            )}
            <p className="text-sm text-gray-500">
              We'll send an otp to verify your number
            </p>
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-[#AC524C] p-2 text-white transition-transform hover:bg-[#AC524C]/90 focus:outline-none active:scale-95"
          >
            Get OTP
          </button>
        </form>

        <p className="max-w-xs text-center text-xs text-gray-500">
          By signing up, you agree to our Terms of Service and Privacy
          Policy
        </p>
      </div>
    </div>
  )
}

export default page
