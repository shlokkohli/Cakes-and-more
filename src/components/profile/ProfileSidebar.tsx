'use client'
import { authClient } from '@/lib/auth-client'
import {
  User,
  Box,
  MapPin,
  CreditCard,
  LogOut,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export const ProfileSidebar = () => {
  const pathname = usePathname()
  const router = useRouter()

  const sidebarLinks = [
    {
      id: 1,
      name: 'Profile',
      path: '/profile',
      icon: User,
    },
    {
      id: 2,
      name: 'Orders',
      path: '/profile/orders',
      icon: Box,
    },
    {
      id: 3,
      name: 'Address',
      path: '/profile/address',
      icon: MapPin,
    },
    {
      id: 4,
      name: 'Payments',
      path: '/profile/payments',
      icon: CreditCard,
    },
  ]

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.replace('/')
        },
      },
    })
  }

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-2 shadow-sm shadow-black/10 md:min-w-65">
      {/* profile avatar section */}
      <div className="flex items-center justify-start gap-3 p-2">
        <div className="flx items-center justify-center rounded-full bg-[#F6EEEE] p-2">
          <User className="text-red-900" />
        </div>
        <h3 className="text-base font-semibold">
          Shlok Kohli
        </h3>
      </div>

      <hr className="mt-2 text-gray-300" />

      {/* links section */}
      <div className="mt-4 flex w-full flex-col gap-4">
        {sidebarLinks.map((eachLink) => {
          const isActive = eachLink.path === pathname
          return (
            <Link
              key={eachLink.id}
              href={eachLink.path}
              className={`flex items-center justify-start gap-2 rounded-lg p-2 px-4 text-sm transition-transform duration-300 hover:translate-x-1 ${isActive ? `bg-black text-white` : `bg-white text-black`}`}
            >
              <eachLink.icon
                height={20}
                width={20}
                className={`${isActive ? `text-white` : `text-gray-500`}`}
              />
              {eachLink.name}
            </Link>
          )
        })}

        <button
          onClick={handleSignout}
          className="flex items-center justify-start gap-2 rounded-lg p-2 px-4 text-sm text-red-600 transition-transform duration-300 hover:translate-x-1 hover:bg-red-50"
        >
          <LogOut
            height={20}
            width={20}
          />
          Sign out
        </button>
      </div>
    </div>
  )
}
