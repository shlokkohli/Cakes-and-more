import AllProductsSection from '@/components/AllProducts/AllProductsSection'
import CategoriesSection from '@/components/Categories/CategoriesSection'

const HomePage = () => {
  return (
    <div className="space-y-10">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">
          Fresh Cakes
        </h1>
        <h3 className="font-medium text-gray-500">
          Homemade with love, delivered to your
          door
        </h3>
      </div>

      <CategoriesSection />
      <AllProductsSection />
    </div>
  )
}

export default HomePage
