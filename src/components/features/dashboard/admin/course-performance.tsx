import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/api";
import { Course } from "@/type";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react";
import { useState } from "react";

interface Response {
    success: boolean;
    totalEventSessions: number;
    coursePerformance: (Course & {
        totalStudents: number;
        totalAttendance: number;
    })[];
}

export default function CoursePerformance() {
    const [currentBatch, setCurrentBatch] = useState(1);

    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-course-performance"],
        queryFn: async () => await fetchApi("/api/dashboard/course-performance"),
    });

    const coursePerformanceData = data?.coursePerformance
        ? [...data.coursePerformance].sort((a, b) => b.totalStudents - a.totalStudents)
        : [];

    const totalEventSessions = data?.totalEventSessions ?? 0;
    const itemsPerBatch = 4;
    const totalBatches = Math.ceil(coursePerformanceData.length / itemsPerBatch);

    const startIndex = (currentBatch - 1) * itemsPerBatch;
    const endIndex = Math.min(startIndex + itemsPerBatch, coursePerformanceData.length);
    const currentBatchData = coursePerformanceData.slice(startIndex, endIndex);

    const handlePrevBatch = () => setCurrentBatch((prev) => Math.max(prev - 1, 1));
    const handleNextBatch = () => setCurrentBatch((prev) => Math.min(prev + 1, totalBatches));

    const getAttendanceColor = (rate: number) => {
        if (rate >= 90) return "text-green-600 dark:text-green-400";
        if (rate >= 75) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
    };

    if (isLoading) {
        return (
            <div className="w-full flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Course Performance</h2>
                    <Skeleton className="h-8 w-32" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} className="h-40 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (!coursePerformanceData.length) {
        return (
            <div className="w-full flex flex-col gap-4">
                <h2 className="text-xl font-light">Course Performance</h2>
                <Card className="p-12 text-center">
                    <BookOpen className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                    <h3 className="text-lg font-light mb-2">No Course Data</h3>
                    <p className="text-sm text-muted-foreground font-light">
                        Course performance will appear once attendance is recorded
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-light">Course Performance</h2>
                {totalBatches > 1 && (
                    <div className="flex gap-2 items-center">
                        <span className="text-xs text-muted-foreground font-light">
                            Page {currentBatch} of {totalBatches}
                        </span>
                        <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={handlePrevBatch}
                            disabled={currentBatch === 1}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon-sm"
                            onClick={handleNextBatch}
                            disabled={currentBatch === totalBatches}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentBatchData.map((item, index) => {
                    const expectedAttendance = item.totalStudents * totalEventSessions * 2;
                    const attendanceRate = expectedAttendance > 0
                        ? ((item.totalAttendance / expectedAttendance) * 100).toFixed(1)
                        : "0";

                    return (
                        <Card key={item.id} className="p-4 hover:border-border/50 transition-colors">
                            <div className="flex flex-col gap-4">
                                {/* Header */}
                                <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1">
                                        <h3 className="text-base font-light line-clamp-1">
                                            {item.name}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-light">
                                            {item.code}
                                        </p>
                                    </div>
                                    <TrendingUp className="h-4 w-4 text-muted-foreground/50 shrink-0" />
                                </div>

                                {/* Students Count */}
                                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted/30">
                                    <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                    <span className="text-sm font-light">
                                        {item.totalStudents} students
                                    </span>
                                </div>

                                {/* Attendance Rate */}
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-light">
                                        <span className="text-muted-foreground">Attendance Rate</span>
                                        <span className={`text-base font-medium ${getAttendanceColor(Number(attendanceRate))}`}>
                                            {attendanceRate}%
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${attendanceRate}%` }}
                                        />
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="pt-2 border-t border-border/30 flex items-center justify-between text-xs font-light text-muted-foreground">
                                    <span>{item.totalAttendance} recorded</span>
                                    <span>{expectedAttendance} expected</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}