"use client";

import AttendanceFilter from "@/components/filter/attendance-filter";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import LoadMoreWrapper from "@/components/load-more-wrapper";
import PageWrapper from "@/components/page-wrapper";
import RoleBasedRender from "@/components/role-based-render";
import { AttendanceSkeleton } from "@/components/skeleton-loader";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { eventSessionType, levelsValue } from "@/constant";
import { useAttendance } from "@/hooks/query/attendance/use-attendance";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { useAttendanceStore } from "@/store/use-attendance-store";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, ChevronRight, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();
    const { data: attendanceData, isPending } = useAttendance({
        filters,
        nextCursor,
    });

    const {
        attendances,
        setAttendances,
        isAttendanceLoading,
        setIsAttendanceLoading,
        addMoreAttendance,
    } = useAttendanceStore();

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setAttendances([]);
        setHasMore(false);
        setIsAttendanceLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setAttendances]);

    useEffect(() => {
        if (!attendanceData?.attendance) return;

        if (nextCursor === null) {
            setAttendances(attendanceData?.attendance);
            setIsAttendanceLoading(false);
        } else {
            addMoreAttendance(attendanceData?.attendance);
        }
        setHasMore(attendanceData.hasMore || false);
        setIsLoadingMore(false);
    }, [
        attendanceData,
        nextCursor,
        setAttendances,
        setIsAttendanceLoading,
        addMoreAttendance,
    ]);
    const handleLoadMore = () => {
        if (!attendanceData?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);

        setTimeout(() => {
            if (!attendanceData?.nextCursor) return;
            setNextCursor(attendanceData.nextCursor);
        }, 500);
    };

    return (
        <div className="w-full min-h-screen flex flex-col flex-1">
            <Header title="Event">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>Attendance</HeaderTitle>
                    </div>
                </div>
            </Header>
            <PageWrapper>
                <AttendanceFilter />
                {isAttendanceLoading ? (
                    <AttendanceSkeleton/>
                ) : attendances && attendances.length > 0 ? (
                    <>
                        <LoadMoreWrapper
                            hasMore={hasMore}
                            isLoading={isLoadingMore}
                            loadMore={handleLoadMore}
                            loadingStateMessage="loading more attendance..."
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-col">
                                {attendances.map((attendance, index) => {
                                    const { name, face, studentDetails } =
                                        attendance.user;

                                    const studentId = studentDetails?.studentId;
                                    const course =
                                        studentDetails?.course.name +
                                        ` (${studentDetails?.course.code})`;
                                    const level =
                                        studentDetails &&
                                        levelsValue[studentDetails?.level.name];

                                    return (
                                        <Card
                                            key={attendance.id}
                                            className={`flex-row`}
                                        >
                                            <RoleBasedRender
                                                allowedRoles={["admin"]}
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
                                            </RoleBasedRender>

                                            {/* Info Section */}
                                            <div className="flex-1 flex flex-col gap-3 min-w-0">
                                                {/* Header */}
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex flex-col gap-1">
                                                        <RoleBasedRender
                                                            allowedRoles={[
                                                                "user",
                                                            ]}
                                                        >
                                                            <Link
                                                                href={`/event/${attendance.event.id}`}
                                                                className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors leading-tight group inline-flex items-center gap-2"
                                                            >
                                                                {
                                                                    attendance
                                                                        .event
                                                                        .name
                                                                }
                                                            </Link>
                                                        </RoleBasedRender>
                                                        <RoleBasedRender
                                                            allowedRoles={[
                                                                "admin",
                                                            ]}
                                                        >
                                                            <Link
                                                                href={`/user/${attendance.user.id}`}
                                                                className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors"
                                                            >
                                                                {
                                                                    attendance
                                                                        .user
                                                                        .name
                                                                }
                                                            </Link>

                                                            <div className="">
                                                                <p className="text-xs font-light text-muted-foreground">
                                                                    {[
                                                                        studentDetails.studentId,
                                                                        course,
                                                                        level,
                                                                    ]
                                                                        .filter(
                                                                            Boolean
                                                                        )
                                                                        .join(
                                                                            " | "
                                                                        )}
                                                                </p>
                                                            </div>
                                                        </RoleBasedRender>
                                                    </div>
                                                    <div className="flex gap-2 flex-shrink-0">
                                                        <Badge
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {attendance.method ===
                                                            1
                                                                ? "Face"
                                                                : "Manual"}
                                                        </Badge>
                                                        <Badge
                                                            variant={
                                                                attendance.type ===
                                                                1
                                                                    ? "default"
                                                                    : "destructive"
                                                            }
                                                            className="text-xs"
                                                        >
                                                            {attendance.type ===
                                                            1
                                                                ? "In"
                                                                : "Out"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <RoleBasedRender
                                                    allowedRoles={["admin"]}
                                                >
                                                    <Link
                                                        href={`/event/${attendance.event.id}`}
                                                        className="text-xs font-light text-foreground hover:text-muted-foreground transition-colors leading-tight group inline-flex items-center gap-2"
                                                    >
                                                        {attendance.event.name}
                                                    </Link>
                                                </RoleBasedRender>

                                                {/* Details */}
                                                <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                                                    <span className="text-foreground">
                                                        {
                                                            eventSessionType[
                                                                attendance
                                                                    .session
                                                                    ?.type || 1
                                                            ]
                                                        }
                                                    </span>
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="h-3 w-3" />
                                                        <span className="text-foreground">
                                                            {format(
                                                                new Date(
                                                                    attendance.createdAt
                                                                ),
                                                                "hh:mm aa"
                                                            )}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        {attendance.status ===
                                                        1 ? (
                                                            <>
                                                                <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                                <span className="text-green-600 dark:text-green-400">
                                                                    On Time
                                                                </span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                                                <span className="text-yellow-600 dark:text-yellow-400">
                                                                    Late
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </LoadMoreWrapper>
                    </>
                ) : (
                    <div className="">no attendance</div>
                )}
            </PageWrapper>
        </div>
    );
}
