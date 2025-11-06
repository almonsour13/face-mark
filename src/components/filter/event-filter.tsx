"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { eventStatus, sortBy } from "@/constant";
import { useEventTypes } from "@/hooks/query/event/use-event-type";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { ArrowUpDown, ListFilter } from "lucide-react";

export default function EventFilter() {
    const { data: eventTypes } = useEventTypes();

    const { filters, setFilter, hasActiveFilters } =
        useUrlFilter({
            defaultValue: {
                sortBy: "date-desc",
            },
        });

    return (
        <div className="flex gap-2 items-center justify-between w-full ">
            <Input
                type="search"
                placeholder="Search events by name, location, or description..."
                className="w-full md:w-sm bg-card"
                value={filters.search || ""}
                onChange={(e) => setFilter("search", e.target.value)}
                // onInput={(e) => setSearchValuee.target.value)}
            />

            <div className="flex gap-2">
                {/* 🔹 Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={
                                hasActiveFilters > 0 ? "default" : "outline"
                            }
                            className="relative"
                        >
                            <ListFilter className="w-4 h-" />
                            Filter
                            {hasActiveFilters > 0 && (
                                <div className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                                    <span className="font-medium text-xs text-primary">
                                        {hasActiveFilters}
                                    </span>
                                </div>
                            )}
                        </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                        {/* 🔸 Type Filter */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Type:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {eventTypes &&
                                    eventTypes.eventTypes.length > 0
                                        ? eventTypes.eventTypes.find(
                                              (eventType) =>
                                                  eventType.name ===
                                                  filters.type
                                          )?.name || "All"
                                        : "All"}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem
                                            checked={filters.type === "all"}
                                            onCheckedChange={() =>
                                                setFilter("type", "all")
                                            }
                                        >
                                            All
                                        </DropdownMenuCheckboxItem>
                                        {eventTypes?.eventTypes.map(
                                            (eventType) => (
                                                <DropdownMenuCheckboxItem
                                                    key={eventType.id}
                                                    checked={
                                                        filters.type ===
                                                        eventType.name
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter(
                                                            "type",
                                                            eventType.name
                                                        )
                                                    }
                                                >
                                                    {eventType.name}
                                                </DropdownMenuCheckboxItem>
                                            )
                                        )}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>

                        <DropdownMenuSeparator />

                        {/* 🔸 Status Filter */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Status:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {eventStatus[Number(filters.status)] ||
                                        "All"}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem
                                            checked={filters.status === "0"}
                                            onCheckedChange={() =>
                                                setFilter("status", "0")
                                            }
                                        >
                                            All
                                        </DropdownMenuCheckboxItem>
                                        {Object.entries(eventStatus).map(
                                            ([key, value]) => (
                                                <DropdownMenuCheckboxItem
                                                    key={key}
                                                    checked={
                                                        filters.status === key
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter("status", key)
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

                {/* 🔹 Sort Dropdown */}
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
                        {Object.entries(sortBy).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                checked={filters.sortBy === key}
                                onCheckedChange={() => setFilter("sortBy", key)}
                            >
                                {value}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
