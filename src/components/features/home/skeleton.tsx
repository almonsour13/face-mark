import { Card } from "@/components/ui/card";

export function StatsSkeleton({ count = 4 }: { count?: number }) {
    return (
        <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="gap-2 animate-pulse h-28"></Card>
            ))}
        </div>
    );
}

export function AttendanceSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="w-full gap-2 animate-pulse h-28" />
            ))}
        </div>
    );
}
export function EventSkeleton({ count = 5 }: { count?: number }) {
    return (
        <div className="flex-1 flex flex-col gap-2">
            {Array.from({ length: count }).map((_, i) => (
                <Card key={i} className="w-full gap-2 animate-pulse h-32" />
            ))}
        </div>
        );
}

