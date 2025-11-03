"use client";


import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/query/user/use-users";
import { userUserStore } from "@/store/use-user-store";
import {
    ListFilter
} from "lucide-react";
import { useEffect, useState } from "react";

import UserCard from "@/components/card/user-card";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";
import { UsersCardSkeleton } from "@/components/skeleton-loader";
import StatisticsCard from "@/components/statistics-card";
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
import { levelsValue } from "@/constant";
import { useCourses } from "@/hooks/query/use-courses";
import { useLevel } from "@/hooks/query/use-level";
import { useDebounce } from "@/hooks/use-debounce";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";

export default function Page() {
    const [search, setSearch] = useState("");
    const [course, setCourse] = useState("all");
    const [level, setLevel] = useState("all");

    const debouncedSearch = useDebounce(search, 500);

    useUpdateQueryParams(
        "/user",
        { search, course, level },
        { search: "", course: "all", level: "all" },
        { replace: true }
    );

    useSyncQueryParams({
        params: {
            search: [search, setSearch],
            course: [course, setCourse],
            level: [level, setLevel],
        },
    });

    const { data, isPending } = useUsers({
        course,
        level,
        search: debouncedSearch,
    });
    const { users, setUsers, isUsersLoading, setUsersLoading } =
        userUserStore();
    const { data: courseData, isPending: isCoursesPending } = useCourses();
    const { data: levelData, isPending: isLevelPending } = useLevel();

    useEffect(() => {
        setUsersLoading(isPending);
        if (data?.success) {
            setUsers(data.users);
        }
    }, [data, isPending, setUsers, setUsersLoading]);

    const hasActiveFilters = [course !== "all" || level !== "all"].filter(
        Boolean
    );
    const statistics = [
        { statName: "Total Attendees", value: 45 },
        { statName: "On Time", value: 38 },
        { statName: "Late", value: 7 },
        { statName: "Absent", value: 12 },
    ];

    return (
        <div className="w-full flex flex-col h-screen">
            <Header title="User">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>User</HeaderTitle>
                    </div>
                </div>
            </Header>
            <PageWrapper>
                <div className="flex flex-col-reverse md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex gap-3 justify-between">
                            <Input
                                type="text"
                                placeholder="Search by name, ID, or department..."
                                value={search}
                                className="w-full md:w-sm bg-card"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <div className="flex gap-3">
                                <DropdownMenu>
                                    <DropdownMenuTrigger
                                        asChild
                                        disabled={
                                            isUsersLoading ||
                                            isCoursesPending ||
                                            isLevelPending
                                        }
                                    >
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
                                                        {
                                                            hasActiveFilters.length
                                                        }
                                                    </span>
                                                </div>
                                            )}
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>
                                                Course:
                                            </DropdownMenuLabel>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>
                                                    {course === "all"
                                                        ? "All"
                                                        : course}
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuCheckboxItem
                                                            checked={
                                                                course === "all"
                                                            }
                                                            onCheckedChange={() =>
                                                                setCourse("all")
                                                            }
                                                        >
                                                            All
                                                        </DropdownMenuCheckboxItem>
                                                        {courseData &&
                                                            courseData.courses.map(
                                                                (crs) => (
                                                                    <DropdownMenuCheckboxItem
                                                                        key={
                                                                            crs.id
                                                                        }
                                                                        checked={
                                                                            crs.name ===
                                                                            course
                                                                        }
                                                                        onCheckedChange={() =>
                                                                            setCourse(
                                                                                crs.name
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            crs.name
                                                                        }
                                                                    </DropdownMenuCheckboxItem>
                                                                )
                                                            )}
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                        </DropdownMenuGroup>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>
                                                Level:
                                            </DropdownMenuLabel>
                                            <DropdownMenuSub>
                                                <DropdownMenuSubTrigger>
                                                    {level === "all"
                                                        ? "All"
                                                        : level}
                                                </DropdownMenuSubTrigger>
                                                <DropdownMenuPortal>
                                                    <DropdownMenuSubContent>
                                                        <DropdownMenuCheckboxItem
                                                            checked={
                                                                level === "all"
                                                            }
                                                            onCheckedChange={() =>
                                                                setLevel("all")
                                                            }
                                                        >
                                                            All
                                                        </DropdownMenuCheckboxItem>
                                                        {levelData &&
                                                            levelData.levels.map(
                                                                (lvl) => (
                                                                    <DropdownMenuCheckboxItem
                                                                        key={
                                                                            lvl.id
                                                                        }
                                                                        checked={
                                                                            lvl.name ===
                                                                            level
                                                                        }
                                                                        onCheckedChange={() =>
                                                                            setLevel(
                                                                                lvl.name
                                                                            )
                                                                        }
                                                                    >
                                                                        {
                                                                            levelsValue[
                                                                                lvl
                                                                                    .name
                                                                            ]
                                                                        }
                                                                    </DropdownMenuCheckboxItem>
                                                                )
                                                            )}
                                                    </DropdownMenuSubContent>
                                                </DropdownMenuPortal>
                                            </DropdownMenuSub>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <Button>Add User</Button>
                            </div>
                        </div>
                        {isUsersLoading ? (
                            <UsersCardSkeleton />
                        ) : users && users.length > 0 ? (
                            <div className="rounded-md  overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    {users.map((user) => (
                                        <UserCard key={user.id} user={user} />
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center text-muted-foreground py-12 font-light">
                                <p className="text-sm">No users found.</p>
                            </div>
                        )}
                    </div>
                    <div className="w-full lg:w-80">
                        <StatisticsCard
                            statistics={statistics}
                            title="Attendance Statistics"
                        />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}
