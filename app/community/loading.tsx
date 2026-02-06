export default function CommunityLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="h-10 w-36 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-5 w-64 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-8 w-16 bg-gray-200 rounded-full animate-pulse" />
            ))}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white rounded-lg border p-5 space-y-2">
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="flex gap-3">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 w-12 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
