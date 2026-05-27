import { categories } from '@/lib/categories'
import CategoriesCard from './CategoriesCard'

const CategoriesSection = () => {
  return (
    <div>
      <h2 className="text-xl font-bold">
        Categories
      </h2>
      <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {categories.map((category) => (
          <CategoriesCard
            key={category.id}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </div>
  )
}

export default CategoriesSection
