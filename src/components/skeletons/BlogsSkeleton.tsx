export function BlogsSkeleton({ length = 3 }: { length?: number }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="overflow-hidden rounded-3xl bg-white shadow-md">
              <div className="aspect-16/10 bg-gray-200" />
              <div className="p-6">
                <div className="mb-4 h-4 w-24 rounded bg-gray-200" />
                <div className="mb-4 h-6 w-full rounded bg-gray-200" />
                <div className="mb-2 h-4 w-full rounded bg-gray-200" />
                <div className="mb-6 h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-10 w-32 rounded-full bg-gray-200" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
