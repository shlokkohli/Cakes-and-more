import { Cake } from 'lucide-react'
import { ShoppingBag } from 'lucide-react'
import { LogIn } from 'lucide-react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className="fixed top-0 z-50 min-h-16 w-full border-b border-gray-200 bg-white/90 text-black backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-black p-4">
        {/* left side */}
        <Link
          href={'/'}
          className="flex items-center justify-center gap-2"
        >
          <Cake
            height={25}
            width={25}
            className="text-red-700"
          />
          <p className="text-lg font-semibold">Cakery</p>
        </Link>

        {/* right side */}
        <div className="flex items-center justify-center gap-10">
          <ShoppingBag
            height={20}
            width={20}
            className="cursor-pointer text-gray-500"
          />
          <Link
            href={'/profile'}
            className="flex cursor-pointer items-center justify-center gap-2"
          >
            <LogIn
              height={20}
              width={20}
              className="text-gray-500"
            />
            <p className="text-semibold text-sm text-gray-500">
              Login
            </p>
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
