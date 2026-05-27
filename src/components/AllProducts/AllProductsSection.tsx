import { categories } from '@/lib/categories'
import ProductCard from './ProductCard'

const AllProductsSection = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">
        All Cakes
      </h2>
      <div className="mt-4 grid grid-cols-2 gap-6 sm:grid-cols-3">
        {categories.map((category) => (
          <ProductCard
            key={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  )
}

export default AllProductsSection
