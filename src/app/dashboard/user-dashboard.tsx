"use client";

import { Card } from "@/components/ui/card";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import { 
    Clock, 
    TrendingUp, 
    Users, 
    Calendar,
    BookOpen,
    Layers,
    Tag,
    ArrowRight,
    Sparkles,
    Shield,
    Zap,
    BarChart3,
    UserCheck,
    Activity,
    AlertCircle,
    CheckCircle2
} from "lucide-react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import Link from "next/link";

interface DashboardStats {
    totalEvents: number;
    totalUsers: number;
    totalAttendance: number;
    faceVerifiedRate: number;
    onTimeRate: number;
    activeEvents: number;
    totalCourses: number;
    totalLevels: number;
}

interface RecentActivity {
    id: string;
    type: string;
    title: string;
    description: string;
    timestamp: Date;
    user?: {
        name: string;
    };
}

export default function DashboardPage() {
    const { data: stats, isLoading: isStatsLoading } = useQuery<DashboardStats>({
        queryKey: ["dashboard-stats"],
        queryFn: async () => {
            const response = await fetchApi("/api/dashboard/stats");
            return response;
        },
    });

    const { data: activities, isLoading: isActivitiesLoading } = useQuery<RecentActivity[]>({
        queryKey: ["recent-activities"],
        queryFn: async () => {
            const response = await fetchApi("/api/dashboard/activities");
            return response;
        },
    });

    const { data: attendanceTrend } = useQuery({
        queryKey: ["attendance-trend"],
        queryFn: async () => {
            const response = await fetchApi("/api/dashboard/attendance-trend");
            return response;
        },
    });

    const quickActions = [
        {
            title: "Add Course",
            description: "Create a new course",
            icon: BookOpen,
            color: "from-blue-500/10 to-cyan-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
            href: "/course/create"
        },
        {
            title: "Add Level",
            description: "Create a new level",
            icon: Layers,
            color: "from-purple-500/10 to-pink-500/10",
            iconColor: "text-purple-600 dark:text-purple-400",
            href: "/level/create"
        },
        {
            title: "Add Event Type",
            description: "Create event category",
            icon: Tag,
            color: "from-green-500/10 to-emerald-500/10",
            iconColor: "text-green-600 dark:text-green-400",
            href: "/event-type/create"
        },
        {
            title: "Create Event",
            description: "Schedule new event",
            icon: Calendar,
            color: "from-orange-500/10 to-yellow-500/10",
            iconColor: "text-orange-600 dark:text-orange-400",
            href: "/event/create"
        }
    ];

    // if (isStatsLoading) {
    //     return (
    //         <div className="w-full min-h-screen">
    //             <Header>
    //                 <div className="w-full mx-auto flex items-center justify-between">
    //                     <div className="flex items-center gap-2">
    //                         <SidebarTriggerButton />
    //                         <HeaderTitle>Dashboard</HeaderTitle>
    //                     </div>
    //                 </div>
    //             </Header>
    //             <PageWrapper>
    //                 <div className="flex items-center justify-center h-96">
    //                     <p className="text-muted-foreground font-light">Loading dashboard...</p>
    //                 </div>
    //             </PageWrapper>
    //         </div>
    //     );
    // }

    return (
        <div className="w-full min-h-screen">
            <Header className="border-b-0">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>Dashboard</HeaderTitle>
                    </div>
                </div>
            </Header>

            <div className="min-h-screen bg-background">
                {/* Page Header */}
                <section className="pt-20 pb-12 px-6 lg:px-8 border-b border-border/30">
                    <div className="max-w-7xl mx-auto">
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
                    </div>
                </section>

                <PageWrapper>
                    <div className="space-y-8">
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
                                        {stats?.totalEvents || 0}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        {stats?.activeEvents || 0} active events
                                    </p>
                                </div>
                            </Card>

                            <Card className="p-6 border border-border/30 hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-xs font-light uppercase tracking-wide text-muted-foreground">
                                        Total Users
                                    </span>
                                    <Users className="h-5 w-5 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-light text-foreground">
                                        {stats?.totalUsers || 0}
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        Registered in system
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
                                        {stats?.faceVerifiedRate || 0}%
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
                                        {stats?.onTimeRate || 0}%
                                    </p>
                                    <p className="text-xs text-muted-foreground font-light">
                                        Punctuality score
                                    </p>
                                </div>
                            </Card>
                        </div>

                        {/* System Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <Card className="p-4 border border-border/30 bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-light">{stats?.totalCourses || 0}</p>
                                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                                        Courses
                                    </p>
                                </div>
                            </Card>

                            <Card className="p-4 border border-border/30 bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <Layers className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-light">{stats?.totalLevels || 0}</p>
                                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                                        Levels
                                    </p>
                                </div>
                            </Card>

                            <Card className="p-4 border border-border/30 bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <UserCheck className="h-5 w-5 text-green-600 dark:text-green-400" />
                                    <Activity className="h-4 w-4 text-muted-foreground" />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-light">{stats?.totalAttendance || 0}</p>
                                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                                        Total Attendance
                                    </p>
                                </div>
                            </Card>

                            <Link href="/event/create" className="block">
                                <Card className="p-4 border border-border/30 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 hover:border-border/50 transition-all hover:shadow-lg space-y-3 h-full">
                                    <div className="flex items-center justify-between">
                                        <Calendar className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                        <ArrowRight className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-sm font-light text-foreground">Create Event</p>
                                        <p className="text-xs font-light text-muted-foreground">
                                            Schedule new event
                                        </p>
                                    </div>
                                </Card>
                            </Link>
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
                                    <Link
                                        key={index}
                                        href={action.href}
                                        className="group p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card text-left block"
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
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Charts Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Attendance Distribution */}
                            <Card className="lg:col-span-2 p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                                <div className="border-b border-border/30 pb-4 flex items-center justify-between">
                                    <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                        <BarChart3 className="h-4 w-4" />
                                        Attendance Overview
                                    </h3>
                                    <span className="text-xs font-light text-muted-foreground">
                                        Last 30 days
                                    </span>
                                </div>
                                <div className="space-y-4">
                                    <div className="space-y-3">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-light">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                                                    <span className="text-muted-foreground">Face Recognition</span>
                                                </div>
                                                <span className="text-green-600 dark:text-green-400">
                                                    {stats?.faceVerifiedRate || 0}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-green-600 dark:bg-green-400" 
                                                    style={{width: `${stats?.faceVerifiedRate || 0}%`}}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-light">
                                                <div className="flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                                    <span className="text-muted-foreground">On Time</span>
                                                </div>
                                                <span className="text-blue-600 dark:text-blue-400">
                                                    {stats?.onTimeRate || 0}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-blue-600 dark:bg-blue-400" 
                                                    style={{width: `${stats?.onTimeRate || 0}%`}}
                                                ></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-light">
                                                <div className="flex items-center gap-2">
                                                    <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                                    <span className="text-muted-foreground">Late</span>
                                                </div>
                                                <span className="text-yellow-600 dark:text-yellow-400">
                                                    {100 - (stats?.onTimeRate || 0)}%
                                                </span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className="h-full bg-yellow-600 dark:bg-yellow-400" 
                                                    style={{width: `${100 - (stats?.onTimeRate || 0)}%`}}
                                                ></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* Quick Stats */}
                            <Card className="p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                                <div className="border-b border-border/30 pb-4">
                                    <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground flex items-center gap-2">
                                        <Zap className="h-4 w-4" />
                                        Quick Stats
                                    </h3>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                                        <span className="text-sm font-light text-muted-foreground">Active Events</span>
                                        <span className="text-lg font-light text-foreground">{stats?.activeEvents || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                                        <span className="text-sm font-light text-muted-foreground">Total Courses</span>
                                        <span className="text-lg font-light text-foreground">{stats?.totalCourses || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                                        <span className="text-sm font-light text-muted-foreground">Total Levels</span>
                                        <span className="text-lg font-light text-foreground">{stats?.totalLevels || 0}</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 border border-border/30 rounded-lg">
                                        <span className="text-sm font-light text-muted-foreground">Attendance Records</span>
                                        <span className="text-lg font-light text-foreground">{stats?.totalAttendance || 0}</span>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Recent Activity */}
                        <Card className="p-6 border border-border/30 hover:border-border/50 transition-all bg-card space-y-4">
                            <div className="border-b border-border/30 pb-4 flex items-center justify-between">
                                <h3 className="text-sm font-light uppercase tracking-wide text-muted-foreground">
                                    Recent Activity
                                </h3>
                                <Link href="/activity" className="text-xs font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
                                    View all
                                    <ArrowRight className="h-3 w-3" />
                                </Link>
                            </div>
                            {isActivitiesLoading ? (
                                <div className="py-8 text-center">
                                    <p className="text-sm font-light text-muted-foreground">Loading activities...</p>
                                </div>
                            ) : activities && activities.length > 0 ? (
                                <div className="space-y-3">
                                    {activities.slice(0, 5).map((activity) => (
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
                                                {new Date(activity.timestamp).toLocaleString()}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm font-light text-muted-foreground">No recent activity</p>
                                </div>
                            )}
                        </Card>
                    </div>
                </PageWrapper>
            </div>
        </div>
    );
}