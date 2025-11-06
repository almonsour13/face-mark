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
import {
    attendanceStatus,
    attendanceType,
    eventSessionType,
    eventStatus,
    levelsValue,
    sortBy,
} from "@/constant";
import { useEventTypes } from "@/hooks/query/event/use-event-type";
import { useLevel } from "@/hooks/query/use-level";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { ArrowUpDown, ListFilter } from "lucide-react";
import RBACGuard from "../rbac-guard";
import { useCourses } from "@/hooks/query/use-courses";
import RoleBasedRender from "../role-based-render";

export default function AttendanceFilter() {
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
        <div className="flex gap-2 items-center justify-between">
            <Input
                type="search"
                placeholder="Search attendace..."
                className="w-full md:w-sm bg-card"
                value={filters.search || ""}
                onChange={(e) => setFilter("search", e.target.value)}
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
                        <RoleBasedRender allowedRoles={["admin"]}>
                            {/* 🎓 Course Filter */}
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Course:</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {selectedCourse === "all"
                                            ? "All"
                                            : selectedCourse}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuCheckboxItem
                                                checked={
                                                    selectedCourse === "all"
                                                }
                                                onCheckedChange={() =>
                                                    setFilter("course", "all")
                                                }
                                            >
                                                All
                                            </DropdownMenuCheckboxItem>
                                            {courseData?.courses.map((crs) => (
                                                <DropdownMenuCheckboxItem
                                                    key={crs.id}
                                                    checked={
                                                        selectedCourse ===
                                                        crs.name
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter(
                                                            "course",
                                                            crs.name
                                                        )
                                                    }
                                                >
                                                    {crs.name}
                                                </DropdownMenuCheckboxItem>
                                            ))}
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
                                                checked={
                                                    selectedLevel === "all"
                                                }
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
                                                        selectedLevel ===
                                                        lvl.name
                                                    }
                                                    onCheckedChange={() =>
                                                        setFilter(
                                                            "level",
                                                            lvl.name
                                                        )
                                                    }
                                                >
                                                    {levelsValue[lvl.name]}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator />
                        </RoleBasedRender>
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
