"use client";

import { EventCard } from "@/components/card/event-card";
import CreateEventDialog from "@/components/dialog/create-event-dialog";
import EventFilter from "@/components/filter/event-filter";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import LoadMoreWrapper from "@/components/load-more-wrapper";
import PageWrapper from "@/components/page-wrapper";
import RoleBasedRender from "@/components/role-based-render";
import { EventsCardSkeleton } from "@/components/skeleton-loader";
import { Button } from "@/components/ui/button";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { useEvents } from "@/hooks/query/event/use-events";
import useResponsiveEventGrid from "@/hooks/use-responsive-event-grid";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { EventWithSessions, useEventStore } from "@/store/use-event-store";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

export default function AdminEventPage() {
    const [isSortAsPriority, setIsSortAsPriority] = useState(true);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [totalStudents, setTotalStudents] = useState(0);

    const {
        events,
        setEvents,
        setIsEventsLoading,
        isEventsLoading,
        addMoreEvents,
    } = useEventStore();

    const { filters } = useUrlFilter();

    const { data: eventsData } = useEvents({ filters, nextCursor });

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setEvents([]);
        setHasMore(false);
        setIsEventsLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setEvents]);

    useEffect(() => {
        if (!eventsData?.events) return;

        if (nextCursor === null) {
            setEvents(eventsData.events);
            setIsEventsLoading(false);
        } else {
            addMoreEvents(eventsData.events);
        }
        if (eventsData.totalStudents) {
            setTotalStudents(eventsData.totalStudents);
        }
        setHasMore(eventsData.hasMore || false);
        setIsLoadingMore(false);
    }, [eventsData, nextCursor, setEvents, setIsEventsLoading, addMoreEvents, setTotalStudents]);

    const handleLoadMore = () => {
        if (!eventsData?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);
        setTimeout(() => {
            if (!eventsData?.nextCursor) return;
            setNextCursor(eventsData.nextCursor);
        }, 500);
    };

    const { column1, column2, column3 } = useResponsiveEventGrid(events);

    return (
        <div className="w-full min-h-screen flex flex-col flex-1">
            <Header title="Event">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>Event</HeaderTitle>
                    </div>
                    <RoleBasedRender allowedRoles={["admin"]}>
                        <CreateEventDialog />
                    </RoleBasedRender>
                </div>
            </Header>
            <PageWrapper>
                <EventFilter />
                {isEventsLoading ? (
                    <EventsCardSkeleton />
                ) : events.length > 0 ? (
                    <>
                        {/* <LoadMoreWrapper
                            hasMore={hasMore}
                            isLoading={isLoadingMore}
                            loadMore={handleLoadMore}
                            loadingStateMessage="loading more events..."
                        >
                            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 ">
                                {events.map((event, index) => (
                                    <EventCard
                                        key={event.id}
                                        event={event}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </LoadMoreWrapper> */}
                        <LoadMoreWrapper
                            hasMore={hasMore}
                            isLoading={isLoadingMore}
                            loadMore={handleLoadMore}
                            loadingStateMessage="loading more events..."
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {[column1, column2, column3].map(
                                    (col, idx) =>
                                        col.length > 0 && (
                                            <div
                                                key={idx}
                                                className="flex flex-col gap-4"
                                            >
                                                {col.map((event) => (
                                                    <EventCard
                                                        key={event.id}
                                                        event={event}
                                                        totalStudents={
                                                            totalStudents
                                                        }
                                                    />
                                                ))}
                                            </div>
                                        )
                                )}
                            </div>
                        </LoadMoreWrapper>
                    </>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyMedia variant="icon"></EmptyMedia>
                            <EmptyTitle>No Event Yet</EmptyTitle>
                            <EmptyDescription>
                                You haven&apos;t created any events yet. Get
                                started by creating your first event.
                            </EmptyDescription>
                        </EmptyHeader>
                        <EmptyContent>
                            <CreateEventDialog />
                        </EmptyContent>
                    </Empty>
                )}
            </PageWrapper>
        </div>
    );
}
