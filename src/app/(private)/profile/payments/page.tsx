import { CreditCard } from 'lucide-react'

const page = () => {
  return (
    <div className="flex w-full flex-col rounded-lg border-gray-300 bg-white p-4 shadow-sm shadow-black/10">
      <div>
        <h1 className="text-xl font-semibold">
          Payment Methods
        </h1>

        <div className="align-center mt-4 flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-gray-300 p-10 text-gray-500">
          <CreditCard
            height={50}
            width={50}
            className="text-gray-500"
          />
          <p>No payment methods saved</p>
          <button className="rounded-lg bg-[#FAF8F5] p-2 hover:bg-[#FAF8F5]/50">
            Add Payment Method
          </button>
        </div>
      </div>
    </div>
  )
}

export default page
