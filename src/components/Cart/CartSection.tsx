import CartItems from './CartItems'
import OrderSummary from './OrderSummary'

const CartSection = () => {
  return (
    <div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
      <div className="w-full md:w-[70%]">
        <CartItems />
      </div>
      <div className="w-full md:w-[30%]">
        <OrderSummary />
      </div>
    </div>
  )
}

export default CartSection
