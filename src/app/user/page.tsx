"use client";

import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/user/use-users";
import { userUserStore } from "@/store/use-user-store";
import { format } from "date-fns";
import { Filter, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import Header from "@/components/header";
import HeaderTitle from "@/components/nav-header-title";
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
import { levelsValue } from "@/constant";
import { useCourses } from "@/hooks/use-courses";
import { useDebounce } from "@/hooks/use-debounce";
import { useLevel } from "@/hooks/use-level";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

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
    const { data: courseData } = useCourses();
    const { data: levelData } = useLevel();

    useEffect(() => {
        setUsersLoading(isPending);
        console.log(data);
        if (data?.success) {
            setUsers(data.users);
        }
    }, [data, isPending, setUsers, setUsersLoading]);

    const hasActiveFilters = course !== "all" || level !== "all";

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
            <div className="p-4 md:p-6 flex flex-col gap-4">
                <div className="flex gap-2">
                    <Input
                        type="text"
                        placeholder="Search by name, ID, or department..."
                        className="max-w-sm"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            className={
                                hasActiveFilters
                                    ? "bg-primary/30 dark:bg-primary/30"
                                    : ""
                            }
                        >
                            <Button variant="outline" className="relative">
                                <Filter className="w-4 h-4" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Course:</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {course === "all" ? "All" : course}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuCheckboxItem
                                                checked={course === "all"}
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
                                                            key={crs.id}
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
                                                            {crs.name}
                                                        </DropdownMenuCheckboxItem>
                                                    )
                                                )}
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Level:</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {level === "all" ? "All" : level}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuCheckboxItem
                                                checked={level === "all"}
                                                onCheckedChange={() =>
                                                    setLevel("all")
                                                }
                                            >
                                                All
                                            </DropdownMenuCheckboxItem>
                                            {levelData &&
                                                levelData.levels.map((lvl) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={lvl.id}
                                                        checked={
                                                            lvl.name === level
                                                        }
                                                        onCheckedChange={() =>
                                                            setLevel(lvl.name)
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
                {isUsersLoading ? (
                    <div className="">loading</div>
                ) : users && users.length > 0 ? (
                    <div className="rounded border overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Student ID:</TableHead>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course</TableHead>
                                    <TableHead>Year</TableHead>
                                    <TableHead>Created At</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            {user.studentDetails?.studentId}
                                        </TableCell>
                                        <TableCell>
                                            <Image
                                                alt="profile"
                                                src={user.faceImages.imageUrl}
                                                width={200}
                                                height={200}
                                                className="aspect-square h-14 w-14 rounded object-cover"
                                            />
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>
                                            {user.studentDetails.course.name}
                                        </TableCell>
                                        <TableCell>
                                            {user.studentDetails.level.name}
                                        </TableCell>
                                        <TableCell>
                                            {format(
                                                user.createdAt,
                                                "MMM dd, yyyy h:mm aa"
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                    >
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <Link
                                                        href={`/user/${user.id}`}
                                                    >
                                                        <DropdownMenuItem>
                                                            View Profile
                                                        </DropdownMenuItem>
                                                    </Link>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-white w-full h-full">
                        No Attendance
                    </div>
                )}
            </div>
        </div>
    );
}
