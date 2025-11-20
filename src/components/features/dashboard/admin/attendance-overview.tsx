
// AttendanceOverview.tsx
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
import { AlertCircle, CheckCircle2, Clock, Scan, User } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";

const chartConfig = {
    value: { label: "value" },
    ontime: { label: "On Time", color: "var(--chart-4)" },
    late: { label: "Late", color: "var(--chart-5)" },
} satisfies ChartConfig;

interface Response {
    success: boolean;
    overview: {
        totalAttendance: number;
        ontime: number;
        late: number;
        method: { name: string; value: number; }[];
    };
}

const METHOD_ICONS: Record<string, any> = {
    "Face Recognition": Scan,
    "Manual Entry": User,
    "QR Code": Scan,
};

export default function AttendanceOverview() {
    const { data, isLoading } = useQuery<Response>({
        queryKey: ["dashboard-attendance-overview"],
        queryFn: async () => await fetchApi("/api/dashboard/attendance/overview"),
    });

    const totalAttendance = data?.overview.totalAttendance ?? 0;
    const ontime = data?.overview.ontime ?? 0;
    const late = data?.overview.late ?? 0;
    const methods = data?.overview.method ?? [];

    const ontimePercentage = totalAttendance > 0 ? ((ontime / totalAttendance) * 100).toFixed(1) : "0";
    const latePercentage = totalAttendance > 0 ? ((late / totalAttendance) * 100).toFixed(1) : "0";

    const attendanceData = [
        { label: "On Time", value: ontime, fill: "var(--color-ontime)" },
        { label: "Late", value: late, fill: "var(--color-late)" },
    ].filter(item => item.value > 0);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Attendance Overview</h2>
                <Card className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <Skeleton className="w-full md:w-64 h-64" />
                        <div className="flex-1 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <Skeleton className="h-20" />
                                <Skeleton className="h-20" />
                            </div>
                            <Skeleton className="h-32" />
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    if (totalAttendance === 0) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Attendance Overview</h2>
                <Card className="p-12">
                    <div className="flex flex-col items-center justify-center text-center">
                        <CheckCircle2 className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-base font-light mb-2">No Attendance Data</h3>
                        <p className="text-sm text-muted-foreground font-light">
                            Attendance records will appear once students start checking in
                        </p>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Attendance Overview</h2>
            <Card className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                    {/* Chart */}
                    <div className="border rounded-md aspect-squaare flex items-center justify-center">
                        <ChartContainer config={chartConfig} className="mx-auto aspect-square h-52 md:h-68">
                            <PieChart>
                                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                                <Pie data={attendanceData} dataKey="value" nameKey="label" innerRadius={60} strokeWidth={5}>
                                    <Label content={({ viewBox }) => {
                                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                            return (
                                                <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-light">
                                                        {totalAttendance.toLocaleString()}
                                                    </tspan>
                                                    <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground text-xs">
                                                        Total Attendance
                                                    </tspan>
                                                </text>
                                            );
                                        }
                                    }} />
                                </Pie>
                            </PieChart>
                        </ChartContainer>
                    </div>

                    {/* Stats */}
                    <div className="flex-1 flex flex-col gap-2">
                        {/* On Time / Late Cards */}
                        <div className="grid grid-cols-2 gap-2">
                            <Card className="p-4 gap-2">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    <span className="text-xs font-light text-muted-foreground uppercase">On Time</span>
                                </div>
                                <p className="text-2xl font-light">{ontime}</p>
                                <p className="text-xs text-muted-foreground font-light">{ontimePercentage}% of total</p>
                            </Card>
                            <Card className="p-4 gap-2">
                                <div className="flex items-center gap-2">
                                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                    <span className="text-xs font-light text-muted-foreground uppercase">Late</span>
                                </div>
                                <p className="text-2xl font-light">{late}</p>
                                <p className="text-xs text-muted-foreground font-light">{latePercentage}% of total</p>
                            </Card>
                        </div>

                        {/* Methods */}
                        <div className="flex-1 space-y-2">
                            {methods.length > 0 ? (
                                methods.map((method, index) => {
                                    const percentage = totalAttendance > 0
                                        ? ((method.value / totalAttendance) * 100).toFixed(1)
                                        : "0";
                                    const Icon = METHOD_ICONS[method.name] || Scan;

                                    return (
                                        <div key={index} className="p-3 border rounded-md space-y-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Icon className="h-3.5 w-3.5 text-muted-foreground" />
                                                    <span className="font-light">{method.name}</span>
                                                </div>
                                                <span className="font-medium">{percentage}%</span>
                                            </div>
                                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-primary transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                            <p className="text-xs text-muted-foreground font-light">{method.value} check-ins</p>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center border border-dashed border-border/30 rounded-lg">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground/20 mb-2" />
                                    <p className="text-sm text-muted-foreground font-light">No method data</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}