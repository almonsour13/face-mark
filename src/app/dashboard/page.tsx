"use client";

import { Card } from "@/components/ui/card";
import { mockActivityFeed, mockDashboardStats } from "@/lib/mock-data";
import { 
    Clock, 
    TrendingUp, 
    Users, 
    Calendar,
    Plus,
    BookOpen,
    Layers,
    Tag,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    BarChart3
} from "lucide-react";
import { useEffect, useState } from "react";

const chartData = [
    { name: "Mon", attendance: 85, onTime: 78 },
    { name: "Tue", attendance: 92, onTime: 88 },
    { name: "Wed", attendance: 88, onTime: 82 },
    { name: "Thu", attendance: 95, onTime: 91 },
    { name: "Fri", attendance: 90, onTime: 85 },
];

const attendanceDistribution = [
    { name: "On Time", value: 87.3, fill: "var(--color-chart-1)" },
    { name: "Late", value: 12.7, fill: "var(--color-chart-2)" },
];

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const quickActions = [
        {
            title: "Add Course",
            description: "Create a new course",
            icon: BookOpen,
            color: "from-blue-500/10 to-cyan-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
            action: () => console.log("Add Course")
        },
        {
            title: "Add Level",
            description: "Create a new level",
            icon: Layers,
            color: "from-purple-500/10 to-pink-500/10",
            iconColor: "text-purple-600 dark:text-purple-400",
            action: () => console.log("Add Level")
        },
        {
            title: "Add Event Type",
            description: "Create event category",
            icon: Tag,
            color: "from-green-500/10 to-emerald-500/10",
            iconColor: "text-green-600 dark:text-green-400",
            action: () => console.log("Add Event Type")
        },
        {
            title: "Create Event",
            description: "Schedule new event",
            icon: Calendar,
            color: "from-orange-500/10 to-yellow-500/10",
            iconColor: "text-orange-600 dark:text-orange-400",
            action: () => console.log("Create Event")
        }
    ];

    if (isLoading) {
        return (
            <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
                    <p className="text-muted-foreground font-light">Loading dashboard...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Page Header */}
                <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                        <Sparkles className="h-3 w-3" />
                        Admin Dashboard
                    </div>
                    <div className="space-y-2">
                        <h1 className="text-4xl lg:text-5xl font-light text-foreground">
                            Dashboard
                        </h1>
                        <p className="text-lg text-muted-foreground font-light">
                            Face recognition-powered attendance overview and system management
                        </p>
                    </div>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <Card className="p-6 border border-border/30 hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                Total Events
                            </span>
                            <Calendar className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-light text-foreground">
                                {mockDashboardStats.totalEvents}
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                                This semester
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border/30 hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                Total Attendees
                            </span>
                            <Users className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-light text-foreground">
                                {mockDashboardStats.totalAttendees}
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                                Across all events
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border/30 hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                Face Verified
                            </span>
                            <Shield className="h-5 w-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-light text-foreground">
                                {mockDashboardStats.averageAttendance}%
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                                AI verification rate
                            </p>
                        </div>
                    </Card>

                    <Card className="p-6 border border-border/30 hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                On Time Rate
                            </span>
                            <Clock className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="space-y-1">
                            <p className="text-3xl font-light text-foreground">
                                {mockDashboardStats.onTimePercentage}%
                            </p>
                            <p className="text-xs text-muted-foreground font-light">
                                Punctuality score
                            </p>
                        </div>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-light">Quick Actions</h2>
                        <p className="text-sm font-light text-muted-foreground">
                            Manage system settings
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {quickActions.map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className="group p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card text-left"
                            >
                                <div className="space-y-4">
                                    <div className={`h-12 w-12 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <action.icon className={`h-6 w-6 ${action.iconColor}`} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-base font-light text-foreground group-hover:text-foreground transition-colors">
                                            {action.title}
                                        </h3>
                                        <p className="text-xs text-muted-foreground font-light">
                                            {action.description}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors group-hover:gap-3">
                                        <span>Configure</span>
                                        <ArrowRight className="h-3 w-3" />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Attendance Trend */}
                    <Card className="lg:col-span-2 p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                        <div className="border-b border-border/30 pb-4 flex items-center justify-between">
                            <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                <BarChart3 className="h-4 w-4" />
                                Attendance Trend
                            </h3>
                            <span className="text-xs font-light text-muted-foreground">
                                Last 7 days
                            </span>
                        </div>
                        <div className="h-64 flex items-center justify-center border border-dashed border-border/30 rounded-lg">
                            <p className="text-sm font-light text-muted-foreground">
                                Chart visualization area
                            </p>
                        </div>
                    </Card>

                    {/* Attendance Distribution */}
                    <Card className="p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                        <div className="border-b border-border/30 pb-4">
                            <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                <Zap className="h-4 w-4" />
                                Distribution
                            </h3>
                        </div>
                        <div className="h-64 flex flex-col items-center justify-center space-y-4">
                            <div className="space-y-3 w-full">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <span className="text-muted-foreground">On Time</span>
                                        <span className="text-green-600 dark:text-green-400">87.3%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-green-600 dark:bg-green-400" style={{width: '87.3%'}}></div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <span className="text-muted-foreground">Late</span>
                                        <span className="text-yellow-600 dark:text-yellow-400">12.7%</span>
                                    </div>
                                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-yellow-600 dark:bg-yellow-400" style={{width: '12.7%'}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Activity Feed */}
                <Card className="p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                    <div className="border-b border-border/30 pb-4 flex items-center justify-between">
                        <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground">
                            Recent Activity
                        </h3>
                        <button className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                            View all
                            <ArrowRight className="h-3 w-3" />
                        </button>
                    </div>
                    <div className="space-y-3">
                        {mockActivityFeed.map((activity) => (
                            <div
                                key={activity.id}
                                className="flex items-start gap-4 p-4 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg"
                            >
                                <div className="flex-1 space-y-1">
                                    <p className="text-sm font-light text-foreground">
                                        {activity.title}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        {activity.description}
                                    </p>
                                </div>
                                <span className="text-xs text-muted-foreground font-light whitespace-nowrap">
                                    {Math.round(
                                        (Date.now() -
                                            activity.timestamp.getTime()) /
                                            60000
                                    )}
                                    m ago
                                </span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </main>
    );
}