"use client";

import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import {
    Clock,
    AlertCircle,
    CheckCircle2,
    TrendingUp,
    AlertTriangle,
} from "lucide-react";
import { Pie, PieChart, Cell, Label } from "recharts";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserWithDetails } from "@/store/use-user-store";
import UserCard from "@/components/card/user-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface Response {
    success: boolean;
    users: UserWithDetails[];
}

export default function RecentUsers() {
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-recent-users"],
        queryFn: async () => {
            const response = await fetchApi(
                "/api/user?limit=5&sortBy=date-desc"
            );
            return response;
        },
    });

    return (
        <div className="flex-1 flex w-full md:w-auto  flex-col gap-2">
            <div className="w-full flex items-end justify-between">
                <h2 className="text-xl font-light">Recent Users</h2>
                <Link
                    href={`/user?sortBy=date-desc`}
                    className="text-sm text-muted-foreground"
                >
                    View All
                </Link>
            </div>
            <Card className="flex-1 max-h-full">
                <ScrollArea>
                    <div className="grid gap-2 max-h-96">
                        {data?.users.map((user) => (
                            <UserCard key={user.id} user={user} className="border"/>
                        ))}
                    </div>
                </ScrollArea>
            </Card>
        </div>
    );
}
