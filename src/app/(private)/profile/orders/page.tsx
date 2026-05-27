import { orderHistory } from '@/lib/orders'
import Link from 'next/link'
import type { Orders } from '@/lib/orders'

const page = () => {
  return (
    <div className="flex w-full flex-col rounded-lg border-gray-300 bg-white p-4 shadow-sm shadow-black/10">
      <div className="">
        <h1 className="text-xl font-semibold">
          Order History
        </h1>

        <Link
          href={'/'}
          className="mt-4 flex w-full flex-col gap-4 p-2"
        >
          {orderHistory.map((order) => {
            return (
              <div
                key={order.id}
                className="flex flex-row items-center justify-between rounded-lg bg-[#FAF8F4] p-3 hover:bg-[#FAF8F4]/80"
              >
                {/* left side */}
                <div className="flex flex-col">
                  <h3 className="text-lg font-medium">
                    {order.title}
                  </h3>
                  <div className="flex gap-2 text-sm text-gray-400">
                    <span>{order.date}</span>
                    {' | '}
                    <span>{order.Quantity} Items</span>
                  </div>
                </div>

                {/* right side */}
                <span className="text-sm font-medium text-green-700">
                  {order.status}
                </span>
              </div>
            )
          })}
        </Link>
      </div>
    </div>
  )
}

export default page
