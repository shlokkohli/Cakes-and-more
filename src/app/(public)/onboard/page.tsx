'use client'
import { User, ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

const page = () => {
  const router = useRouter()

  const handleOTPSubmit = () => {
    router.push('/')
  }

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
              />
            </div>
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
              />
            </div>
          </div>
        </div>

        <button
          onClick={handleOTPSubmit}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#AC524C] p-2 text-white transition-all duration-300 hover:gap-3 hover:bg-[#AC524C]/90 focus:outline-none active:scale-95"
        >
          Start Savouring
          <span>
            <ArrowRight
              height={15}
              width={15}
            />
          </span>
        </button>

        <p className="max-w-xs text-center text-xs text-gray-500">
          By signing up, you agree to our Terms of Service
          and Privacy Policy
        </p>
      </div>
    </div>
  )
}

export default page
