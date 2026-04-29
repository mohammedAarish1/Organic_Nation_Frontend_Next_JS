const WishlistSkeleton = () => (
  <div className="min-h-screen py-8">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="mb-3 aspect-square animate-pulse rounded-lg bg-gray-200" />
            <div className="mb-2 h-4 animate-pulse rounded bg-gray-200" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default WishlistSkeleton;
