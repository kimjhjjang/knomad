export default function CitiesLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-80 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="h-11 w-full max-w-xl bg-gray-200 rounded animate-pulse" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border overflow-hidden">
              <div className="h-48 bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-6 w-24 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                <div className="flex gap-2">
                  <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-6 w-12 bg-gray-200 rounded-full animate-pulse" />
                </div>
                <div className="h-10 w-full bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
