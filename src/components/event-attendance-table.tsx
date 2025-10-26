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
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { levelsValue } from "@/constant";
import { useEventAttendance } from "@/hooks/event/use-event-attendace";
import { useDebounce } from "@/hooks/use-debounce";
import { useSyncQueryParams } from "@/hooks/use-sync-query-params";
import { useUpdateQueryParams } from "@/hooks/use-update-query-params";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { Filter } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";

export default function EventAttendanceTable() {
    const eventId = useParams().eventId as string;

    // const [nextCursor, setNextCursor] = useState("");
    // const [count, setCount] = useState(20);
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

    const { data: eventAttendanceData, isLoading } = useEventAttendance({
        eventId,
        sessionType,
        level,
        attendanceType,
        search: debouncedSearch,
        count:20,
    });

    const { eventAttendance, setEventAttendance } = useEventAttendanceStore();

    useEffect(() => {
        if (eventAttendanceData?.attendance) {
            setEventAttendance(eventAttendanceData.attendance);
        }
    }, [eventAttendanceData, setEventAttendance]);

    const uniqueLevel = useMemo(() => {
        const levels = eventAttendance.map(
            (item) => item.user.studentDetails && item.user.studentDetails.level
        );
        return Array.from(new Set(levels.filter(Boolean)));
    }, [eventAttendance]);

    const uniqueSessionType = useMemo(() => {
        const sessionTypes = eventAttendance.map(
            (item) => item.session && item.session.type.toString()
        );
        return Array.from(new Set(sessionTypes.filter(Boolean)));
    }, [eventAttendance]);

    const uniqueAttendanceType = useMemo(() => {
        const attendanceTypes = eventAttendance.map((item) =>
            item.type.toString()
        );
        return Array.from(new Set(attendanceTypes.filter(Boolean)));
    }, [eventAttendance]);

    const hasActiveFilters =
        sessionType !== "0" || level !== "all" || attendanceType !== "0";

    const isSearching = search !== debouncedSearch;

    return (
        <div className="flex flex-col gap-4">
            {/* Header + Search + Filters */}
            <div className="w-full flex items-center gap-2 justify-between">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Attendance
                </h2>
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
                                            {uniqueAttendanceType.map(
                                                (itemAttendanceType) => (
                                                    <DropdownMenuCheckboxItem
                                                        key={itemAttendanceType}
                                                        checked={
                                                            itemAttendanceType ===
                                                            attendanceType
                                                        }
                                                        onCheckedChange={() =>
                                                            setAttendanceType(
                                                                itemAttendanceType
                                                            )
                                                        }
                                                    >
                                                        {itemAttendanceType ===
                                                        "1"
                                                            ? "Time In"
                                                            : "Time Out"}
                                                    </DropdownMenuCheckboxItem>
                                                )
                                            )}
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
                                            {uniqueSessionType &&
                                                uniqueSessionType.map(
                                                    (itemSessionType) => (
                                                        <DropdownMenuCheckboxItem
                                                            key={
                                                                itemSessionType
                                                            }
                                                            checked={
                                                                itemSessionType ===
                                                                sessionType
                                                            }
                                                            onCheckedChange={() =>
                                                                itemSessionType &&
                                                                setSessionType(
                                                                    itemSessionType
                                                                )
                                                            }
                                                        >
                                                            {itemSessionType &&
                                                                eventSessionTypeValue[
                                                                    parseInt(
                                                                        itemSessionType
                                                                    )
                                                                ]}
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
                                            {uniqueLevel &&
                                                uniqueLevel.map((itemLevel) => (
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
                                                                itemLevel.name
                                                            ]
                                                        }
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

            {/* Table Content */}
            {isLoading || isSearching ? (
                <div className="p-6 text-center text-muted-foreground">
                    Loading attendance...
                </div>
            ) : eventAttendance && eventAttendance.length > 0 ? (
                <div className="rounded border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student ID</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Year Level</TableHead>
                                <TableHead>Session</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Attended At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {eventAttendance.map((attendance) => (
                                <TableRow key={attendance.id}>
                                    <TableCell>
                                        {
                                            attendance.user.studentDetails
                                                ?.studentId
                                        }
                                    </TableCell>
                                    <TableCell>
                                        <Image
                                            alt="profile"
                                            src={
                                                attendance.user.faceImages
                                                    ?.imageUrl ||
                                                "/placeholder.jpg"
                                            }
                                            width={56}
                                            height={56}
                                            className="aspect-square h-14 w-14 rounded object-cover border"
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {attendance.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {
                                            attendance.user.studentDetails
                                                ?.course.name
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {
                                            levelsValue[
                                                attendance.user.studentDetails
                                                    ?.level.name
                                            ]
                                        }
                                    </TableCell>
                                    <TableCell>
                                        {attendance.session &&
                                            eventSessionTypeValue[
                                                attendance.session.type
                                            ]}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                attendance.type === 1
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs"
                                        >
                                            {attendance.type === 1
                                                ? "Time In"
                                                : "Time Out"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                attendance.status === 1
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs"
                                        >
                                            {attendance.status === 1
                                                ? "On Time"
                                                : "Late"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {attendance.method === 1
                                            ? "Face Recognition"
                                            : "Manual"}
                                    </TableCell>
                                    <TableCell>
                                        {format(
                                            new Date(attendance.createdAt),
                                            "MMM dd, yyyy h:mm aa"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-center text-muted-foreground py-6">
                    No attendance records found.
                </div>
            )}
        </div>
    );
}
