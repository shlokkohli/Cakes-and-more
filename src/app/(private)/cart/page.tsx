import CartSection from '@/components/Cart/CartSection'

const page = () => {
  return (
    <div className="w-full">
      <div className="flex items-end justify-between">
        <h1 className="text-3xl font-bold">My Account</h1>
        <p className="font-medim text-sm text-gray-500">
          Clear All
        </p>
      </div>

      <div className="flex items-center justify-between">
        <CartSection />
      </div>
    </div>
  )
}

export default page
