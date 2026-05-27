const OrderSummary = () => {
  return (
    <div className="w-full rounded-lg border border-gray-300 bg-white p-4">
      <div>
        <h3 className="font-semibold">Order Summary</h3>

        <div className="mt-4 flex flex-col gap-2">
          <div className="flex justify-between text-sm text-gray-500">
            <span>Subtotal</span>
            <span>$90</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Delivery</span>
            <span>$5</span>
          </div>
        </div>

        <hr className="mt-2 text-gray-300" />

        <div className="mt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>$90</span>
        </div>

        <button className="mt-4 w-full rounded-lg bg-black p-2 px-4 text-white transition-all duration-300 hover:bg-black/80 active:scale-95">
          Checkout
        </button>
      </div>
    </div>
  )
}

export default OrderSummary
