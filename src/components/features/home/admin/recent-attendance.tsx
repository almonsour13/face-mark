"use client";

import { AdminAttendanceCard } from "@/components/card/attendance-card";
import UserAttendanceCard from "@/components/card/user-attendance-card";
import RoleSwitchRender from "@/components/role-switch-render";
import { Card } from "@/components/ui/card";
import { fetchApi } from "@/lib/api";
import { AttendanceWithEventAndUser } from "@/store/use-attendance-store";
import { EventWithSessions } from "@/store/use-event-store";
import { useQuery } from "@tanstack/react-query";
import {
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
                <h2 className="text-lg font-light">Recent Attendance</h2>
                <Link
                    href="/event"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:gap-3"
                >
                    View all Attendance
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            {isAttendanceLoading ? (
                <AttendanceSkeleton />
            ) : (
                <div className="grid grid-cols-1 gap-2 ">
                    {attendanceData?.attendance.map((attendance, index) => (
                        <Card key={attendance.id}>
                            <div className="flex items-start gap-2">
                                <div className="flex-1 space-y-1">
                                    <div className="flex justify-between text-xs font-light">
                                        <span className="text-foreground">
                                            {attendance.user.name}
                                        </span>{" "}
                                        <span className="text-muted-foreground">
                                            {attendance.status === 1
                                                ? "time in"
                                                : "time out"}
                                        </span>
                                    </div>
                                    {attendance.event && (
                                        <p className="text-xs font-light text-muted-foreground">
                                            {attendance.event.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
