interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function LoadingSkeleton({
  className = "",
  lines = 1,
  height = "h-4",
}: LoadingSkeletonProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={`loading-skeleton rounded ${height} ${
            index === lines - 1 && lines > 1 ? "w-3/4" : "w-full"
          }`}
        />
      ))}
    </div>
  );
}

export function ArticleCardSkeleton() {
  return (
    <div className="card-responsive">
      <div className="space-y-4">
        <div className="flex justify-between items-start gap-4">
          <LoadingSkeleton height="h-6" className="flex-1" />
          <LoadingSkeleton height="h-4" className="w-24" />
        </div>
        <LoadingSkeleton lines={2} height="h-4" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="container-anthropic py-12 md:py-16">
      <div className="max-w-4xl mx-auto space-y-8">
        <LoadingSkeleton height="h-8" className="w-1/2 mx-auto" />
        <LoadingSkeleton lines={3} height="h-4" className="max-w-2xl mx-auto" />
        <div className="space-y-6">
          {Array.from({ length: 3 }).map((_, index) => (
            <ArticleCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
