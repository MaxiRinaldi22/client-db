"use client";

import { Skeleton } from "@/components/ui/skeleton";


export function ClientTableSkeleton() {
    const skeletonRows = Array.from({ length: 20 });

  
  return (
    <div className="w-full space-y-2">
      {skeletonRows.map((_, index) => (
        <div key={index} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <div className="flex space-x-2">
            <Skeleton className="h-10 w-16" />
            <Skeleton className="h-10 w-32" />
            <Skeleton className="h-10 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
}
