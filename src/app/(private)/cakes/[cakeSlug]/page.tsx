import HeroSection from '@/components/Cakes/HeroSection'
import { getCakeById } from '@/lib/cakes'

const page = async ({
  params,
}: {
  params: Promise<{ cakeSlug: string }>
}) => {
  const { cakeSlug } = await params
  const cakeData = await getCakeById(cakeSlug)

  if (!cakeData) {
    return <div>nothing to show here</div>
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row">
        <HeroSection cake={cakeData} />
      </div>
    </div>
  )
}

export default page
