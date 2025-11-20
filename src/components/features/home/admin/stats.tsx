"use client";

import { Card } from "@/components/ui/card";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { icons } from "lucide-react";
import * as Icons from "lucide-react";
import { StatsSkeleton } from "../skeleton";

interface Response {
    sucess: boolean;
    message: string;
    stats: {
        name: string;
        value: string;
        icon: keyof typeof icons;
        text?: string;
    }[];
}
export default function Stats() {
    const { data: adminStats, isLoading: isStatsLoading } = useQuery<Response>({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const response = await fetchApi("/api/home/stats");
            return response;
        },
    });

    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-light">Statistics</h2>
            {isStatsLoading ? (
                <StatsSkeleton />
            ) : (

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {adminStats?.stats.map((stat, index) => {
                        const Icon = Icons[stat.icon] as React.ElementType;
                        return (
                            <Card key={index} className="gap-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                        {stat.name}
                                    </span>
                                    <div className="rounded p-2 bg-primary/10">
                                        {Icon && (
                                            <Icon className="h-4 w-4 text-primary" />
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-3xl font-light text-foreground">
                                        {stat.value || 0}
                                    </p>
                                    {stat.text && (
                                        <p className="text-xs text-muted-foreground font-light">
                                            {stat.text}
                                        </p>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
