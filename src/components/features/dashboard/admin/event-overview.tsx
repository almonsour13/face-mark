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

const chartConfig = {
    value: {
        label: "value",
    },
    ontime: {
        label: "On Time",
        color: "var(--chart-1)",
    },
    late: {
        label: "Late",
        color: "var(--chart-2)",
    },
} satisfies ChartConfig;

interface Response {
    success: boolean;
}

export default function EventOverview() {
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-event-overview"],
        queryFn: async () => {
            const response = await fetchApi(
                "/api/dashboard/event/overview"
            );
            return response;
        },
    });


    return (
        <div className="flex-1 flex w-full md:w-auto  flex-col gap-2">
            <h2 className="text-xl font-light">Event Overview</h2>
            <div className="flex-1 flex flex-col p-4 border rounded-md bg-card gap-4">
                <div className="">

                </div>
            </div>
        </div>
    );
}
