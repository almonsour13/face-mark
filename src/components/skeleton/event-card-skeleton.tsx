"use client";

import { Skeleton } from "@/components/ui/skeleton";

export default function EventCardSkeleton() {
    return (
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
    );
}
