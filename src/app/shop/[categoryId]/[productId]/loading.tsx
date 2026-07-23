export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Image skeleton */}
            <div className="aspect-square animate-pulse rounded-2xl bg-gray-200" />

            {/* Info skeleton */}
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-6 w-1/4 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-4 w-1/3 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-24 animate-pulse rounded-lg bg-gray-200" />
              <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
              <div className="h-12 w-full animate-pulse rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
