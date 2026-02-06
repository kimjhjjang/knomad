export default function CityDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-64 md:h-80 bg-gray-200 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-10 w-full bg-gray-200 rounded animate-pulse mb-8" />
        <div className="space-y-6">
          <div className="h-24 bg-gray-200 rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded animate-pulse" />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-48 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
