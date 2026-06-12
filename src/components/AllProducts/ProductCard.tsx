'use client'
import Image from 'next/image'
import type { Category } from '@/lib/categories'
import { useRouter } from 'next/navigation'

type Props = Pick<Category, 'name' | 'image'>

const ProductCard = ({ name, image }: Props) => {
  const router = useRouter()

  return (
    <div className="group inline-block w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md shadow-black/20 transition-all duration-500 hover:shadow-lg hover:shadow-black/30">
      <div className="relative h-80 overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-2 p-4">
        <h3 className="text-lg font-semibold text-black group-hover:text-red-900">
          {name}
        </h3>
        <p className="font-mednum text-sm text-gray-600">
          Rnch layers of dark chocolate sponge with silky
          ganache
        </p>

        <button
          onClick={() => router.push('/auth')}
          className="w-full rounded-lg bg-[#AF5752] p-2 text-white transition-all duration-300 hover:bg-[#AF5752]/90 focus-visible:ring-2 focus-visible:ring-[#D7A9A7] focus-visible:outline-none"
        >
          Add To Card
        </button>
      </div>
    </div>
  )
}

export default ProductCard
