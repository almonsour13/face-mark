import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { levelsValue } from "@/constant";
import { fetchApi } from "@/lib/api";
import { UserWithDetails } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";
import { Award, Calendar, CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { TopUsertPerformanceSKeleton } from "./skeleton";

interface Response {
    success: boolean;
    topUserPerformance: (UserWithDetails & {
        totalEventAttended: number;
        totalAttendance: number;
    })[];
    totalEvents: number;
}

export default function TopUserPerformance() {
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-top-user-performance"],
        queryFn: async () => {
            return await fetchApi("/api/dashboard/top-user-performance");
        },
    });
    const sortedUsers = data?.topUserPerformance.sort(
        (a, b) => b.totalEventAttended - a.totalEventAttended
    );

    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-light">Top 5 User Performance</h2>
                <span className="text-xs text-muted-foreground font-light">
                    {data?.totalEvents} total events
                </span>
            </div>
            {isLoading ? (
                <TopUsertPerformanceSKeleton />
            ) : data?.topUserPerformance &&
              sortedUsers &&
              sortedUsers.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {sortedUsers.map((user, index) => {
                        const { name, studentDetails } = user;
                        const course = studentDetails?.course
                            ? `${studentDetails.course.name} (${studentDetails.course.code})`
                            : null;
                        const level = studentDetails?.level
                            ? levelsValue[studentDetails.level.name]
                            : null;

                        const eventsMissed =
                            data.totalEvents - user.totalEventAttended;
                        const attendanceRate =
                            data.totalEvents > 0
                                ? (
                                      (user.totalEventAttended /
                                          data.totalEvents) *
                                      100
                                  ).toFixed(1)
                                : "0";

                        return (
                            <Link
                                key={user.id}
                                href={`/admin/users/${user.id}`}
                                className="block group"
                            >
                                <Card className="gap-4 flex-row items-start hover:border-border/50 transition-colors">
                                    <div className="w-12 h-12 bg-muted flex items-center justify-center font-light text-xl rounded-full text-muted-foreground shrink-0">
                                        {index + 1}
                                    </div>
                                    <div className="flex flex-col gap-2 flex-1">
                                        <div className="flex flex-col gap-1">
                                            <h1 className="text-base font-light group-hover:text-foreground/80 transition-colors">
                                                {name}
                                            </h1>
                                            <p className="text-xs font-light text-muted-foreground">
                                                {[course, level]
                                                    .filter(Boolean)
                                                    .join(" | ")}
                                            </p>
                                        </div>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                                            <div className="flex flex-col gap-0.5 p-2 rounded-md bg-muted/30">
                                                <span className="text-xs text-muted-foreground font-light">
                                                    Attendance
                                                </span>
                                                <span className="text-sm font-light">
                                                    {user.totalAttendance}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 p-2 rounded-md bg-green-500/10 border border-green-500/20">
                                                <span className="text-xs text-muted-foreground font-light">
                                                    Attended
                                                </span>
                                                <span className="text-sm font-light text-green-600 dark:text-green-400">
                                                    {user.totalEventAttended}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 p-2 rounded-md bg-red-500/10 border border-red-500/20">
                                                <span className="text-xs text-muted-foreground font-light">
                                                    Missed
                                                </span>
                                                <span className="text-sm font-light text-red-600 dark:text-red-400">
                                                    {eventsMissed}
                                                </span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 p-2 rounded-md bg-blue-500/10 border border-blue-500/20">
                                                <span className="text-xs text-muted-foreground font-light">
                                                    Rate
                                                </span>
                                                <span className="text-sm font-light text-blue-600 dark:text-blue-400">
                                                    {attendanceRate}%
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <Card className="p-6">
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <Award className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-lg font-light mb-2">
                            No Performance Data
                        </h3>
                        <p className="text-sm text-muted-foreground font-light">
                            Top performers will appear here once attendance is
                            recorded
                        </p>
                    </div>
                </Card>
            )}
        </div>
    );
}
