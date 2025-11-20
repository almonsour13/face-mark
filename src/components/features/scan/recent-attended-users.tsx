"use client";
import { AdminEventAttendanceCard } from "@/components/card/event-attendance-card";
import { EventAttendanceWrapper } from "@/components/event-attendance-wrapper";
import {
    Item,
    ItemContent,
    ItemGroup,
    ItemHeader,
    ItemMedia,
} from "@/components/ui/item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { useRef } from "react";

export default function RecentAttendedUsers() {
    const { AttendanceWrapper, eventAttendance, isEventAttendanceLoading } =
        EventAttendanceWrapper();
    const reversedAttendance = [...eventAttendance];
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    if (isEventAttendanceLoading) {
        return (
            <div className="w-full">
                <ItemGroup className="gap-2  min-h-full">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Item key={index} variant="outline">
                            <ItemMedia
                                variant="image"
                                className="h-14 w-14 overflow-hidden"
                            >
                                <Skeleton className="h-full w-full rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemHeader>
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-16" />
                                </ItemHeader>
                                <Skeleton className="h-4 w-48" />
                            </ItemContent>
                        </Item>
                    ))}
                </ItemGroup>
            </div>
        );
    }

    if (reversedAttendance.length === 0) {
        return (
            <div className="w-full flex items-center justify-center py-8 border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No attendance records yet
                </p>
            </div>
        );
    }

    return (
            <AttendanceWrapper scrollTarget="container">
                <div className="flex flex-col gap-2">
                    {reversedAttendance.map((attendance, index) => {
                        return (
                            <AdminEventAttendanceCard
                                key={index}
                                attendance={attendance}
                                className="gap-4"
                            />
                        );
                    })}
                </div>
            </AttendanceWrapper>
    );
}
