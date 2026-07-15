'use client'
import { LoaderCircle, ShieldCheck } from 'lucide-react'
import { OTPInput } from 'input-otp'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'
import {
  OTPSchema,
  OTPFormInput,
} from '@/schemas/otp.schema'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authClient } from '@/lib/auth-client'
import { useMutation } from '@tanstack/react-query'

const page = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const phoneNumber = searchParams.get('phone')
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<OTPFormInput>({
    resolver: zodResolver(OTPSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  const mutation = useMutation({
    mutationFn: async (formData: OTPFormInput) => {
      const otp = formData.otp
      const { error } = await authClient.phoneNumber.verify(
        {
          phoneNumber: phoneNumber,
          code: otp,
          disableSession: false,
        }
      )
      if (error) {
        throw new Error(error.message)
      }
    },
    onSuccess: () => {
      router.push('/onboard')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const handleOTPSubmit = async (
    formData: OTPFormInput
  ) => {
    mutation.mutate(formData)
  }

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white p-10">
        <div className="w-fit rounded-full bg-[#F6EDEC] p-4 text-center">
          <ShieldCheck
            height={30}
            width={30}
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">Verify OTP</h1>
          <p className="font-medium text-gray-500">
            {`We sent a code to ${phoneNumber}`}
          </p>
        </div>

        <form onSubmit={handleSubmit(handleOTPSubmit)}>
          <div className="flex w-full flex-col gap-1 self-start">
            <label className="text-sm font-bold">
              Enter OTP
            </label>
            <div className="flex items-center rounded-md p-4">
              <Controller
                name="otp"
                control={control}
                render={({ field }) => (
                  <OTPInput
                    maxLength={4}
                    value={field.value}
                    onChange={field.onChange}
                    render={({ slots }) => (
                      <div className="flex gap-2">
                        {slots.map((slot, index) => (
                          <div
                            key={index}
                            className={`flex h-15 w-15 items-center justify-center rounded-md border-2 text-lg font-semibold ${slot.isActive ? 'border-[#AC524C]' : 'border-gray-300'}`}
                          >
                            {slot.char ?? ''}
                          </div>
                        ))}
                      </div>
                    )}
                  />
                )}
              />
            </div>
            {errors.otp && (
              <p className="text-sm text-red-500">
                {errors.otp.message}
              </p>
            )}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#AC524C] p-2 text-white transition-all duration-200 focus:outline-none active:gap-3 enabled:hover:bg-[#AC524C]/90 disabled:bg-[#AC524C]/90"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <div className="flex items-center justify-center gap-2">
                  Submitting
                  <span>
                    <LoaderCircle className="h-4 w-4 animate-spin" />
                  </span>
                </div>
              ) : (
                <div>Enter OTP</div>
              )}
            </button>
          </div>
        </form>

        <p className="max-w-xs text-center text-xs text-gray-500">
          Didn't receive the code?
        </p>
      </div>
    </div>
  )
}

export default page
