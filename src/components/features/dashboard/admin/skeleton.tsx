import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="gap-2 animate-pulse h-28"></Card>
            ))}
        </div>
    );
}
export function DistributionSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="gap-2 animate-pulse h-full"></Card>
            ))}
        </div>
    );
}
export function CoursePerformanceSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="gap-2 animate-pulse h-28"></Card>
            ))}
        </div>
    );
}
export function RecentEventPerformanceSKeleton({
    count = 5,
}: {
    count?: number;
}) {
    return (
        <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="gap-2 animate-pulse h-full"></Card>
            ))}
        </div>
    );
}
export function TopUsertPerformanceSKeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="p-4 flex gap-4 items-start flex-row">
                    <Skeleton className="h-12 w-12 rounded-full" />

                    <div className="flex flex-col gap-2 flex-1">
                        <div className="flex flex-col gap-1">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-3 w-32" />
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            <Skeleton className="h-16 w-full rounded-md" />
                            <Skeleton className="h-16 w-full rounded-md" />
                            <Skeleton className="h-16 w-full rounded-md" />
                            <Skeleton className="h-16 w-full rounded-md" />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
export function AttendanceOverviewSKeleton({ count = 5 }: { count?: number }) {
    return (
         <Card className="flex-1 p-4">
            <div className="flex flex-col md:flex-row items-start gap-4">

                {/* Pie Chart Skeleton */}
                <div className="flex-1 rounded-md border p-4 flex items-center justify-center">
                    <Skeleton className="aspect-square h-40 md:h-52 rounded-full" />
                </div>

                {/* Right Section */}
                <div className="h-full w-full flex flex-col gap-3">

                    {/* Stats */}
                    <div className="w-full flex gap-2">
                        {[1, 2, 3].map((i) => (
                            <div
                                key={i}
                                className="flex-1 p-3 flex flex-col border rounded-md gap-2"
                            >
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-6 w-10" />
                            </div>
                        ))}
                    </div>

                    {/* Methods List */}
                    <div className="h-full hidden md:flex flex-col gap-4 p-4 rounded-md border">
                        {[1, 2].map((i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <Skeleton className="h-3 w-24" />
                                    <Skeleton className="h-3 w-10" />
                                </div>

                                <Skeleton className="h-2 w-full rounded-full" />

                                <Skeleton className="h-3 w-20" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Card>
    );
}
export function EventOverviewSKeleton({ count = 5 }: { count?: number }) {
    return (
            <Card className="p-4">
            <div className="flex flex-col md:flex-row items-start gap-4">

                {/* Pie Chart Section */}
                <div className="rounded-md border p-4 flex items-center justify-center">
                    <Skeleton className="aspect-square h-40 md:h-52 rounded-full" />
                </div>

                {/* Right Side: Event Progress List */}
                <div className="flex-1 w-full h-full flex flex-col gap-3">

                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="space-y-2 h-full border rounded-md p-4"
                        >
                            <div className="flex items-center justify-between">
                                <Skeleton className="h-3 w-24" />
                                <Skeleton className="h-3 w-12" />
                            </div>

                            <Skeleton className="h-2 w-full rounded-full" />
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}

