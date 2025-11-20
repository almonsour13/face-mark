// EventOverview.tsx
"use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Calendar, Activity, CheckCircle2, Clock } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
    value: { label: "value" },
    upcoming: { label: "Upcoming", color: "var(--chart-1)" },
    ongoing: { label: "Ongoing", color: "var(--chart-2)" },
    completed: { label: "Completed", color: "var(--chart-3)" },
} satisfies ChartConfig;

interface Response {
    success: boolean;
    overview: {
        total: number;
        upcoming: number;
        ongoing: number;
        completed: number;
    };
}

export default function EventOverview() {
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-event-overview"],
        queryFn: async () => await fetchApi("/api/dashboard/event/overview"),
    });

    const total = data?.overview.total ?? 0;
    const ongoing = data?.overview.ongoing ?? 0;
    const upcoming = data?.overview.upcoming ?? 0;
    const completed = data?.overview.completed ?? 0;

    const eventData = [
        {
            label: "Ongoing",
            value: ongoing,
            fill: "var(--color-ongoing)",
            icon: Activity,
        },
        {
            label: "Upcoming",
            value: upcoming,
            fill: "var(--color-upcoming)",
            icon: Clock,
        },
        {
            label: "Completed",
            value: completed,
            fill: "var(--color-completed)",
            icon: CheckCircle2,
        },
    ];

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Event Overview</h2>
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="w-full md:w-64 h-64" />
                        <div className="flex-1 space-y-3">
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                            <Skeleton className="h-20" />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (total === 0) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Event Overview</h2>
                <Card className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-base font-light mb-2">No Events</h3>
                        <p className="text-sm text-muted-foreground font-light">
                            Create your first event to see overview statistics
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Event Overview</h2>
            <Card className="p-4 h-full">
                <div className="flex flex-col md:flex-row gap-4 h-full">
                    {/* Chart */}
                    <div className="border rounded-md aspect-squaare flex items-center justify-center">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square h-52 md:h-68"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={eventData}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (
                                                viewBox &&
                                                "cx" in viewBox &&
                                                "cy" in viewBox
                                            ) {
                                                return (
                                                    <text
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        textAnchor="middle"
                                                        dominantBaseline="middle"
                                                    >
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={viewBox.cy}
                                                            className="fill-foreground text-3xl font-light"
                                                        >
                                                            {total.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
                                                            className="fill-muted-foreground text-xs"
                                                        >
                                                            Total Events
                                                        </tspan>
                                                    </text>
                                                );
                                            }
                                        }}
                                    />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 grid gap-2 h-full">
                        {eventData.map((item, index) => {
                            const percentage =
                                total > 0
                                    ? ((item.value / total) * 100).toFixed(1)
                                    : "0";
                            const Icon = item.icon;

                            return (
                                <Card key={index} className="p-4 gap-2 justify-center">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="p-2 rounded-lg bg-muted">
                                                <Icon className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-light text-muted-foreground">
                                                    {item.label}
                                                </p>
                                                <p className="text-xs text-muted-foreground font-light mt-0.5">
                                                    {percentage}% of total
                                                </p>
                                            </div>
                                        </div>
                                        <p className="text-2xl font-light">
                                            {item.value}
                                        </p>
                                    </div>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </Card>
        </div>
    );
}
