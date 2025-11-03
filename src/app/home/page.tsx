"use client";

import { signOut, useSession } from "next-auth/react";
import { 
    Calendar, 
    TrendingUp, 
    Clock, 
    CheckCircle2,
    ArrowRight,
    Sparkles,
    Users,
    Target,
    Activity,
    Bell
} from "lucide-react";
import Link from "next/link";

export default function Page() {
    const { data: session } = useSession();

    const upcomingEvents = [
        {
            id: 1,
            name: "Computer Science Seminar",
            date: "Nov 15, 2025",
            time: "2:00 PM - 4:00 PM",
            location: "Room 301, Building A",
            type: "Academic",
            status: "upcoming"
        },
        {
            id: 2,
            name: "Tech Innovation Workshop",
            date: "Nov 18, 2025",
            time: "9:00 AM - 12:00 PM",
            location: "Innovation Hub",
            type: "Workshop",
            status: "upcoming"
        },
        {
            id: 3,
            name: "Student Leadership Summit",
            date: "Nov 22, 2025",
            time: "1:00 PM - 5:00 PM",
            location: "Main Auditorium",
            type: "Conference",
            status: "upcoming"
        }
    ];

    const recentActivity = [
        {
            event: "Data Structures Lecture",
            date: "Nov 1, 2025",
            status: "present",
            time: "10:15 AM"
        },
        {
            event: "AI & Machine Learning Workshop",
            date: "Oct 28, 2025",
            status: "present",
            time: "2:30 PM"
        },
        {
            event: "Web Development Session",
            date: "Oct 25, 2025",
            status: "late",
            time: "9:45 AM"
        }
    ];

    const stats = [
        {
            label: "Events Attended",
            value: "24",
            change: "+3 this week",
            icon: Calendar,
            trend: "up"
        },
        {
            label: "Attendance Rate",
            value: "94%",
            change: "+2% from last month",
            icon: TrendingUp,
            trend: "up"
        },
        {
            label: "On-Time Rate",
            value: "89%",
            change: "Excellent performance",
            icon: Clock,
            trend: "neutral"
        },
        {
            label: "Upcoming Events",
            value: "3",
            change: "This week",
            icon: Target,
            trend: "neutral"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-6 lg:px-8 border-b border-border/30">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                            <Sparkles className="h-3 w-3" />
                            Welcome back
                        </div>
                        
                        <div className="space-y-3">
                            <h1 className="text-4xl lg:text-5xl font-light">
                                Hello, <span className="text-foreground">{session?.user?.name || "User"}</span>
                            </h1>
                            <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                Track your attendance, view upcoming events, and stay on top of your schedule.
                            </p>
                        </div>
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
                                {upcomingEvents.map((event) => (
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
                                                            <span>{event.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{event.time}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide">
                                                    {event.type}
                                                </span>
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-border/20">
                                                <span className="text-xs font-light text-muted-foreground">
                                                    {event.location}
                                                </span>
                                                <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2 group-hover:gap-3">
                                                    View details
                                                    <ArrowRight className="h-3 w-3" />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="space-y-6">
                            <h2 className="text-2xl font-light">Recent Activity</h2>
                            
                            <div className="space-y-3">
                                {recentActivity.map((activity, index) => (
                                    <div 
                                        key={index}
                                        className="p-4 border border-border/30 rounded-lg bg-card hover:border-border/50 transition-colors space-y-3"
                                    >
                                        <div className="flex items-start justify-between gap-2">
                                            <p className="text-sm font-light flex-1">
                                                {activity.event}
                                            </p>
                                            {activity.status === "present" ? (
                                                <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0" />
                                            ) : (
                                                <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400 shrink-0" />
                                            )}
                                        </div>
                                        <div className="flex items-center justify-between text-xs font-light text-muted-foreground">
                                            <span>{activity.date}</span>
                                            <span>{activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Quick Actions */}
                            <div className="pt-6 space-y-4">
                                <h3 className="text-lg font-light">Quick Actions</h3>
                                <div className="space-y-2">
                                    <Link href="/event" className="block">
                                        <button className="w-full px-4 py-3 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 hover:bg-muted/20 transition-all text-left flex items-center justify-between">
                                            Browse Events
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <Link href="/attendance" className="block">
                                        <button className="w-full px-4 py-3 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 hover:bg-muted/20 transition-all text-left flex items-center justify-between">
                                            View Attendance
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                    <Link href="/setting" className="block">
                                        <button className="w-full px-4 py-3 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 hover:bg-muted/20 transition-all text-left flex items-center justify-between">
                                            Settings
                                            <ArrowRight className="h-4 w-4" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}