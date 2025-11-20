"use client";

import { AdminAttendanceCard } from "@/components/card/attendance-card";
import UserAttendanceCard from "@/components/card/user-attendance-card";
import RoleSwitchRender from "@/components/role-switch-render";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { eventSessionType } from "@/constant";
import { fetchApi } from "@/lib/api";
import { AttendanceWithEventAndUser } from "@/store/use-attendance-store";
import { EventWithSessions } from "@/store/use-event-store";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
    AlertCircle,
    ArrowRight,
    Calendar,
    CheckCircle2,
    Clock,
    MapPin,
    Users,
} from "lucide-react";
import Link from "next/link";
import { AttendanceSkeleton } from "../skeleton";

interface Response {
    sucess: boolean;
    message: string;
    attendance: AttendanceWithEventAndUser[];
}
export default function RecentAttendance() {
    const { data: attendanceData, isLoading: isAttendanceLoading } =
        useQuery<Response>({
            queryKey: ["admin-recent-attendance"],
            queryFn: async () => {
                const response = await fetchApi("/api/attendance?limit=5");
                return response;
            },
        });
    return (
        <div className="flex-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-light">Your Recent Attendance</h2>
                <Link
                    href="/attendance"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:gap-3"
                >
                    View all Attendance
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            {isAttendanceLoading ? (
                <AttendanceSkeleton/>
            ) : (
                <div className="grid grid-cols-1 gap-2 ">
                    {attendanceData?.attendance.map((attendance, index) => (
                        <Card key={attendance.id}>
                            <div className="flex items-start gap-2">
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between text-xs font-light">
                                        {attendance.event && (
                                            <p className="text-sm font-light text-muted-foreground truncate">
                                                {attendance.event.name}
                                            </p>
                                        )}
                                        <Badge
                                            variant={
                                                attendance.status === 1
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs"
                                        >
                                            {attendance.status === 1
                                                ? "In"
                                                : "Out"}
                                        </Badge>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                                        <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                                            <Calendar className="h-3 w-3" />
                                            <span className="text-foreground">
                                                {format(
                                                    new Date(
                                                        attendance.event?.eventDate
                                                    ),
                                                    "MMMM dd, yyyy"
                                                )}
                                            </span>
                                        </div>
                                        <span className="text-foreground">
                                            {
                                                eventSessionType[
                                                    attendance.session.type
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
                                                    "h:mm aa"
                                                )}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {attendance.status === 1 ? (
                                                <>
                                                    <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                                    <span className="text-green-600 dark:text-green-400 font-light">
                                                        On Time
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                                    <span className="text-yellow-600 dark:text-yellow-400 font-light">
                                                        Late
                                                    </span>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
