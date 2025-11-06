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
import { Card } from "@/components/ui/card";

const chartConfig = {
    value: {
        label: "value",
    },
    ontime: {
        label: "On Time",
        color: "var(--chart-4)",
    },
    late: {
        label: "Late",
        color: "var(--chart-5)",
    },
} satisfies ChartConfig;

interface Response {
    success: boolean;
    overview: {
        totalAttendance: number;
        ontime: number;
        late: number;
        method: {
            name: string;
            value: number;
        }[];
    };
}

export default function AttendanceOverview() {
    const [selectedEvent, setSelectedEvent] = useState<string | null>("All");
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-attendance-overview"],
        queryFn: async () => {
            const response = await fetchApi(
                "/api/dashboard/attendance/overview"
            );
            return response;
        },
    });

    const stats = [
        {
            name: "Total",
            value: data?.overview.totalAttendance ?? 0,
        },
        {
            name: "On time",
            value: data?.overview.ontime ?? 0,
        },
        {
            name: "Late",
            value: data?.overview.late ?? 0,
        },
    ];
    const attendanceData = [
        {
            label: "On Time",
            value: data?.overview.ontime ?? 0,
            fill: "var(--color-ontime)",
        },
        {
            label: "Late",
            value: data?.overview.late ?? 0,
            fill: "var(--color-late)",
        },
    ];

    const totalAttendance = data?.overview.totalAttendance ?? 0;
    const methods = data?.overview.method ?? [];

    return (
        <div className="flex-1 flex w-full md:w-auto  flex-col gap-2">
            <h2 className="text-xl font-light">Attendance Overview</h2>
            <Card className="flex-1">
                <div className="hidden flex justify-between">
                    <div className=""></div>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon-sm">
                            asd
                        </Button>
                    </div>
                </div>
                <div className="flex flexa-col items-start gap-2">
                    <div className="flex-1 rounded-md border">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square h-52 md:h-60"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={attendanceData}
                                    dataKey="value"
                                    nameKey="label"
                                    innerRadius={60}
                                    strokeWidth={5}
                                    className=""
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
                                                            className="fill-foreground text-3xl font-bold"
                                                        >
                                                            {totalAttendance.toLocaleString()}
                                                        </tspan>
                                                        <tspan
                                                            x={viewBox.cx}
                                                            y={
                                                                (viewBox.cy ||
                                                                    0) + 24
                                                            }
                                                            className="fill-muted-foreground"
                                                        >
                                                           Total Attendance
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
                    <div className="h-full w-full flex flex-col gap-2">
                        <div className="w-full grid divide-y md:divide-y-0 grid-cols-1 md:grid-cols-3   border rounded-md">
                            {stats.map((stat) => (
                                <div className="p-3 flex flex-col">
                                    <p className="text-xs font-light text-muted-foreground uppercase">
                                        {stat.name}
                                    </p>
                                    <p className="text-xl md:text-2xl font-light">
                                        {stat.value}
                                    </p>
                                </div>
                            ))}
                        </div>
                        <div className="h-full hidden md:flex justify-between flex-col gap-2 p-4 border rounded-md bg-card">
                            {methods.length > 0 ? (
                                methods.map((m, index) => {
                                    const percentage =
                                        totalAttendance > 0
                                            ? (
                                                  (m.value / totalAttendance) *
                                                  100
                                              ).toFixed(1)
                                            : 0;
                                    return (
                                        <div key={index} className="space-y-1">
                                            <div className="flex items-center justify-between">
                                                <p className="text-sm font-light">
                                                    {m.name}
                                                </p>
                                                <span className="text-sm font-light">
                                                    {percentage}%
                                                </span>
                                            </div>
                                            <div className="h-2 rounded-full bg-muted/50 overflow-hidden">
                                                <div
                                                    className="h-full bg-foreground/80 transition-all duration-300 rounded-full"
                                                    style={{
                                                        width: `${percentage}%`,
                                                    }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground font-light">
                                                {m.value} check-ins
                                            </p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-12 text-center">
                                    <AlertCircle className="h-10 w-10 text-muted-foreground/50 mb-3" />
                                    <p className="text-sm text-muted-foreground font-light">
                                        No method data available
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 font-light mt-1">
                                        Data will appear once attendance is
                                        recorded
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
