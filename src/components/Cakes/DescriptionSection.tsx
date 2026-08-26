import { Users, Scale } from 'lucide-react'
import IngridentsIcon from '../IngridentsIcon'

interface DescriptionSectionProps {
  title: string
  price: number
  description: string
  types: string[]
}

const DescriptionSection = ({
  title,
  price,
  description,
  types,
}: DescriptionSectionProps) => {
  return (
    <div className="flex flex-col justify-end gap-8 p-8">
      {/* title price section */}
      <div>
        <h1 className="text-3xl font-bold text-black">
          {title}
        </h1>
        <h2 className="text-xl font-semibold text-red-900">
          ${price}
        </h2>
      </div>

      <p className="font-medium text-gray-500">
        {description}
      </p>

      <div className="flex gap-4">
        <div className="flex items-center justify-start gap-2 text-sm text-gray-500">
          <Users
            height={15}
            width={15}
          />
          <span>Server 10-12</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
          <Scale
            height={15}
            width={15}
          />
          <span>1.5 Kg</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-black">Type</h3>
        <IngridentsIcon type={types} />
      </div>

      <button className="w-full rounded-lg bg-black py-2 text-white transition-all duration-500 hover:bg-black/80 active:scale-95 active:bg-black/80">
        Add To Cart
      </button>
    </div>
  )
}

export default DescriptionSection
