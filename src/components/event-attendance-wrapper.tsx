"use client";

import { useEventAttendance } from "@/hooks/query/event/use-event-attendace";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import LoadMoreWrapper from "./load-more-wrapper";

interface EventAttendanceWrapperProps {
    children: React.ReactNode;
    scrollTarget?: "window" | "container";
    loadingStateMessage?: string;
}
export function EventAttendanceWrapper() {
    const eventId = useParams().eventId as string;
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();

    const { data } = useEventAttendance({
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
        if (!data?.attendance) return;

        if (nextCursor === null) {
            setEventAttendance(data.attendance);
            setEventAttendanceLoading(false);
        } else {
            addMoreEventAttendance(data.attendance);
        }
        setHasMore(data.hasMore || false);
        setIsLoadingMore(false);
    }, [
        data,
        nextCursor,
        setEventAttendance,
        setEventAttendanceLoading,
        addMoreEventAttendance,
    ]);

    const handleLoadMore = () => {
        if (!data?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);
        setTimeout(() => {
            if (!data?.nextCursor) return;
            setNextCursor(data.nextCursor);
        }, 500);
    };

    const AttendanceWrapper = ({
        children,
        scrollTarget,
        loadingStateMessage = "loading more event attendance...",
    }: EventAttendanceWrapperProps) => {
        return (
            <LoadMoreWrapper
                hasMore={hasMore}
                isLoading={isLoadingMore}
                loadMore={handleLoadMore}
                loadingStateMessage={loadingStateMessage}
                scrollTarget={scrollTarget}
            >
                {children}
            </LoadMoreWrapper>
        );
    };
    return {
        AttendanceWrapper,
        eventAttendance,
        isEventAttendanceLoading,
    };
}
