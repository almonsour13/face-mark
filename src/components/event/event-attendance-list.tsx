"use client";

import { Badge } from "@/components/ui/badge";
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
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { levelsValue } from "@/constant";
import { useEventAttendance } from "@/hooks/query/event/use-event-attendace";
import { useLevel } from "@/hooks/query/use-level";
import { useDebounce } from "@/hooks/use-debounce";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { ListFilter } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { EventAttendanceSkeleton } from "../skeleton-loader";

export default function EventAttendanceList() {
    const eventId = useParams().eventId as string;

    // const [nextCursor, setNextCursor] = useState("");
    const [count, setCount] = useState(20);
    const [search, setSearch] = useState("");
    const [sessionType, setSessionType] = useState("0");
    const [level, setLevel] = useState("all");
    const [attendanceType, setAttendanceType] = useState("0");

    const debouncedSearch = useDebounce(search, 500);

    useUpdateQueryParams(
        ` /event/${eventId}`,
        { search, sessionType, level, attendanceType },
        { search: "", sessionType: "0", level: "all", attendanceType: "0" },
        { replace: true }
    );

    useSyncQueryParams({
        params: {
            search: [search, setSearch],
            sessionType: [sessionType, setSessionType],
            level: [level, setLevel],
            attendanceType: [attendanceType, setAttendanceType],
        },
    });

    const { data: eventAttendanceData, isLoading: isEventAttendanceLoading } =
        useEventAttendance({
            eventId,
            sessionType,
            level,
            attendanceType,
            search: debouncedSearch,
            count,
        });

    const { eventAttendance, setEventAttendance } = useEventAttendanceStore();
    const { data: levelData, isPending: isLevelPending } = useLevel();

    useEffect(() => {
        if (eventAttendanceData?.attendance) {
            setEventAttendance(eventAttendanceData.attendance);
        }
    }, [eventAttendanceData, setEventAttendance]);

    const hasActiveFilters = [
        sessionType !== "0" || level !== "all" || attendanceType !== "0",
    ].filter(Boolean);

    const isSearching = search !== debouncedSearch;

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Attendance</h2>
            <div className="flex items-center gap-2 justify-between">
                <Input
                    type="text"
                    placeholder="Search by name, ID, or department..."
                    className="w-sm bg-card"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="flex gap-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger
                            asChild
                            // className={
                            //     hasActiveFilters
                            //         ? "bg-primary/30 dark:bg-primary/30"
                            //         : ""
                            // }
                        >
                            <Button
                                variant={
                                    hasActiveFilters.length > 0
                                        ? "default"
                                        : "outline"
                                }
                                className="relative items-center"
                                disabled={isEventAttendanceLoading}
                            >
                                <ListFilter />
                                Filter
                                {hasActiveFilters.length > 0 && (
                                    <div className="h-4 w-4 rounded-full bg-primary-foreground flex items-center justify-center">
                                        <span className="font-medium text-xs">
                                            {hasActiveFilters.length}
                                        </span>
                                    </div>
                                )}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Type:</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {attendanceType === "0"
                                            ? "All"
                                            : attendanceType === "1"
                                            ? "Time In"
                                            : "Time Out"}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuCheckboxItem
                                                checked={attendanceType === "0"}
                                                onCheckedChange={() =>
                                                    setAttendanceType("0")
                                                }
                                            >
                                                All
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                checked={attendanceType === "1"}
                                                onCheckedChange={() =>
                                                    setAttendanceType("1")
                                                }
                                            >
                                                Time In
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                checked={attendanceType === "2"}
                                                onCheckedChange={() =>
                                                    setAttendanceType("2")
                                                }
                                            >
                                                Time Out
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                            </DropdownMenuGroup>
                            <DropdownMenuSeparator />
                            <DropdownMenuGroup>
                                <DropdownMenuLabel>Session:</DropdownMenuLabel>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        {eventSessionTypeValue[
                                            parseInt(sessionType)
                                        ] || "All"}
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuCheckboxItem
                                                checked={sessionType === "0"}
                                                onCheckedChange={() =>
                                                    setSessionType("0")
                                                }
                                            >
                                                All
                                            </DropdownMenuCheckboxItem>
                                            {Object.entries(
                                                eventSessionTypeValue
                                            ).map(([key, value]) => (
                                                <DropdownMenuCheckboxItem
                                                    key={key}
                                                    checked={
                                                        sessionType === key
                                                    }
                                                    onCheckedChange={() =>
                                                        setSessionType(key)
                                                    }
                                                >
                                                    {value}
                                                </DropdownMenuCheckboxItem>
                                            ))}
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
                                            {levelData?.levels &&
                                                levelData.levels.map(
                                                    (itemLevel) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={itemLevel.id}
                                                            checked={
                                                                itemLevel.name ===
                                                                level
                                                            }
                                                            onCheckedChange={() =>
                                                                setLevel(
                                                                    itemLevel.name
                                                                )
                                                            }
                                                        >
                                                            {
                                                                levelsValue[
                                                                    itemLevel
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
            </div>

            {/* Table Content */}
            {isEventAttendanceLoading || isSearching ? (
                <EventAttendanceSkeleton />
            ) : eventAttendance && eventAttendance.length > 0 ? (
                <div className="rounded-md boarder overflow-hidden">
                    <div className="flex flex-col gap-2">
                        {eventAttendance.map((attendance) => {
                            const { name, face, studentDetails } =
                                attendance.user;
                            const studentId = studentDetails?.studentId;
                            const course =
                                studentDetails?.course.name +
                                ` (${studentDetails.course.code})`;
                            const level =
                                studentDetails &&
                                levelsValue[studentDetails?.level.name];
                            return (
                                <div
                                    key={attendance.id}
                                    className="bg-card border flex gap-4 rounded-md p-4 hover:bg-muted/30 transition-colors"
                                >
                                    <div className="h-28 w-28 rounded overflow-hidden bg-muted flex-shrink-0">
                                        <Image
                                            src={
                                                face?.imageUrl ||
                                                "/placeholder.svg?height=120&width=120"
                                            }
                                            width={120}
                                            height={120}
                                            alt={`${name}'s profile`}
                                            className="aspect-square object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col min-w-0 gap-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-lg font-light text-foreground truncate leading-tight">
                                                {name}
                                            </h3>
                                            <div className="flex gap-2">
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs"
                                                >
                                                    {attendance.method === 1
                                                        ? "Face"
                                                        : "Manual"}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        attendance.type === 1
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {attendance.type === 1
                                                        ? "In"
                                                        : "Out"}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm text-muted-foreground font-light">
                                                {format(
                                                    new Date(
                                                        attendance.createdAt
                                                    ),
                                                    "hh:mm aa"
                                                )}
                                            </p>
                                            <span
                                                className={`text-xs ${
                                                    attendance.status === 1
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                }`}
                                            >
                                                {attendance.status === 1
                                                    ? "On Time"
                                                    : "Late"}
                                            </span>
                                        </div>

                                        {(studentId || course || level) && (
                                            <div className="space-y-1">
                                                {studentId && (
                                                    <p className="text-sm text-muted-foreground font-light">
                                                        {studentId}
                                                    </p>
                                                )}
                                                <p className="text-sm text-muted-foreground font-light">
                                                    {[course, level]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>No Attendance Yet</EmptyTitle>
                        <EmptyDescription>
                            Event doesn&apos;t have any attendance yet.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </div>
    );
}
