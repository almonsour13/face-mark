"use client";

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { useEventAttendance } from "@/hooks/query/event/use-event-attendace";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import EventAttendanceCard from "../card/event-attendance-card";
import AttendanceFilter from "../filter/attendance-filter";
import LoadMoreWrapper from "../load-more-wrapper";
import { EventAttendanceSkeleton } from "../skeleton-loader";

export default function EventAttendanceList() {
    const eventId = useParams().eventId as string;
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();
    const { data: eventAttendanceData, } =
        useEventAttendance({
            eventId,
            filters,
            nextCursor,
        });
    const {
        eventAttendance,
        setEventAttendance,
        isEventAttendanceLoading,
        setEventAttendanceLoading,
        addMoreEventAttendance,
    } = useEventAttendanceStore();

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setEventAttendance([]);
        setHasMore(false);
        setEventAttendanceLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setEventAttendance]);

    useEffect(() => {
        if (!eventAttendanceData?.attendance) return;

        if (nextCursor === null) {
            setEventAttendance(eventAttendanceData.attendance);
            setEventAttendanceLoading(false);
        } else {
            addMoreEventAttendance(eventAttendanceData.attendance);
        }
        setHasMore(eventAttendanceData.hasMore || false);
        setIsLoadingMore(false);
    }, [
        eventAttendanceData,
        nextCursor,
        setEventAttendance,
        setEventAttendanceLoading,
        addMoreEventAttendance,
    ]);

    const handleLoadMore = () => {
        if (!eventAttendanceData?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);
        setTimeout(() => {
            if (!eventAttendanceData?.nextCursor) return;
            setNextCursor(eventAttendanceData.nextCursor);
        }, 500);
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-lg font-light">Attendance Records</h2>
                <AttendanceFilter />
            </div>

            {/* Table Content */}
            {isEventAttendanceLoading ? (
                <EventAttendanceSkeleton />
            ) : eventAttendance && eventAttendance.length > 0 ? (
                <LoadMoreWrapper
                    hasMore={hasMore}
                    isLoading={isLoadingMore}
                    loadMore={handleLoadMore}
                    loadingStateMessage="loading more event attendance..."
                >
                    <div className="flex flex-col gap-2">
                        {eventAttendance.map((attendance) => (
                            <EventAttendanceCard
                                key={attendance.id}
                                attendance={attendance}
                            />
                        ))}
                    </div>
                </LoadMoreWrapper>
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>No Attendance Yet</EmptyTitle>
                        <EmptyDescription>
                            Event doesn&apos;t have any attendance yet.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </div>
    );
}
