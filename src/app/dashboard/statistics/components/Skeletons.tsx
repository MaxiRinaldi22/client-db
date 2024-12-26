import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function StatisticsCardsSkeleton() {
  return (
    <div className="grid gap-4 h-[122px] md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="bg-gray-100 dark:bg-gray-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-[80px]" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function ClientChartSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent className="pt-2 h-[calc(100%-4rem)]">
        <div className="h-full flex items-end space-x-2">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} className="w-full h-[30%] sm:h-[40%] md:h-[60%] lg:h-[80%]" />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function RecentClientsSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader>
        <Skeleton className="h-6 w-[200px]" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="flex justify-between items-center">
              <div className="space-y-2">
                <Skeleton className="h-4 w-[150px]" />
                <Skeleton className="h-3 w-[100px]" />
              </div>
              <Skeleton className="h-4 w-[80px]" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
