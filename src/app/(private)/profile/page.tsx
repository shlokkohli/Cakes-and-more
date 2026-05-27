const page = () => {
  return (
    <div className="w-full rounded-lg border-gray-300 bg-white p-4 shadow-sm shadow-black/10">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">
          Profile Information
        </h1>

        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <label>Name</label>
            <input
              type="text"
              className="rounded-md border border-gray-300 p-1"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label>Email</label>
            <input
              type="email"
              className="rounded-md border border-gray-300 p-1"
            />
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Phone</h3>
          <div className="flex gap-2 text-base text-gray-600">
            <span className="rounded-lg border border-gray-200 p-1">
              +91-9599662596
            </span>
            <span className="flex items-center justify-center rounded-full bg-green-500/50 px-2 text-xs text-green-900">
              Verified
            </span>
          </div>
        </div>

        <button className="rounded-lg bg-black p-2 text-white hover:bg-black/80">
          Save Changes
        </button>
      </div>
    </div>
  )
}

export default page
