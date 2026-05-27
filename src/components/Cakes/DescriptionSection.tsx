import { Users, Scale } from 'lucide-react'
import IngridentsIcon from '../IngridentsIcon'

const DescriptionSection = () => {
  return (
    <div className="flex flex-col justify-end gap-8 p-8">
      {/* title price section */}
      <div>
        <p className="text-gray-500">Chocolate</p>
        <h1 className="text-3xl font-bold text-black">
          Dark Chocolate Truflle
        </h1>
        <h2 className="text-xl font-semibold text-red-900">
          $85
        </h2>
      </div>

      <p className="font-medium text-gray-500">
        Indulge in our signature Dark Chocolate Truffle
        cake, featuring three layers of moist dark chocolate
        sponge, filled with Belgian chocolate ganache and
        finished with a mirror glaze. Each bite delivers an
        intense chocolate experience that will satisfy even
        the most devoted chocolate lovers.
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
        <h3 className="font-semibold text-black">
          Ingridents
        </h3>
        <IngridentsIcon />
      </div>

      <button className="w-full rounded-lg bg-black py-2 text-white transition-all duration-500 hover:bg-black/80 active:scale-95 active:bg-black/80">
        Add To Cart
      </button>
    </div>
  )
}

export default DescriptionSection
