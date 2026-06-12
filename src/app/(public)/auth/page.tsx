const page = () => {
  return (
    <div className="bg-red-500">
      <div>
        <h1 className="text-3xl font-bold">
          Sign in to your account
        </h1>
        <div>
          <h3>Mobile Number</h3>
          <input
            type="tel"
            className="p-2"
          />
        </div>
      </div>
    </div>
  )
}

export default page
