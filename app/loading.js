import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Form skeleton */}
        <div className="w-full md:w-1/2 space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
        
        {/* Preview skeleton */}
        <div className="w-full md:w-1/2 space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-80 w-full" />
          <div className="flex justify-end space-x-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}