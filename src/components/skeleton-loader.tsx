import { Skeleton } from "@/components/ui/skeleton";
import RoleBasedRender from "./role-based-render";
import { Card } from "./ui/card";

export function EventAttendanceSkeleton() {
    return (
        <div className="rounded-lg overflow-hidden">
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
        <div className="rounded overflow-hidden">
            <div className="flex flex-col gap-2">
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
        <div className="flex flex-col gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
                <div
                    key={i}
                    className="p-4 flex gap-4 items-start border rounded-md bg-card animate-pulse"
                >
                    {/* Profile image */}
                    <div className="h-28 w-28 shrink-0 rounded-lg overflow-hidden bg-muted relative">
                        <Skeleton className="h-full w-full" />
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-muted-foreground/10" />
                    </div>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0 space-y-2">
                                <Skeleton className="h-5 w-3/4 rounded" />{" "}
                                {/* Name */}
                                <Skeleton className="h-3 w-1/2 rounded" />{" "}
                                {/* Email */}
                            </div>
                            <Skeleton className="h-4 w-14 rounded-full" />{" "}
                            {/* Badge */}
                        </div>

                        {/* Student details */}
                        <Skeleton className="h-3 w-1/3 rounded" />

                        {/* Footer */}
                        <div className="flex items-center justify-between mt-auto">
                            <Skeleton className="h-3 w-24 rounded" />{" "}
                            {/* Joined date */}
                            <Skeleton className="h-3 w-20 rounded" />{" "}
                            {/* View profile */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
export function EventsCardSkeleton() {
    return (
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="break-inside-avoid mb-4">
                    <div className="border bg-card p-4 rounded-md flex flex-col gap-4 animate-pulse">
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
export function AttendanceSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-col">
            {Array.from({ length: 6 }).map((_, i) => (
                <div
                    key={i}
                    className="flex gap-3 bg-card border rounded-md p-4 animate-pulse"
                >
                    {/* Image (Admin only) */}
                    <RoleBasedRender allowedRoles={["admin"]}>
                        <div className="h-28 w-28 rounded overflow-hidden bg-muted flex-shrink-0">
                            <Skeleton className="h-full w-full" />
                        </div>
                    </RoleBasedRender>

                    {/* Info Section */}
                    <div className="flex-1 flex flex-col gap-3 min-w-0">
                        {/* Header */}
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex flex-col gap-1 w-full">
                                {/* Name or Event Name */}
                                <Skeleton className="h-5 w-3/4 rounded" />

                                {/* Student Details (Admin only) */}
                                <RoleBasedRender allowedRoles={["admin"]}>
                                    <Skeleton className="h-3 w-1/2 rounded" />
                                </RoleBasedRender>
                            </div>

                            {/* Badges */}
                            <div className="flex gap-2 flex-shrink-0">
                                <Skeleton className="h-4 w-12 rounded-full" />
                                <Skeleton className="h-4 w-10 rounded-full" />
                            </div>
                        </div>

                        {/* Event Link (Admin only) */}
                        <RoleBasedRender allowedRoles={["admin"]}>
                            <Skeleton className="h-3 w-1/3 rounded" />
                        </RoleBasedRender>

                        {/* Details Section */}
                        <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                            <Skeleton className="h-3 w-16 rounded" />
                            <Skeleton className="h-3 w-14 rounded" />
                            <Skeleton className="h-3 w-10 rounded" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
