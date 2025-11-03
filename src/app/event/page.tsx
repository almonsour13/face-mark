"use client";

import { EventCard } from "@/components/card/event-card";
import CreateEventDialog from "@/components/dialog/create-event-dialog";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";
import RoleBasedRender from "@/components/role-based-render";
import { EventsCardSkeleton } from "@/components/skeleton-loader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { eventStatus } from "@/constant";
import { useEventTypes } from "@/hooks/query/event/use-event-type";
import { useEvents } from "@/hooks/query/event/use-events";
import { useDebounce } from "@/hooks/use-debounce";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
import { useEventStore } from "@/store/use-event-store";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { format } from "date-fns";
import {
    ArrowUpDown,
    Calendar,
    Clock,
    ListFilter,
    MapPin,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export type SortByType = "date-asc" | "date-desc" | "name-asc" | "name-desc";

export default function AdminEventPage() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("0");
    const [type, setType] = useState("all");
    const [sortBy, setSortBy] = useState("date-desc");

    const debouncedSearch = useDebounce(search, 500);

    useUpdateQueryParams(
        "/event",
        { search, status, type, sortBy },
        { search: "", status: "0", type: "all", sortBy: "date-desc" },
        { replace: true }
    );

    useSyncQueryParams({
        params: {
            search: [search, setSearch],
            status: [status, setStatus],
            type: [type, setType],
            sortBy: [sortBy, setSortBy],
        },
    });
    const { events, setEvents, setIsEventsLoading, isEventsLoading } =
        useEventStore();

    const { data: eventTypes } = useEventTypes();

    const { data: eventsData, isPending } = useEvents({
        type,
        status,
        sortBy,
        search: debouncedSearch,
    });

    useEffect(() => {
        setIsEventsLoading(isPending);
        if (eventsData?.events) {
            setEvents(eventsData.events);
        }
    }, [eventsData, isEventsLoading, setEvents, setIsEventsLoading, isPending]);

    const hasActiveFilters = [status !== "0" || type !== "all"].filter(Boolean);
    const isSearching = search !== debouncedSearch;

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
                <div className="flex gap-2 items-center justify-between">
                    <Input
                        type="search"
                        placeholder="Search events by name, location, or description..."
                        className="w-full md:w-sm bg-card"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant={
                                        hasActiveFilters.length > 0
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    <ListFilter />
                                    Filter
                                    {hasActiveFilters.length > 0 && (
                                        <div className="h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                                            <span className="font-medium text-xs text-primary">
                                                {hasActiveFilters.length}
                                            </span>
                                        </div>
                                    )}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>Type:</DropdownMenuLabel>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            {eventTypes &&
                                            eventTypes.eventTypes.length > 0
                                                ? eventTypes.eventTypes.find(
                                                      (eventType) =>
                                                          eventType.id === type
                                                  )?.name || "All"
                                                : "All"}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuCheckboxItem
                                                    checked={type === "all"}
                                                    onCheckedChange={() =>
                                                        setType("all")
                                                    }
                                                >
                                                    All
                                                </DropdownMenuCheckboxItem>
                                                {eventTypes &&
                                                eventTypes.eventTypes.length > 0
                                                    ? eventTypes.eventTypes.map(
                                                          (eventType) => (
                                                              <DropdownMenuCheckboxItem
                                                                  checked={
                                                                      type ===
                                                                      eventType.id
                                                                  }
                                                                  key={
                                                                      eventType.id
                                                                  }
                                                                  onCheckedChange={() =>
                                                                      setType(
                                                                          eventType.id
                                                                      )
                                                                  }
                                                              >
                                                                  {
                                                                      eventType.name
                                                                  }
                                                              </DropdownMenuCheckboxItem>
                                                          )
                                                      )
                                                    : null}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>
                                        Status:
                                    </DropdownMenuLabel>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            {eventStatusValue[Number(status)] ||
                                                "All"}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuCheckboxItem
                                                    checked={status === "0"}
                                                    onCheckedChange={() =>
                                                        setStatus("0")
                                                    }
                                                >
                                                    All
                                                </DropdownMenuCheckboxItem>
                                                {Object.entries(
                                                    eventStatus
                                                ).map(([key, value]) => (
                                                    <DropdownMenuCheckboxItem
                                                        checked={status === key}
                                                        key={key}
                                                        onCheckedChange={() =>
                                                            setStatus(key)
                                                        }
                                                    >
                                                        {value}
                                                    </DropdownMenuCheckboxItem>
                                                ))}
                                            </DropdownMenuSubContent>
                                        </DropdownMenuPortal>
                                    </DropdownMenuSub>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="bg-transparent flex-1 sm:flex-none"
                                >
                                    <ArrowUpDown className="w-4 h-4" />
                                    Sort
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem
                                    checked={sortBy === "date-desc"}
                                    onCheckedChange={() =>
                                        setSortBy("date-desc")
                                    }
                                >
                                    Date (Newest First)
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={sortBy === "date-asc"}
                                    onCheckedChange={() =>
                                        setSortBy("date-asc")
                                    }
                                >
                                    Date (Oldest First)
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={sortBy === "name-asc"}
                                    onCheckedChange={() =>
                                        setSortBy("name-asc")
                                    }
                                >
                                    Name (A-Z)
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem
                                    checked={sortBy === "name-desc"}
                                    onCheckedChange={() =>
                                        setSortBy("name-desc")
                                    }
                                >
                                    Name (Z-A)
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
                {isEventsLoading || isSearching ? (
                    <EventsCardSkeleton />
                ) : events.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                        {events.map((event) => (
                            <EventCard key={event.id} event={event} />
                        ))}
                    </div>
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
