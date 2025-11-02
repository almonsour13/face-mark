"use client";

import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { useUsers } from "@/hooks/query/user/use-users";
import { userUserStore } from "@/store/use-user-store";
import { format } from "date-fns";
import { Filter, ListFilter } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
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
import { SidebarTrigger } from "@/components/ui/sidebar";
import { levelsValue, roleValue } from "@/constant";
import { useCourses } from "@/hooks/query/use-courses";
import { useDebounce } from "@/hooks/use-debounce";
import { useLevel } from "@/hooks/query/use-level";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
import Link from "next/link";
import StatisticsCard from "@/components/statistics-card";
import PageWrapper from "@/components/page-wrapper";
import { UsersCardSkeleton } from "@/components/skeleton-loader";

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
                        <SidebarTrigger />
                        <HeaderTitle>User</HeaderTitle>
                    </div>
                </div>
            </Header>
            <PageWrapper>
                <div className="flex flex-col-reverse md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-4">
                        <div className="flex gap-3 justify-between">
                            <div className="flex gap-3">
                                <Input
                                    type="text"
                                    placeholder="Search by name, ID, or department..."
                                    value={search}
                                    className="w-sm bg-card"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
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
                            </div>
                            <Button>Add User</Button>
                        </div>
                        {isUsersLoading ? (
                            <UsersCardSkeleton />
                        ) : users && users.length > 0 ? (
                            <div className="rounded-md  overflow-hidden">
                                <div className="flex flex-col gap-2">
                                    {users.map((user) => (
                                        <Link
                                            key={user.id}
                                            href={`/user/${user.id}`}
                                            className="p-4 hover:bg-muted/30 transition-colors rounded-md bg-card border"
                                        >
                                            <div className="flex gap-4 items-start">
                                                <div className="h-28 w-28 shrink-0 rounded-md overflow-hidden bg-muted">
                                                    <Image
                                                        alt="profile"
                                                        src={
                                                            user.face
                                                                ? user.face
                                                                      .imageUrl
                                                                : "/placeholder.svg"
                                                        }
                                                        width={80}
                                                        height={80}
                                                        className="aspect-square object-cover w-full h-full"
                                                    />
                                                </div>
                                                <div className="flex-1 flex flex-col gap-2 min-w-0">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex flex-col gap-2">
                                                            <h3 className="text-lg text-foreground font-semibold truncate">
                                                                {user.name}
                                                            </h3>
                                                            <p className="text-xs text-muted-foreground">
                                                                {user.studentDetails
                                                                    ? user
                                                                          .studentDetails
                                                                          ?.studentId
                                                                    : "—"}
                                                            </p>
                                                        </div>
                                                        <Badge
                                                            variant="outline"
                                                            className="shrink-0 text-xs"
                                                        >
                                                            {
                                                                roleValue[
                                                                    user.role
                                                                ]
                                                            }
                                                        </Badge>
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                        {user.studentDetails
                                                            ? user
                                                                  .studentDetails
                                                                  .course.name
                                                            : "—"}
                                                    </p>
                                                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                        <span>
                                                            {user.studentDetails
                                                                ? levelsValue[
                                                                      user
                                                                          .studentDetails
                                                                          .level
                                                                          .name
                                                                  ]
                                                                : "—"}
                                                        </span>
                                                        <span>
                                                            {format(
                                                                user.createdAt,
                                                                "MMM dd, yyyy"
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Link>
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
