export default function OrderListSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true" aria-label="Loading orders">
      {/* Filter tab skeletons */}
      <div className="mb-6 flex gap-2">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="h-9 w-24 animate-pulse rounded-full bg-gray-200"
          />
        ))}
      </div>
      {/* Card skeletons */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-64 w-full animate-pulse rounded-2xl bg-gray-100"
        />
      ))}
    </div>
  );
}
