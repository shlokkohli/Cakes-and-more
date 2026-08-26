'use client'
import { categories } from '@/lib/categories'
import ProductCard from './ProductCard'
import { useSearchParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type { CakeResponse } from '@/types/Cake'

export const getCakes = async (page: number) => {
  const allCakes = await axios.get<CakeResponse>(
    `/api/allcakes?cake=${page}`
  )
  return allCakes.data
}

const AllProductsSection = () => {
  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? '1')

  const {
    data: cakes,
    isPending,
    error,
  } = useQuery({
    queryKey: ['cakes', page],
    queryFn: () => getCakes(page),
  })

  if (isPending) {
    return (
      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-full animate-pulse overflow-hidden rounded-lg bg-white shadow-md"
          >
            {/* image section */}
            <div className="relative h-80 overflow-hidden bg-gray-200"></div>

            {/* content section */}
            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between">
                {/* title */}
                <div className="h-4 w-32 rounded-lg bg-gray-200"></div>
                {/* price */}
                <div className="h-4 w-12 rounded-lg bg-gray-200"></div>
              </div>

              {/* description */}
              <div className="h-4 w-full rounded bg-gray-200"></div>

              {/* button */}
              <div className="h-8 w-full rounded-lg bg-gray-200 p-2"></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return <p>this is the error</p>
  }

  return (
    <div>
      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {cakes.data.map((eachCake, i) => (
          <ProductCard
            key={i}
            cake={eachCake}
            priority={i < 4}
          />
        ))}
      </div>
    </div>
  )
}

export default AllProductsSection
