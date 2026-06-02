import Image from 'next/image'

const CartItems = () => {
  return (
    <div className="flex w-full justify-between rounded-lg border border-gray-300 bg-white p-4">
      <div className="flex gap-4">
        <Image
          src={'/chocolate-cake.jpg'}
          alt="chocolate-cake"
          height={150}
          width={150}
          className="h-30 w-30 rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h3 className="font-medium">
            Classic Vanilla Cake
          </h3>
          <p className="font-semibold">$45</p>
        </div>
      </div>
      <div className="font-semibold">$75</div>
    </div>
  )
}

export default CartItems
