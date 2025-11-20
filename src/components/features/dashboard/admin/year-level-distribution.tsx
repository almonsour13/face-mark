// YearLevelDistribution.tsx
import LevelDialog from "@/components/dialog/add-level-dialog";
import LevelSheet from "@/components/sheet/level-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { levelsValue } from "@/constant";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Plus, GraduationCap, Users } from "lucide-react";

interface LevelResponse {
    success: boolean;
    levelStats: {
        levelId: string;
        name: string;
        totalStudents: number;
    }[];
}

export default function YearLevelDistribution() {
    const { data, isLoading, refetch } = useQuery<LevelResponse>({
        queryKey: ["dashboard-stats-level"],
        queryFn: async () => await fetchApi("/api/dashboard/stats/level"),
    });

    const levelData = data?.levelStats
        ? [...data.levelStats].sort((a, b) => b.totalStudents - a.totalStudents)
        : [];

    const totalStudents = levelData.reduce((total, item) => total + item.totalStudents, 0);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Year Level</h2>
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

    if (levelData.length === 0) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Year Level</h2>
                    <LevelDialog>
                        <Button variant="outline" size="sm">
                            <Plus className="w-3 h-3 mr-1.5" /> Level
                        </Button>
                    </LevelDialog>
                </div>
                <Card className="md:aspect-square p-12">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <GraduationCap className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-base font-light mb-2">No Year Levels</h3>
                        <p className="text-sm text-muted-foreground font-light mb-4">
                            Add year levels to organize students
                        </p>
                        <LevelDialog>
                            <Button variant="outline" size="sm">
                                <Plus className="w-3 h-3 mr-1.5" /> Add Level
                            </Button>
                        </LevelDialog>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-light">Year Level</h2>
                <LevelDialog>
                    <Button variant="outline" size="sm">
                        <Plus className="w-3 h-3 mr-1.5" /> Level
                    </Button>
                </LevelDialog>
            </div>

            <LevelSheet levelStats={levelData} refetch={refetch}>
                <Card className="gap-2 md:aspect-square cursor-pointer hover:border-border/50 transition-colors">
                    <div className="space-y-2 flex-1">
                        {levelData.slice(0, 4).map((item, index) => {
                            const percentage = totalStudents > 0
                                ? ((item.totalStudents / totalStudents) * 100).toFixed(1)
                                : "0";
                            const label = levelsValue[item.name] ?? item.name ?? "Unknown";

                            return (
                                <div key={item.levelId} className="p-3 border  rounded-lg hover:bg-muted/20 transition-colors space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-light text-muted-foreground">
                                            {label}
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
                                            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
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
                                {levelData.length} level{levelData.length !== 1 ? "s" : ""}
                            </span>
                            {levelData.length > 4 && (
                                <span className="px-2 py-0.5 rounded-full bg-muted font-light">
                                    +{levelData.length - 4} more
                                </span>
                            )}
                        </div>
                        <span className="font-light text-muted-foreground hover:text-foreground transition-colors">
                            View all →
                        </span>
                    </div>
                </Card>
            </LevelSheet>
        </div>
    );
}