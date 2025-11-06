"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { useUrlFilter } from "@/hooks/use-url-filters";
import { ListFilter } from "lucide-react";
import { attendanceType, eventSessionType, levelsValue } from "@/constant";
import { useLevel } from "@/hooks/query/use-level";
import { useCourses } from "@/hooks/query/use-courses";

export default function EventAttendanceFilter() {
    const { data: levelData } = useLevel();
    const { data: courseData, isPending: isCoursesPending } = useCourses();
    const { filters, setFilter, hasActiveFilters } = useUrlFilter({
        defaultValue: {
            sortBy: "date-desc",
        },
    });

    const selectedCourse = filters.course || "all";
    const selectedLevel = filters.level || "all";
    const selectedSession = filters.session || "all";

    return (
        <div className="flex gap-2 w-full sm:w-auto">
            <Input
                type="text"
                placeholder="Search by name, ID, or department..."
                className="w-full md:w-sm bg-card"
                value={filters.search || ""}
                onChange={(e) => setFilter("search", e.target.value)}
            />

            <div className="flex gap-2">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant={
                                hasActiveFilters > 0 ? "default" : "outline"
                            }
                            className="relative items-center"
                        >
                            <ListFilter />
                            Filter
                            {hasActiveFilters > 0 && (
                                <div className="h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                                    <span className="font-medium text-xs text-background">
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
                        {/* 🏷️ Level Filter */}
                        <DropdownMenuGroup>
                            <DropdownMenuLabel>Level:</DropdownMenuLabel>
                            <DropdownMenuSub>
                                <DropdownMenuSubTrigger>
                                    {selectedLevel === "all"
                                        ? "All"
                                        : levelsValue[selectedLevel]}
                                </DropdownMenuSubTrigger>
                                <DropdownMenuPortal>
                                    <DropdownMenuSubContent>
                                        <DropdownMenuCheckboxItem
                                            checked={selectedLevel === "all"}
                                            onCheckedChange={() =>
                                                setFilter("level", "all")
                                            }
                                        >
                                            All
                                        </DropdownMenuCheckboxItem>
                                        {levelData?.levels.map((lvl) => (
                                            <DropdownMenuCheckboxItem
                                                key={lvl.id}
                                                checked={
                                                    selectedLevel === lvl.name
                                                }
                                                onCheckedChange={() =>
                                                    setFilter("level", lvl.name)
                                                }
                                            >
                                                {levelsValue[lvl.name]}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuSubContent>
                                </DropdownMenuPortal>
                            </DropdownMenuSub>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
