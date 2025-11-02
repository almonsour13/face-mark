import { Skeleton } from "@/components/ui/skeleton";

export function EventAttendanceSkeleton() {
    return (
        <div className="rounded-lg border overflow-hidden">
            <div className="flex flex-col gap-2">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div
                        key={i}
                        className="border rounded-lg p-4 hover:bg-muted/30 transition-colors"
                    >
                        <div className="flex gap-4">
                            {/* Profile image */}
                            <div className="h-28 w-28 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                                <Skeleton className="h-full w-full" />
                            </div>

                            {/* Right content */}
                            <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
                                {/* Header: name + badges */}
                                <div className="flex items-start justify-between gap-4 mb-2">
                                    <Skeleton className="h-5 w-40" />
                                    <div className="flex gap-2 shrink-0">
                                        <Skeleton className="h-5 w-12 rounded-md" />
                                        <Skeleton className="h-5 w-12 rounded-md" />
                                    </div>
                                </div>

                                {/* Time + status */}
                                <div className="flex items-center justify-between gap-4 mb-2">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-14" />
                                </div>

                                {/* Student details */}
                                <div className="space-y-1.5">
                                    <Skeleton className="h-3 w-16" />
                                    <Skeleton className="h-3 w-40" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export function UserAttendanceSkeleton() {
    return (
        <div className="rounded overflow-hidden bg-card">
            <div className="flex flex-col gap-3">
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border p-4 rounded-md">
                        <div className="flex flex-col gap-2">
                            {/* Header with event name and badges */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <Skeleton className="h-5 w-48 mb-2" />
                                    <Skeleton className="h-4 w-32" />
                                </div>

                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-12 rounded-md" />
                                    <Skeleton className="h-5 w-12 rounded-md" />
                                </div>
                            </div>

                            {/* Session and status details */}
                            <div className="flex justify-between gap-3 items-center">
                                <Skeleton className="h-4 w-28" />

                                <div className="flex items-center gap-4">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-14" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export function UsersCardSkeleton() {
    return (
        <div className="rounded-lg border overflow-hidden bg-card">
            <div className="flex flex-col divide-y">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div
                        key={i}
                        className="p-4 flex gap-4 items-start hover:bg-muted/30 transition-colors"
                    >
                        {/* Profile image */}
                        <Skeleton className="h-28 w-28 shrink-0 rounded-lg" />

                        {/* Text content */}
                        <div className="flex-1 min-w-0 space-y-2">
                            {/* Name and Role */}
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <div className="space-y-2">
                                    <Skeleton className="h-5 w-40" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                                <Skeleton className="h-5 w-16 rounded-md" />
                            </div>

                            {/* Course */}
                            <Skeleton className="h-4 w-48" />

                            {/* Level + Date */}
                            <div className="flex items-center justify-between mt-2">
                                <Skeleton className="h-3 w-20" />
                                <Skeleton className="h-3 w-24" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export function EventsCardSkeleton() {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-6">
                    <div className="border p-4 rounded-md flex flex-col gap-4 animate-pulse">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center">
                                <Skeleton className="h-5 w-1/2" />
                                <div className="flex gap-2">
                                    <Skeleton className="h-5 w-12 rounded-full" />
                                    <Skeleton className="h-5 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-6 rounded-md" />
                                </div>
                            </div>
                            <div className="flex gap-2 text-xs text-muted-foreground">
                                <Skeleton className="h-4 w-28" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>

                        <Skeleton className="h-3 w-full" />
                        <Skeleton className="h-3 w-4/5" />

                        <div className="flex flex-col gap-2">
                            {[1, 2].map((i) => (
                                <div
                                    key={i}
                                    className="px-3 py-2.5 rounded-md flex items-center justify-between text-sm border"
                                >
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
