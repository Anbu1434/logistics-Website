import { cn } from "@/lib/utils";

export function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-card bg-cream-200/60",
        className
      )}
      {...props}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-cream-50 rounded-card p-3.5 border border-cream-200/80 space-y-3">
      <Skeleton className="aspect-square w-full rounded-[16px]" />
      <div className="space-y-2 pt-2">
        <Skeleton className="h-3 w-1/3 rounded-pill" />
        <Skeleton className="h-4 w-4/5 rounded-pill" />
        <Skeleton className="h-3 w-1/4 rounded-pill" />
        <Skeleton className="h-4 w-1/2 rounded-pill" />
      </div>
      <Skeleton className="h-9 w-full rounded-pill mt-2" />
    </div>
  );
}

