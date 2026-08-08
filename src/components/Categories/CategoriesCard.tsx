'use client'
import { CldImage } from 'next-cloudinary'
import type { Category } from '@/lib/categories'
type Props = Pick<Category, 'name' | 'image'>

const CategoriesCard = ({ name, image }: Props) => {
  return (
    <div className="group relative aspect-square w-full overflow-hidden rounded-xl transition-transform duration-300 hover:scale-105">
      <CldImage
        src={image}
        alt={name}
        loading="eager"
        height={200}
        width={200}
        sizes="(max-width: 640px) 33vw, 16vw"
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <p className="absolute inset-0 flex items-center justify-center bg-black/40 font-medium text-white transition-all duration-300 group-hover:bg-black/30">
        {name}
      </p>
    </div>
  )
}

export default CategoriesCard
