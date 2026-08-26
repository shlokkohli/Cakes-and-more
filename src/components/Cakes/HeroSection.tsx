import BackButton from '../BackButton'
import CloudinaryImage from '../ui/CloudinaryImage'
import DescriptionSection from './DescriptionSection'

interface cakeData {
  title: string
  description: string
  price: number
  types: string[]
  images: string
}

const HeroSection = ({ cake }: { cake: cakeData }) => {
  return (
    <div className="flex w-full flex-col items-start justify-between">
      <BackButton label={'Back to cakes'} />

      <div className="mt-6 flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        {/* left side image */}
        <div className="aspect-square w-full overflow-hidden rounded-lg md:h-125 md:w-125 md:shrink-0">
          <CloudinaryImage
            alt={cake.title}
            height={500}
            width={500}
            src={cake.images}
            loading="eager"
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* left side description */}
        <div className="w-full flex-1">
          <DescriptionSection
            price={cake.price}
            types={cake.types}
            title={cake.title}
            description={cake.description}
          />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
