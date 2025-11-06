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
import { sortBy } from "@/constant";
import { useCourses } from "@/hooks/query/use-courses";
import { useLevel } from "@/hooks/query/use-level";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { ArrowUpDown, ListFilter } from "lucide-react";

export default function UserFilter() {
    const { data: courseData, isPending: isCoursesPending } = useCourses();
    const { data: levelData, isPending: isLevelPending } = useLevel();

    const {
        filters,
        setFilter,
        searchValue,
        setSearchValue,
        hasActiveFilters,
    } = useUrlFilter({
        defaultValue:{
        sortBy: "name-desc",
        }
    });

    const selectedCourse = filters.course || "all";
    const selectedLevel = filters.level || "all";

    return (
        <div className="flex gap-2 items-center justify-between">
            {/* 🔍 Search Input */}
            <Input
                type="search"
                placeholder="Search events by name, location, or description..."
                className="w-full md:w-sm bg-card"
                value={filters.search || ""}
                onChange={(e) => setFilter("search", e.target.value)}
                // onChange={(e) => setSearchValue(e.target.value)}
            />

            <div className="flex gap-3">
                {/* 🧭 Filter Dropdown */}
                <DropdownMenu>
                    <DropdownMenuTrigger
                        asChild
                        disabled={isCoursesPending || isLevelPending}
                    >
                        <Button
                            variant={
                                hasActiveFilters > 0 ? "default" : "outline"
                            }
                            className="relative flex items-center gap-2"
                        >
                            <ListFilter size={16} />
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
                                            checked={selectedCourse === "all"}
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
                                                    selectedCourse === crs.name
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
                                        : selectedLevel}
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
                                                {lvl.name}
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
                        {Object.entries(sortBy).map(([key, value]) => (
                            <DropdownMenuCheckboxItem
                                checked={filters.sortBy === key}
                                onCheckedChange={() =>
                                    setFilter("sortBy", key)
                                }
                            >
                                {value}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
                {/* ➕ Add User Button */}
                <Button>Add User</Button>
            </div>
        </div>
    );
}
