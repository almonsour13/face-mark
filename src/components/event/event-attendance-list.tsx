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
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle
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
import {
    ListFilter
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import EventAttendanceCard from "../card/event-attendance-card";
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-lg font-light">Attendance Records</h2>

                <div className="flex gap-2 w-full sm:w-auto">
                    <Input
                        type="text"
                        placeholder="Search by name, ID, or department..."
                        className="w-full md:w-sm bg-card"
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
                                            <span className="font-medium text-xs text-background">
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
                                                    checked={
                                                        attendanceType === "0"
                                                    }
                                                    onCheckedChange={() =>
                                                        setAttendanceType("0")
                                                    }
                                                >
                                                    All
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem
                                                    checked={
                                                        attendanceType === "1"
                                                    }
                                                    onCheckedChange={() =>
                                                        setAttendanceType("1")
                                                    }
                                                >
                                                    Time In
                                                </DropdownMenuCheckboxItem>
                                                <DropdownMenuCheckboxItem
                                                    checked={
                                                        attendanceType === "2"
                                                    }
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
                                    <DropdownMenuLabel>
                                        Session:
                                    </DropdownMenuLabel>
                                    <DropdownMenuSub>
                                        <DropdownMenuSubTrigger>
                                            {eventSessionTypeValue[
                                                parseInt(sessionType)
                                            ] || "All"}
                                        </DropdownMenuSubTrigger>
                                        <DropdownMenuPortal>
                                            <DropdownMenuSubContent>
                                                <DropdownMenuCheckboxItem
                                                    checked={
                                                        sessionType === "0"
                                                    }
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
                                    <DropdownMenuLabel>
                                        Level:
                                    </DropdownMenuLabel>
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
                                                                key={
                                                                    itemLevel.id
                                                                }
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
            </div>

            {/* Table Content */}
            {isEventAttendanceLoading || isSearching ? (
                <EventAttendanceSkeleton />
            ) : eventAttendance && eventAttendance.length > 0 ? (
                <div className="rounded-md boarder overflow-hidden">
                    <div className="flex flex-col gap-2">
                        {eventAttendance.map((attendance) => (
                            <EventAttendanceCard
                                key={attendance.id}
                                attendance={attendance}
                            />
                        ))}
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
