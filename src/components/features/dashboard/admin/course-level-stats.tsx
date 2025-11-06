"use client";

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { levelsValue } from "@/constant";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { GraduationCap, Users } from "lucide-react";
import Link from "next/link";

export default function CourseLevelStats() {
    return (
        <div className="flex-1 flex-col md:flex-row flex gap-4">
            <CourseStats />
            <LevelStats />
        </div>
    );
}
interface CourseResponse {
    success: boolean;
    courseStats: {
        courseId: string;
        name: string;
        code: string;
        totalStudents: number;
    }[];
}

const CourseStats = () => {
    const { data: courseData, isLoading: isCourseDataLoading } =
        useQuery<CourseResponse>({
            queryKey: ["dashboard-stats-course"],
            queryFn: async () => {
                const response = await fetchApi("/api/dashboard/stats/course");
                return response;
            },
        });

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Course Stats</h2>
            <Card>
                <ScrollArea>
                    <div className="grid gap-2 max-h-96 md:h-96">
                        {courseData?.courseStats
                            .sort((a, b) => b.totalStudents - a.totalStudents)
                            // .slice(0, 1)
                            .map((course, index) => (
                                <Link href={`/user?course=${course.name}`}>
                                    <div
                                        key={course.courseId}
                                        className="flex h-full max-h-24 items-center justify-between p-3 border rounded-md"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="flex-1 min-w-0">
                                                <p className="text-md font-light truncate">
                                                    {course.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-light">
                                                    {course.code}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                            <span className="text-lg font-light">
                                                {course.totalStudents}
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
};
interface LevelResponse {
    success: boolean;
    levelStats: {
        levelId: string;
        name: string;
        totalStudents: number;
    }[];
}
const LevelStats = () => {
    const { data: levelData, isLoading: isCourseDataLoading } =
        useQuery<LevelResponse>({
            queryKey: ["dashboard-stats-level"],
            queryFn: async () => {
                const response = await fetchApi("/api/dashboard/stats/level");
                return response;
            },
        });

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Year | Level Stats</h2>
            <Card>
                <ScrollArea>
                    <div className="grid gap-2 max-h-96 md:h-96">
                        {levelData?.levelStats.map((level, index) => {
                            return (
                               <Link href={`/user?level=${level.name}`}>
                                 <div
                                    key={level.levelId}
                                    className="flex h-full max-h-24 items-center justify-between p-3 border rounded-md"
                                >
                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-md font-light truncate">
                                                {levelsValue[level.name]}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-lg font-light">
                                            {level.totalStudents}
                                        </span>
                                    </div>
                                </div>
                               </Link>
                            );
                        })}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
};
