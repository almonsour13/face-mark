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
import {
    attendanceStatus,
    attendanceType,
    eventSessionType,
    sortBy
} from "@/constant";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { ArrowUpDown, ListFilter } from "lucide-react";

export default function UserAttendancesFilter() {
    const { filters, setFilter, hasActiveFilters } = useUrlFilter({
        defaultValue: {
            sortBy: "date-desc",
        },
    });
    const selectedSession = filters.session || "all";

    return (
        <div className="flex gap-2 items-center justify-between">
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
                        {/* 🔸 Type Session */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Session:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {selectedSession === "all"
                                        ? "All"
                                        : eventSessionType[
                                              parseInt(selectedSession)
                                          ] || "All"}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem
                                            checked={filters.type === "all"}
                                            onCheckedChange={() =>
                                                setFilter("session", "all")
                                            }
                                        >
                                            All
                                        </DropdownMenuCheckboxItem>
                                        {Object.entries(eventSessionType).map(
                                            ([key, value]) => (
                                                <DropdownMenuCheckboxItem
                                                    key={key}
                                                    checked={
                                                        filters.session === key
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter(
                                                            "session",
                                                            key
                                                        )
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

                        <DropdownMenuSeparator />

                        {/* 🔸 Type Filter */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Type:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {attendanceType[parseInt(filters.type)] ||
                                        "All"}
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
                                        {Object.entries(attendanceType).map(
                                            ([key, value]) => (
                                                <DropdownMenuCheckboxItem
                                                    key={key}
                                                    checked={
                                                        filters.type === key
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter("type", key)
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

                        <DropdownMenuSeparator />

                        {/* 🔸 Status Filter */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Status:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {attendanceStatus[
                                        parseInt(filters.status)
                                    ] || "All"}
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
                                        {Object.entries(attendanceStatus).map(
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
                            className="flex-1 sm:flex-none"
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
