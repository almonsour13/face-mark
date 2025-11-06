"use client";

import { 
    Calendar, 
    TrendingUp, 
    Clock, 
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Target,
    Activity,
    Scan,
    Shield,
    AlertCircle,
    MapPin,
    Bell
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";

export default function UserHomePage() {
    const { data: session } = useSession();

    // Fetch user-specific stats
    const { data: userStats, isLoading: isStatsLoading } = useQuery({
        queryKey: ["user-stats"],
        queryFn: async () => {
            const response = await fetchApi("/api/user/stats");
            return response;
        },
    });

    // Fetch upcoming events
    const { data: upcomingEvents, isLoading: isEventsLoading } = useQuery({
        queryKey: ["upcoming-events"],
        queryFn: async () => {
            const response = await fetchApi("/api/event?status=1&sortBy=date-asc&count=5");
            return response.events;
        },
    });

    // Fetch recent attendance
    const { data: recentAttendance, isLoading: isAttendanceLoading } = useQuery({
        queryKey: ["recent-attendance"],
        queryFn: async () => {
            const response = await fetchApi("/api/attendance?count=5");
            return response.attendance;
        },
    });

    const stats = [
        {
            label: "Events Attended",
            value: userStats?.totalAttended || 0,
            change: "+3 this week",
            icon: Calendar,
            trend: "up"
        },
        {
            label: "Face Verified",
            value: `${userStats?.faceVerifiedRate || 0}%`,
            change: "All verified successfully",
            icon: Shield,
            trend: "up"
        },
        {
            label: "On-Time Rate",
            value: `${userStats?.onTimeRate || 0}%`,
            change: "Excellent performance",
            icon: Clock,
            trend: "neutral"
        },
        {
            label: "Upcoming Events",
            value: upcomingEvents?.length || 0,
            change: "This week",
            icon: Target,
            trend: "neutral"
        }
    ];

    const quickActions = [
        {
            title: "Browse Events",
            description: "View all available events",
            href: "/event",
            icon: Calendar
        },
        {
            title: "My Attendance",
            description: "Check your attendance records",
            href: "/attendance",
            icon: Activity
        },
        {
            title: "Profile Settings",
            description: "Update your information",
            href: "/settings",
            icon: Target
        }
    ];

    // if (isStatsLoading || isEventsLoading) {
    //     return (
    //         <div className="min-h-screen bg-background flex items-center justify-center">
    //             <p className="text-muted-foreground font-light">Loading your dashboard...</p>
    //         </div>
    //     );
    // }

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-6 lg:px-8 border-b border-border/30">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                            <Sparkles className="h-3 w-3" />
                            Face Mark Dashboard
                        </div>
                        
                        <div className="space-y-3">
                            <h1 className="text-4xl lg:text-5xl font-light">
                                Welcome back, <span className="text-foreground">{session?.user?.name || "User"}</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                Your facial recognition-powered attendance system. Track events, monitor attendance, and never miss a session.
                            </p>
                        </div>

                        {/* Student Info */}
                        {userStats?.studentDetails && (
                            <div className="pt-4 flex flex-wrap gap-3 text-sm font-light text-muted-foreground">
                                {userStats.studentDetails.studentId && (
                                    <span className="text-foreground">
                                        ID: {userStats.studentDetails.studentId}
                                    </span>
                                )}
                                {userStats.studentDetails.course && (
                                    <>
                                        <span>•</span>
                                        <span className="text-foreground">
                                            {userStats.studentDetails.course.name} ({userStats.studentDetails.course.code})
                                        </span>
                                    </>
                                )}
                                {userStats.studentDetails.level && (
                                    <>
                                        <span>•</span>
                                        <span className="text-foreground">
                                            {userStats.studentDetails.level.name}
                                        </span>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {stats.map((stat, index) => (
                            <div 
                                key={index}
                                className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <stat.icon className="h-5 w-5 text-muted-foreground" />
                                    {stat.trend === "up" && (
                                        <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-light">{stat.value}</p>
                                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                                        {stat.label}
                                    </p>
                                </div>
                                <p className="text-xs font-light text-muted-foreground">
                                    {stat.change}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Upcoming Events */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-light">Upcoming Events</h2>
                                <Link 
                                    href="/event"
                                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:gap-3"
                                >
                                    View all
                                    <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="space-y-4">
                                {upcomingEvents && upcomingEvents.length > 0 ? (
                                    upcomingEvents.map((event: any) => (
                                        <Link
                                            key={event.id}
                                            href={`/event/${event.id}`}
                                            className="block group"
                                        >
                                            <div className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="space-y-2 flex-1">
                                                        <h3 className="text-lg font-light group-hover:text-foreground transition-colors">
                                                            {event.name}
                                                        </h3>
                                                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-light">
                                                            <div className="flex items-center gap-2">
                                                                <Calendar className="h-3 w-3" />
                                                                <span>{new Date(event.eventDate).toLocaleDateString('en-US', {
                                                                    month: 'short',
                                                                    day: 'numeric',
                                                                    year: 'numeric'
                                                                })}</span>
                                                            </div>
                                                            {event.eventSessions && event.eventSessions.length > 0 && (
                                                                <div className="flex items-center gap-2">
                                                                    <Clock className="h-3 w-3" />
                                                                    <span>{event.eventSessions[0].startTime} - {event.eventSessions[0].endTime}</span>
                                                                </div>
                                                            )}
                                                            {event.location && (
                                                                <div className="flex items-center gap-2">
                                                                    <MapPin className="h-3 w-3" />
                                                                    <span>{event.location}</span>
                                                                </div>
                                                            )}
                                                            <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                                                                <Scan className="h-3 w-3" />
                                                                <span>Face Scan Required</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {event.eventType && (
                                                        <span className="px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide shrink-0">
                                                            {event.eventType.name}
                                                        </span>
                                                    )}
                                                </div>
                                                {event.description && (
                                                    <p className="text-sm text-muted-foreground font-light line-clamp-2">
                                                        {event.description}
                                                    </p>
                                                )}
                                                <div className="flex items-center justify-between pt-2 border-t border-border/20">
                                                    <span className="text-xs font-light text-muted-foreground">
                                                        {event.eventSessions?.length || 0} session(s)
                                                    </span>
                                                    <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2 group-hover:gap-3">
                                                        View details
                                                        <ArrowRight className="h-3 w-3" />
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="py-12 text-center border border-dashed border-border/30 rounded-lg">
                                        <Calendar className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                                        <h3 className="text-lg font-light mb-2">No Upcoming Events</h3>
                                        <p className="text-sm font-light text-muted-foreground">
                                            Check back later for new events
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Recent Activity */}
                            <div className="space-y-4">
                                <h2 className="text-2xl font-light">Recent Activity</h2>
                                
                                <div className="space-y-3">
                                    {recentAttendance && recentAttendance.length > 0 ? (
                                        recentAttendance.map((attendance: any) => {
                                            const isOnTime = attendance.status === 1;
                                            const isFaceVerified = attendance.method === 1;

                                            return (
                                                <div 
                                                    key={attendance.id}
                                                    className="p-4 border border-border/30 rounded-lg bg-card hover:border-border/50 transition-colors space-y-3"
                                                >
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="flex-1 space-y-1">
                                                            <p className="text-sm font-light">
                                                                {attendance.event?.name || 'Unknown Event'}
                                                            </p>
                                                            <p className="text-xs font-light text-muted-foreground">
                                                                {isFaceVerified ? 'Face Recognition' : 'Manual Entry'}
                                                            </p>
                                                        </div>
                                                        {isOnTime ? (
                                                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                                                        ) : (
                                                            <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
                                                        )}
                                                    </div>
                                                    <div className="flex items-center justify-between text-xs font-light text-muted-foreground">
                                                        <span>{new Date(attendance.event?.eventDate).toLocaleDateString()}</span>
                                                        <span>{new Date(attendance.createdAt).toLocaleTimeString('en-US', {
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="py-8 text-center border border-dashed border-border/30 rounded-lg">
                                            <Activity className="h-8 w-8 text-muted-foreground/20 mx-auto mb-2" />
                                            <p className="text-xs font-light text-muted-foreground">
                                                No recent activity
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-light">Quick Actions</h3>
                                <div className="space-y-2">
                                    {quickActions.map((action, index) => (
                                        <Link key={index} href={action.href} className="block">
                                            <button className="w-full px-4 py-3 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 hover:bg-muted/20 transition-all text-left flex items-center gap-3">
                                                <action.icon className="h-4 w-4 text-muted-foreground" />
                                                <div className="flex-1">
                                                    <p className="text-sm font-light">{action.title}</p>
                                                    <p className="text-xs text-muted-foreground font-light">
                                                        {action.description}
                                                    </p>
                                                </div>
                                                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                            </button>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Face Recognition Status */}
                            {userStats?.hasFaceData && (
                                <div className="p-4 border border-green-500/20 rounded-lg bg-green-500/10 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                                        <span className="text-sm font-light text-green-600 dark:text-green-400">
                                            Face Recognition Active
                                        </span>
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        Your face data is enrolled and ready for attendance verification
                                    </p>
                                </div>
                            )}

                            {!userStats?.hasFaceData && (
                                <div className="p-4 border border-yellow-500/20 rounded-lg bg-yellow-500/10 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                                        <span className="text-sm font-light text-yellow-600 dark:text-yellow-400">
                                            Face Recognition Not Set Up
                                        </span>
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground mb-2">
                                        Set up face recognition for faster attendance
                                    </p>
                                    <Link href="/settings/face-setup">
                                        <button className="w-full px-3 py-2 bg-yellow-600 dark:bg-yellow-400 text-white dark:text-black rounded-lg text-xs font-light hover:opacity-90 transition-opacity">
                                            Set Up Now
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}