"use client";

import { useEffect, useState } from "react";
import {
    Calendar,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    Download,
    Filter,
    Search,
    TrendingUp,
    TrendingDown,
    Activity,
    Target,
    BarChart3,
    ChevronRight,
    User,
    Shield,
    Scan,
    MapPin,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useAttendance } from "@/hooks/query/attendance/use-attendance";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import RoleBasedRender from "@/components/role-based-render";
import PageWrapper from "@/components/page-wrapper";
import { eventSessionTypeValue } from "@/utils/event-utils";
import Link from "next/link";
import Image from "next/image";
import { levelsValue } from "@/constant";

export default function Page() {
    const { data: attendanceData, isPending: isAttendanceLoading } =
        useAttendance();
    return (
        <PageWrapper>
            {isAttendanceLoading ? (
                <div className="">loading</div>
            ) : attendanceData && attendanceData.attendance.length > 0 ? (
                <div className="flex gap-2 flex-col">
                    {attendanceData.attendance.map((attendance, index) => {
                        const { name, face, studentDetails } = attendance.user;

                        const studentId = studentDetails?.studentId;
                        const course =
                            studentDetails?.course.name +
                            ` (${studentDetails?.course.code})`;
                        const level =
                            studentDetails &&
                            levelsValue[studentDetails?.level.name];

                        return (
                            <div
                                key={attendance.id}
                                className={` flex gap-3 bg-card border rounded-md p-4`}
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

                                {/* Info Section */}
                                <div className="flex-1 flex flex-col gap-3 min-w-0">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex flex-col gap-1">
                                            <RoleBasedRender
                                                allowedRoles={["admin"]}
                                            >
                                                <Link
                                                    href={`/user/${attendance.user.id}`}
                                                    className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors"
                                                >
                                                    {attendance.user.name}
                                                </Link>
                                            </RoleBasedRender>
                                            <Link
                                                href={`/event/${attendance.event.id}`}
                                                className="text-lg font-light text-foreground hover:text-muted-foreground transition-colors leading-tight group inline-flex items-center gap-2"
                                            >
                                                {attendance.event.name}
                                                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </Link>
                                        </div>
                                        <div className="flex gap-2 flex-shrink-0">
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

                                    {/* Details */}
                                    <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                                        <span className="text-foreground">
                                            {
                                                eventSessionTypeValue[
                                                    attendance.session?.type ||
                                                        1
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
                                            {attendance.status === 1 ? (
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
                                    <div className="space-y-1 flex gap-2">
                                        <p className="text-xs font-light text-foreground">
                                            {studentId}
                                        </p>
                                        <p className="text-xs font-light text-foreground">
                                            {course}
                                        </p>
                                        <p className="text-xs font-light text-muted-foreground">
                                            {level}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="">no attendance</div>
            )}
        </PageWrapper>
    );
}
