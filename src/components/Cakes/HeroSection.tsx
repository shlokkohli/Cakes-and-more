import Image from 'next/image'
import BackButton from '../BackButton'
import DescriptionSection from './DescriptionSection'

const HeroSection = () => {
  return (
    <div className="flex w-full flex-col items-start justify-between">
      <BackButton label={'Back to cakes'} />

      <div className="mt-6 flex w-full flex-col items-center justify-between gap-8 md:flex-row md:items-start">
        {/* left side image */}
        <div className="w-full aspect-square md:h-125 md:w-125 md:shrink-0 overflow-hidden rounded-lg">
          <Image
            alt="chocolate-cake"
            height={500}
            width={500}
            src={'/chocolate-cake.jpg'}
            className="h-full w-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* left side description */}
        <div className="w-full flex-1">
          <DescriptionSection />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
