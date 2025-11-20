// CourseDistribution.tsx
import CourseDialog from "@/components/dialog/course-dialog";
import CourseSheet from "@/components/sheet/course-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Plus, BookOpen, Users } from "lucide-react";

interface CourseResponse {
    success: boolean;
    courseStats: {
        courseId: string;
        name: string;
        code: string;
        totalStudents: number;
    }[];
}

export default function CourseDistribution() {
    const { data, isLoading, refetch } = useQuery<CourseResponse>({
        queryKey: ["dashboard-stats-distribution"],
        queryFn: async () => await fetchApi("/api/dashboard/stats/course"),
    });

    const courseData = data?.courseStats
        ? [...data.courseStats].sort((a, b) => b.totalStudents - a.totalStudents)
        : [];

    const totalStudents = courseData.reduce((total, item) => total + item.totalStudents, 0);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Course Distribution</h2>
                    <Skeleton className="h-8 w-24" />
                </div>
                <Card className="md:aspect-square p-6">
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    if (courseData.length === 0) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Course Distribution</h2>
                    <CourseDialog>
                        <Button variant="outline" size="sm">
                            <Plus className="w-3 h-3 mr-1.5" /> Course
                        </Button>
                    </CourseDialog>
                </div>
                <Card className="md:aspect-square p-12">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <BookOpen className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-base font-light mb-2">No Courses</h3>
                        <p className="text-sm text-muted-foreground font-light mb-4">
                            Add courses to see distribution
                        </p>
                        <CourseDialog>
                            <Button variant="outline" size="sm">
                                <Plus className="w-3 h-3 mr-1.5" /> Add Course
                            </Button>
                        </CourseDialog>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-light">Course Distribution</h2>
                <CourseDialog>
                    <Button variant="outline" size="sm">
                        <Plus className="w-3 h-3 mr-1.5" /> Course
                    </Button>
                </CourseDialog>
            </div>

            <CourseSheet courseStats={courseData} refetch={refetch}>
                <Card className="gap-2 md:aspect-square cursor-pointer transition-colors">
                    <div className="space-y-2 flex-1">
                        {courseData.slice(0, 4).map((item, index) => {
                            const percentage = totalStudents > 0
                                ? ((item.totalStudents / totalStudents) * 100).toFixed(1)
                                : "0";

                            return (
                                <div key={item.courseId} className="p-3 border  rounded-lg hover:bg-muted/20 transition-colors space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-light text-muted-foreground line-clamp-1 flex-1">
                                            {item.name}
                                        </span>
                                        <span className="text-xs text-muted-foreground font-light shrink-0">
                                            ({item.code})
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <Users className="h-3 w-3 text-muted-foreground" />
                                            <span className="font-light">{item.totalStudents} students</span>
                                        </div>
                                        <span className="font-medium">{percentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-2 border-t  flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="font-light text-muted-foreground">
                                {courseData.length} course{courseData.length !== 1 ? "s" : ""}
                            </span>
                            {courseData.length > 4 && (
                                <span className="px-2 py-0.5 rounded-full bg-muted font-light">
                                    +{courseData.length - 4} more
                                </span>
                            )}
                        </div>
                        <span className="font-light text-muted-foreground hover:text-foreground transition-colors">
                            View all →
                        </span>
                    </div>
                </Card>
            </CourseSheet>
        </div>
    );
}