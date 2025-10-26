"use client";

import CreateEventDialog from "@/components/dialog/create-event-dialog";
import Header from "@/components/header";
import HeaderTitle from "@/components/nav-header-title";
import EventCardSkeleton from "@/components/skeleton/event-card-skeleton";
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
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { eventStatus } from "@/constant";
import { useEventTypes } from "@/hooks/event/use-event-type";
import { useEvents } from "@/hooks/event/use-events";
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
    Filter,
    MapPin,
    MoreHorizontal,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Suspense } from "react";

export type SortByType = "date-asc" | "date-desc" | "name-asc" | "name-desc";
export default function Page() {
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
            console.log("Events:", eventsData.events);
            setEvents(eventsData.events);
        }
    }, [eventsData, isEventsLoading, setEvents, setIsEventsLoading, isPending]);

    const hasActiveFilters = status !== "0" || type !== "all";
    const isSearching = search !== debouncedSearch;

    return (
        <Suspense>
            <div className="w-full flex flex-col min-h-screen relative">
                <Header title="Event">
                    <div className="w-full mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <HeaderTitle>Event</HeaderTitle>
                        </div>
                        <CreateEventDialog />
                    </div>
                </Header>
                <div className="p-4 md:p-6 flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Input
                            type="search"
                            placeholder="Search Events Name | location | description | type"
                            className="max-w-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                asChild
                                className={`${
                                    hasActiveFilters &&
                                    "bg-primary/30 dark:bg-primary/30 "
                                }`}
                            >
                                <Button
                                    variant="outline"
                                    className={`relative `}
                                >
                                    <Filter className="w-4 h-4" />
                                    Filter
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
                                <Button variant="outline">
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
                    {isEventsLoading || isSearching ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="break-inside-avoid mb-4"
                                >
                                    <EventCardSkeleton />
                                </div>
                            ))}
                        </div>
                    ) : events.length > 0 ? (
                        <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
                            {events.map((event) => (
                                <Link
                                    key={event.id}
                                    href={`/event/${event.id}`}
                                    className="break-inside-avoid block mb-4"
                                >
                                    <div className="border p-4 rounded-md hover:bg-muted/50 flex flex-col gap-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="w-full flex items-start justify-between">
                                                <h1 className="text-lg font-medium">
                                                    {event.name}
                                                </h1>
                                                <div className="flex items-center gap-2">
                                                    {event.eventType && (
                                                        <Badge className="h-5 flex items-center">
                                                            {
                                                                event.eventType
                                                                    .name
                                                            }
                                                        </Badge>
                                                    )}
                                                    <Badge className="h-5 flex items-center">
                                                        {
                                                            eventStatusValue[
                                                                event.status
                                                            ]
                                                        }
                                                    </Badge>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger
                                                            asChild
                                                        >
                                                            <Button
                                                                role="button"
                                                                aria-label="More"
                                                                variant="ghost"
                                                                size="icon-sm"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                }}
                                                            >
                                                                <MoreHorizontal className="w-4 h-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                            }}
                                                        >
                                                            <DropdownMenuItem>
                                                                View Details
                                                                <DropdownMenuShortcut>
                                                                    ⇧⌘P
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Edit
                                                                <DropdownMenuShortcut>
                                                                    ⇧⌘P
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem>
                                                                Delete
                                                                <DropdownMenuShortcut>
                                                                    ⇧⌘P
                                                                </DropdownMenuShortcut>
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 text-xs text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span>
                                                        {format(
                                                            event.eventDate,
                                                            "MMM dd, yyyy"
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span>
                                                        {event.location ||
                                                            "No location specified"}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        {event.description && (
                                            <div className="text-sm">
                                                <p>{event.description}</p>
                                            </div>
                                        )}
                                        <div className="flex flex-col gap-2">
                                            {event.eventSessions.map(
                                                (session, index) => (
                                                    <div
                                                        key={index}
                                                        className="px-3 py-2.5 rounded-md flex items-center justify-between text-sm border"
                                                    >
                                                        <span className="font-medium text-foreground">
                                                            {
                                                                eventSessionTypeValue[
                                                                    session.type
                                                                ]
                                                            }
                                                        </span>
                                                        <div className="flex items-center gap-1 text-muted-foreground text-xs">
                                                            <Clock className="w-3 h-3" />
                                                            <span>
                                                                {
                                                                    session.startTime
                                                                }{" "}
                                                                ~{" "}
                                                                {
                                                                    session.endTime
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="">
                            <p className="text-muted-foreground">
                                No events found matching the selected filters.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Suspense>
    );
}
