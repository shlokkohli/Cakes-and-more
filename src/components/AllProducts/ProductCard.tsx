'use client'
import { useRouter } from 'next/navigation'
import { CldImage } from 'next-cloudinary'
import type { Cake } from '@/types/Cake'

const ProductCard = ({ cake }: { cake: Cake }) => {
  const router = useRouter()

  return (
    <div className="group inline-block w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-md shadow-black/20 transition-all duration-500 hover:shadow-lg hover:shadow-black/30">
      <div className="relative h-80 overflow-hidden">
        <CldImage
          src={cake.images}
          alt={cake.title}
          height={300}
          width={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-black group-hover:text-red-900">
            {cake.title}
          </h3>
          <span className="text-lg font-semibold text-black">
            ${cake.price}
          </span>
        </div>
        <p className="font-mednum text-sm text-gray-600">
          {cake.shortDescription}
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
