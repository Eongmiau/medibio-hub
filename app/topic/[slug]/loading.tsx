export default function TopicLoading() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="space-y-4">
        <div className="h-10 w-48 bg-slate-200 rounded-xl animate-pulse" />
        <div className="h-4 w-32 bg-slate-100 rounded animate-pulse" />
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="h-9 w-20 bg-slate-100 rounded-full animate-pulse" />
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col gap-3">
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse" />
              <div className="h-4 bg-slate-200 rounded animate-pulse w-4/5" />
              <div className="h-3 bg-slate-100 rounded animate-pulse w-3/4 mt-1" />
              <div className="h-3 bg-slate-100 rounded animate-pulse w-2/3" />
            </div>
            <div className="h-3 w-24 bg-slate-100 rounded animate-pulse" />
            <div className="h-5 w-28 bg-blue-50 rounded-full animate-pulse" />
            <div className="h-3 w-full bg-slate-100 rounded animate-pulse mt-auto" />
          </div>
        ))}
      </div>
    </main>
  )
}
