export function PageHeader() {
  return (
    <div className="mb-8 sm:mb-12">
      <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 px-4 py-2">
        <span className="text-sm font-semibold text-emerald-700">
          📦 Your Orders
        </span>
      </div>
      <h1 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
        <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
          Order History
        </span>
      </h1>
      <p className="text-base text-gray-600 sm:text-lg">
        Track and manage all your orders in one place
      </p>
    </div>
  );
}
