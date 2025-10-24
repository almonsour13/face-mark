"use client";

import CreateEventDialog from "@/components/dialog/create-event-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEvents } from "@/hooks/event/use-events";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import {
    Calendar,
    Clock,
    MapPin,
    MoreHorizontal,
    Filter,
    ArrowUpDown,
} from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
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
import { useEventStore } from "@/store/use-event-store";
import { useDeferredValue, useEffect, useState } from "react";
import { eventStatus } from "@/constant";
import { useEventTypes } from "@/hooks/event/use-event-type";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/use-debounce";
import EventCardSkeleton from "@/components/skeleton/event-card-skeleton";

export default function Page() {
    const [search, setSearch] = useState("");
    const [status, setStatus] = useState("0");
    const [type, setType] = useState("all");
    const [sortBy, setSortBy] = useState<
        "date-asc" | "date-desc" | "name-asc" | "name-desc"
    >("date-desc");

    const debouncedSearch = useDebounce(search, 500);

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
    }, [eventsData, isEventsLoading, setEvents, setIsEventsLoading]);

    const hasActiveFilters = status !== "0" || type !== "all";
    const isSearching = search !== debouncedSearch;

    return (
        <div className="w-full flex flex-col h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b shrink-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Event</h1>
                </div>
                <CreateEventDialog />
            </div>
            <div className="p-4 md:p-6 flex flex-col gap-8">
                <div className="flex gap-2">
                    <Input
                        type="search"
                        placeholder="Search Events Name | location | description | type"
                        className="max-w-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild className={`${hasActiveFilters && "bg-primary/30 dark:bg-primary/30 "}`}>
                            <Button variant="outline" className={`relative `}>
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
                                                              key={eventType.id}
                                                              onCheckedChange={() =>
                                                                  setType(
                                                                      eventType.id
                                                                  )
                                                              }
                                                          >
                                                              {eventType.name}
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
                                <DropdownMenuLabel>Status:</DropdownMenuLabel>
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
                                            {Object.entries(eventStatus).map(
                                                ([key, value]) => (
                                                    <DropdownMenuCheckboxItem
                                                        checked={status === key}
                                                        key={key}
                                                        onCheckedChange={() =>
                                                            setStatus(key)
                                                        }
                                                    >
                                                        {value}
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            )}
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
                                onCheckedChange={() => setSortBy("date-desc")}
                            >
                                Date (Newest First)
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortBy === "date-asc"}
                                onCheckedChange={() => setSortBy("date-asc")}
                            >
                                Date (Oldest First)
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortBy === "name-asc"}
                                onCheckedChange={() => setSortBy("name-asc")}
                            >
                                Name (A-Z)
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem
                                checked={sortBy === "name-desc"}
                                onCheckedChange={() => setSortBy("name-desc")}
                            >
                                Name (Z-A)
                            </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {isEventsLoading || isSearching ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="break-inside-avoid mb-4">
                                <EventCardSkeleton />
                            </div>
                        ))}
                    </div>
                ) : events.length > 0 ? (
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
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
                                                        {event.eventType.name}
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
                                                            onClick={(e) => {
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
                                                            {session.startTime}{" "}
                                                            ~ {session.endTime}
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
    );
}
