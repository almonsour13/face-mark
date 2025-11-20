import React from 'react';
import { 
    Users, 
    Calendar, 
    TrendingUp, 
    TrendingDown,
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
    Bell,
    BarChart3,
    PieChart,
    UserCheck,
    UserX,
    Eye,
    Settings,
    Plus,
    ArrowUpRight,
    ArrowDownRight,
    Zap,
    Award,
    AlertTriangle
} from "lucide-react";

export default function AdminHomePage() {
    // Mock data - replace with actual API calls
    const adminStats = {
        totalUsers: 1248,
        totalEvents: 87,
        activeEvents: 12,
        completedEvents: 65,
        totalAttendance: 5432,
        faceRecognitionRate: 94.5,
        averageAttendanceRate: 87.3,
        newUsersThisWeek: 23,
        pendingVerifications: 8,
        systemUptime: 99.9,
        criticalAlerts: 2,
        totalSessions: 234
    };

    const recentEvents = [
        {
            id: 1,
            name: "Computer Science Seminar",
            date: "2024-11-15",
            time: "09:00 AM - 12:00 PM",
            location: "Room 301",
            attendees: 145,
            capacity: 150,
            status: "ongoing",
            type: "Seminar"
        },
        {
            id: 2,
            name: "Engineering Workshop",
            date: "2024-11-16",
            time: "02:00 PM - 05:00 PM",
            location: "Lab 4",
            attendees: 89,
            capacity: 100,
            status: "upcoming",
            type: "Workshop"
        },
        {
            id: 3,
            name: "Business Analytics Conference",
            date: "2024-11-14",
            time: "10:00 AM - 04:00 PM",
            location: "Auditorium",
            attendees: 234,
            capacity: 250,
            status: "completed",
            type: "Conference"
        }
    ];

    const recentActivity = [
        {
            id: 1,
            type: "attendance",
            user: "John Doe",
            event: "CS Seminar",
            action: "checked in via face recognition",
            time: "5 minutes ago",
            status: "success"
        },
        {
            id: 2,
            type: "event",
            user: "Admin",
            event: "New Workshop",
            action: "created new event",
            time: "15 minutes ago",
            status: "info"
        },
        {
            id: 3,
            type: "verification",
            user: "Jane Smith",
            event: null,
            action: "face data verified",
            time: "1 hour ago",
            status: "success"
        },
        {
            id: 4,
            type: "alert",
            user: "System",
            event: "Database",
            action: "backup completed",
            time: "2 hours ago",
            status: "info"
        }
    ];

    const topStats = [
        {
            label: "Total Users",
            value: adminStats.totalUsers.toLocaleString(),
            change: `+${adminStats.newUsersThisWeek} this week`,
            changeType: "positive",
            icon: Users,
            trend: "up",
            percentage: "+12.5%"
        },
        {
            label: "Active Events",
            value: adminStats.activeEvents,
            change: `${adminStats.totalEvents} total events`,
            changeType: "neutral",
            icon: Calendar,
            trend: "neutral",
            percentage: "14% of total"
        },
        {
            label: "Attendance Rate",
            value: `${adminStats.averageAttendanceRate}%`,
            change: "+5.2% from last month",
            changeType: "positive",
            icon: TrendingUp,
            trend: "up",
            percentage: "+5.2%"
        },
        {
            label: "Face Recognition",
            value: `${adminStats.faceRecognitionRate}%`,
            change: "Excellent performance",
            changeType: "positive",
            icon: Scan,
            trend: "up",
            percentage: "+2.1%"
        }
    ];

    const quickActions = [
        {
            title: "Create Event",
            description: "Schedule a new event",
            href: "/admin/events/create",
            icon: Plus,
            color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20"
        },
        {
            title: "Manage Users",
            description: "View and edit users",
            href: "/admin/users",
            icon: Users,
            color: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20"
        },
        {
            title: "View Reports",
            description: "Generate analytics reports",
            href: "/admin/reports",
            icon: BarChart3,
            color: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20"
        },
        {
            title: "System Settings",
            description: "Configure system",
            href: "/admin/settings",
            icon: Settings,
            color: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20"
        }
    ];

    const attendanceTrends = [
        { month: "Jun", rate: 82 },
        { month: "Jul", rate: 85 },
        { month: "Aug", rate: 83 },
        { month: "Sep", rate: 88 },
        { month: "Oct", rate: 87 },
        { month: "Nov", rate: 91 }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section className="pt-20 pb-12 px-6 lg:px-8 border-b border-border/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                                <Shield className="h-3 w-3" />
                                Admin Dashboard
                            </div>
                            
                            <div className="space-y-3">
                                <h1 className="text-4xl lg:text-5xl font-light">
                                    System <span className="text-foreground">Overview</span>
                                </h1>
                                <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                    Monitor and manage your Face Mark attendance system. Track users, events, and system performance in real-time.
                                </p>
                            </div>

                            <div className="pt-4 flex flex-wrap gap-4 text-sm font-light">
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                                    <span className="text-muted-foreground">System Online</span>
                                </div>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">
                                    Uptime: <span className="text-foreground">{adminStats.systemUptime}%</span>
                                </span>
                                <span className="text-muted-foreground">•</span>
                                <span className="text-muted-foreground">
                                    Last updated: <span className="text-foreground">Just now</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Stats */}
            <section className="py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {topStats.map((stat, index) => (
                            <div 
                                key={index}
                                className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="p-2 rounded-lg bg-muted/30">
                                        <stat.icon className="h-5 w-5 text-muted-foreground" />
                                    </div>
                                    {stat.trend === "up" && (
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                            <ArrowUpRight className="h-4 w-4" />
                                            <span className="text-xs font-light">{stat.percentage}</span>
                                        </div>
                                    )}
                                    {stat.trend === "down" && (
                                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                            <ArrowDownRight className="h-4 w-4" />
                                            <span className="text-xs font-light">{stat.percentage}</span>
                                        </div>
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
                        {/* Recent Events */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-light">Recent Events</h2>
                                <button className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:gap-3">
                                    Manage all
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentEvents.map((event) => {
                                    const attendancePercentage = (event.attendees / event.capacity) * 100;
                                    const statusColors = {
                                        ongoing: 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400',
                                        upcoming: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
                                        completed: 'bg-gray-500/10 border-gray-500/20 text-gray-600 dark:text-gray-400'
                                    };

                                    return (
                                        <div
                                            key={event.id}
                                            className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4"
                                        >
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="space-y-2 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <h3 className="text-lg font-light">
                                                            {event.name}
                                                        </h3>
                                                        <span className={`px-2 py-1 rounded-full border text-xs font-light uppercase tracking-wide`}>
                                                            {event.status}
                                                        </span>
                                                    </div>
                                                    <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-light">
                                                        <div className="flex items-center gap-2">
                                                            <Calendar className="h-3 w-3" />
                                                            <span>{event.date}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-3 w-3" />
                                                            <span>{event.time}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <MapPin className="h-3 w-3" />
                                                            <span>{event.location}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide shrink-0">
                                                    {event.type}
                                                </span>
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between text-xs font-light">
                                                    <span className="text-muted-foreground">Attendance</span>
                                                    <span className="text-foreground">
                                                        {event.attendees} / {event.capacity} ({Math.round(attendancePercentage)}%)
                                                    </span>
                                                </div>
                                                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                    <div 
                                                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                                        style={{ width: `${attendancePercentage}%` }}
                                                    />
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-2 pt-2 border-t border-border/20">
                                                <button className="flex-1 px-4 py-2 text-xs font-light border border-border/30 rounded-lg hover:bg-muted/20 transition-colors">
                                                    View Details
                                                </button>
                                                <button className="flex-1 px-4 py-2 text-xs font-light border border-border/30 rounded-lg hover:bg-muted/20 transition-colors">
                                                    Manage Attendance
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-light">Quick Actions</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {quickActions.map((action, index) => (
                                        <button
                                            key={index}
                                            className={`p-4 rounded-lg border transition-all text-left space-y-2 ${action.color}`}
                                        >
                                            <action.icon className="h-5 w-5" />
                                            <p className="text-xs font-light">{action.title}</p>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-light">Recent Activity</h3>
                                <div className="space-y-2">
                                    {recentActivity.map((activity) => (
                                        <div 
                                            key={activity.id}
                                            className="p-3 border border-border/30 rounded-lg bg-card hover:border-border/50 transition-colors space-y-2"
                                        >
                                            <div className="flex items-start gap-2">
                                                <div className={`p-1.5 rounded-full ${
                                                    activity.status === 'success' 
                                                        ? 'bg-green-500/10' 
                                                        : 'bg-blue-500/10'
                                                }`}>
                                                    {activity.status === 'success' ? (
                                                        <CheckCircle2 className="h-3 w-3 text-green-500" />
                                                    ) : (
                                                        <Bell className="h-3 w-3 text-blue-500" />
                                                    )}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <p className="text-xs font-light">
                                                        <span className="text-foreground">{activity.user}</span>
                                                        {' '}<span className="text-muted-foreground">{activity.action}</span>
                                                    </p>
                                                    {activity.event && (
                                                        <p className="text-xs font-light text-muted-foreground">
                                                            {activity.event}
                                                        </p>
                                                    )}
                                                    <p className="text-xs font-light text-muted-foreground">
                                                        {activity.time}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* System Health */}
                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-light">System Health</h3>
                                    <Zap className="h-4 w-4 text-green-500" />
                                </div>
                                <div className="space-y-3">
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-light">
                                            <span className="text-muted-foreground">Server Load</span>
                                            <span className="text-foreground">45%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[45%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-light">
                                            <span className="text-muted-foreground">Storage</span>
                                            <span className="text-foreground">78%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-yellow-500 w-[78%]" />
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex items-center justify-between text-xs font-light">
                                            <span className="text-muted-foreground">Database</span>
                                            <span className="text-foreground">32%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[32%]" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Top Performers */}
                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-light">Top Attendance</h3>
                                    <Award className="h-4 w-4 text-yellow-500" />
                                </div>
                                <div className="space-y-3">
                                    {[
                                        { name: "John Doe", rate: 98, events: 45 },
                                        { name: "Jane Smith", rate: 96, events: 42 },
                                        { name: "Mike Johnson", rate: 94, events: 40 }
                                    ].map((user, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-light">
                                                {index + 1}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-xs font-light">{user.name}</p>
                                                <p className="text-xs font-light text-muted-foreground">
                                                    {user.events} events
                                                </p>
                                            </div>
                                            <span className="text-xs font-light text-green-600 dark:text-green-400">
                                                {user.rate}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}