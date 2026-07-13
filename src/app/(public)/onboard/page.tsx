'use client'
import {
  onboardFormInput,
  onboardSchema,
} from '@/schemas/onboard.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { User, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { useMutation } from '@tanstack/react-query'

interface onboardResponse {
  success: boolean
}

const page = () => {
  const router = useRouter()

  const mutation = useMutation({
    mutationFn: async (formData: onboardFormInput) => {
      const response = await axios.post<onboardResponse>(
        '/api/onboard',
        formData
      )
      return response.data
    },
    onSuccess: (data) => {
      if (data.success) {
        router.push('/')
      }
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const backendError = error.response?.data.error
        toast.error(backendError)
      }
    },
  })

  const handleonboardSubmit = async (
    formData: onboardFormInput
  ) => {
    mutation.mutate(formData)
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<onboardFormInput>({
    resolver: zodResolver(onboardSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  })

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-6 rounded-lg bg-white p-10">
        <div className="w-fit rounded-full bg-[#F6EDEC] p-4 text-center">
          <User
            height={30}
            width={30}
          />
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold">
            Complete your profile
          </h1>
          <p className="font-medium text-gray-500">
            Help us know you better
          </p>
        </div>

        <form
          className="w-full space-y-2"
          onSubmit={handleSubmit(handleonboardSubmit)}
        >
          <div className="flex w-full flex-col gap-4 self-start">
            {/* first name */}
            <div className="space-y-2">
              <label
                htmlFor="firstName"
                className="text-sm font-bold"
              >
                First Name
              </label>
              <div className="flex items-center rounded-md border border-gray-300 p-1 px-2 focus-within:border-transparent focus-within:ring-3 focus-within:ring-[#D7A9A5]">
                <input
                  id="firstName"
                  type="text"
                  className="p-1 px-2 focus:outline-none"
                  placeholder="John"
                  {...register('firstName')}
                />
              </div>
              {errors.firstName && (
                <p className="text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* last name */}
            <div className="space-y-2">
              <label
                htmlFor="lastName"
                className="text-sm font-bold"
              >
                Last Name
              </label>
              <div className="flex items-center rounded-md border border-gray-300 p-1 px-2 focus-within:border-transparent focus-within:ring-3 focus-within:ring-[#D7A9A5]">
                <input
                  id="lastName"
                  type="text"
                  className="p-1 px-2 focus:outline-none"
                  placeholder="John"
                  {...register('lastName')}
                />
              </div>
              {errors.lastName && (
                <p className="text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#AC524C] p-2 text-white transition-all duration-200 hover:bg-[#AC524C]/90 focus:outline-none active:gap-3"
          >
            Start Savouring
            <span>
              <ArrowRight
                height={15}
                width={15}
              />
            </span>
          </button>
        </form>

        <p className="max-w-xs text-center text-xs text-gray-500">
          By signing up, you agree to our Terms of Service
          and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default page
