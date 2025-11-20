"use client";

import React, { useState } from 'react';
import { 
    Users, 
    Calendar, 
    TrendingUp, 
    TrendingDown,
    Clock, 
    CheckCircle2,
    ArrowRight,
    Target,
    Activity,
    Scan,
    Shield,
    AlertCircle,
    BarChart3,
    PieChart,
    UserCheck,
    UserX,
    Download,
    Filter,
    RefreshCw,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    Award,
    MapPin,
    Zap,
    Database,
    Server,
    HardDrive,
    Plus
} from "lucide-react";

export default function AdminAnalyticsDashboard() {
    const [timeRange, setTimeRange] = useState("7d");
    const [selectedMetric, setSelectedMetric] = useState("attendance");

    // Mock analytics data
    const analyticsData = {
        overview: {
            totalUsers: 1248,
            activeUsers: 987,
            inactiveUsers: 261,
            totalEvents: 87,
            completedEvents: 65,
            ongoingEvents: 12,
            upcomingEvents: 10,
            totalAttendance: 5432,
            averageAttendanceRate: 87.3,
            faceRecognitionRate: 94.5,
            averageEventDuration: 3.2,
            peakAttendanceTime: "09:00 AM"
        },
        trends: {
            userGrowth: [
                { month: "May", users: 980, growth: 5.2 },
                { month: "Jun", users: 1045, growth: 6.6 },
                { month: "Jul", users: 1120, growth: 7.2 },
                { month: "Aug", users: 1168, growth: 4.3 },
                { month: "Sep", users: 1205, growth: 3.2 },
                { month: "Oct", users: 1248, growth: 3.6 }
            ],
            attendanceRate: [
                { month: "May", rate: 82, events: 12 },
                { month: "Jun", rate: 85, events: 14 },
                { month: "Jul", rate: 83, events: 15 },
                { month: "Aug", rate: 88, events: 16 },
                { month: "Sep", rate: 87, events: 14 },
                { month: "Oct", rate: 91, events: 16 }
            ],
            eventTypes: [
                { type: "Seminar", count: 25, percentage: 28.7 },
                { type: "Workshop", count: 22, percentage: 25.3 },
                { type: "Conference", count: 18, percentage: 20.7 },
                { type: "Training", count: 15, percentage: 17.2 },
                { type: "Other", count: 7, percentage: 8.1 }
            ]
        },
        departments: [
            { name: "Computer Science", students: 342, attendanceRate: 92, events: 28 },
            { name: "Engineering", students: 289, attendanceRate: 88, events: 24 },
            { name: "Business", students: 256, attendanceRate: 85, events: 18 },
            { name: "Arts & Sciences", students: 198, attendanceRate: 90, events: 12 },
            { name: "Medicine", students: 163, attendanceRate: 94, events: 5 }
        ],
        topPerformers: [
            { name: "John Doe", studentId: "CS-2021-001", attendanceRate: 98, eventsAttended: 45, department: "CS" },
            { name: "Jane Smith", studentId: "EN-2021-045", attendanceRate: 97, eventsAttended: 43, department: "Engineering" },
            { name: "Mike Johnson", studentId: "BS-2020-089", attendanceRate: 96, eventsAttended: 41, department: "Business" },
            { name: "Sarah Williams", studentId: "CS-2021-078", attendanceRate: 95, eventsAttended: 42, department: "CS" },
            { name: "David Brown", studentId: "MD-2019-023", attendanceRate: 94, eventsAttended: 38, department: "Medicine" }
        ],
        recentEvents: [
            { name: "AI & Machine Learning Seminar", date: "2024-11-08", attendees: 145, capacity: 150, rate: 96.7 },
            { name: "Software Engineering Workshop", date: "2024-11-07", attendees: 89, capacity: 100, rate: 89.0 },
            { name: "Business Analytics Conference", date: "2024-11-06", attendees: 234, capacity: 250, rate: 93.6 },
            { name: "Medical Ethics Training", date: "2024-11-05", attendees: 78, capacity: 80, rate: 97.5 },
            { name: "Design Thinking Workshop", date: "2024-11-04", attendees: 56, capacity: 75, rate: 74.7 }
        ],
        hourlyDistribution: [
            { hour: "07:00", count: 45 },
            { hour: "08:00", count: 156 },
            { hour: "09:00", count: 324 },
            { hour: "10:00", count: 289 },
            { hour: "11:00", count: 234 },
            { hour: "12:00", count: 123 },
            { hour: "13:00", count: 178 },
            { hour: "14:00", count: 267 },
            { hour: "15:00", count: 245 },
            { hour: "16:00", count: 198 },
            { hour: "17:00", count: 134 },
            { hour: "18:00", count: 67 }
        ],
        systemMetrics: {
            storage: { used: 78, total: 100, unit: "GB" },
            serverLoad: { current: 45, average: 38, peak: 82 },
            apiCalls: { today: 12453, average: 11200, growth: 11.2 },
            dbQueries: { today: 45678, average: 42000, growth: 8.8 }
        }
    };

    const keyMetrics = [
        {
            label: "Total Users",
            value: analyticsData.overview.totalUsers.toLocaleString(),
            change: "+3.6%",
            trend: "up",
            icon: Users,
            color: "text-blue-500",
            bgColor: "bg-blue-500/10"
        },
        {
            label: "Avg Attendance Rate",
            value: `${analyticsData.overview.averageAttendanceRate}%`,
            change: "+5.2%",
            trend: "up",
            icon: TrendingUp,
            color: "text-green-500",
            bgColor: "bg-green-500/10"
        },
        {
            label: "Face Recognition",
            value: `${analyticsData.overview.faceRecognitionRate}%`,
            change: "+2.1%",
            trend: "up",
            icon: Scan,
            color: "text-purple-500",
            bgColor: "bg-purple-500/10"
        },
        {
            label: "Active Events",
            value: analyticsData.overview.ongoingEvents,
            change: `${analyticsData.overview.totalEvents} total`,
            trend: "neutral",
            icon: Calendar,
            color: "text-orange-500",
            bgColor: "bg-orange-500/10"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <section className="pt-20 pb-12 px-6 lg:px-8 border-b border-border/30">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border/30 text-xs font-light uppercase tracking-wide text-muted-foreground">
                                <BarChart3 className="h-3 w-3" />
                                Analytics Dashboard
                            </div>
                            
                            <div className="space-y-2">
                                <h1 className="text-4xl lg:text-5xl font-light">
                                    System <span className="text-foreground">Analytics</span>
                                </h1>
                                <p className="text-lg text-muted-foreground font-light max-w-2xl">
                                    Comprehensive insights and metrics for your attendance management system
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <select 
                                value={timeRange}
                                onChange={(e) => setTimeRange(e.target.value)}
                                className="px-4 py-2 border border-border/30 rounded-lg text-sm font-light bg-background hover:border-border/50 transition-colors"
                            >
                                <option value="24h">Last 24 Hours</option>
                                <option value="7d">Last 7 Days</option>
                                <option value="30d">Last 30 Days</option>
                                <option value="90d">Last 90 Days</option>
                                <option value="1y">Last Year</option>
                            </select>
                            <button className="px-4 py-2 border border-border/30 rounded-lg text-sm font-light hover:border-border/50 hover:bg-muted/20 transition-all flex items-center gap-2">
                                <RefreshCw className="h-4 w-4" />
                                Refresh
                            </button>
                            <button className="px-4 py-2 bg-foreground text-background rounded-lg text-sm font-light hover:opacity-90 transition-opacity flex items-center gap-2">
                                <Download className="h-4 w-4" />
                                Export
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Metrics */}
            <section className="py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {keyMetrics.map((metric, index) => (
                            <div 
                                key={index}
                                className="p-6 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-4"
                            >
                                <div className="flex items-center justify-between">
                                    <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                                        <metric.icon className={`h-5 w-5 ${metric.color}`} />
                                    </div>
                                    {metric.trend === "up" && (
                                        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                            <ArrowUpRight className="h-4 w-4" />
                                            <span className="text-xs font-light">{metric.change}</span>
                                        </div>
                                    )}
                                    {metric.trend === "down" && (
                                        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
                                            <ArrowDownRight className="h-4 w-4" />
                                            <span className="text-xs font-light">{metric.change}</span>
                                        </div>
                                    )}
                                    {metric.trend === "neutral" && (
                                        <span className="text-xs font-light text-muted-foreground">{metric.change}</span>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-3xl font-light">{metric.value}</p>
                                    <p className="text-xs font-light text-muted-foreground uppercase tracking-wide">
                                        {metric.label}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Charts Section */}
            <section className="pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">

                        {/* Attendance Distribution */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Attendance Distribution</h3>
                                <PieChart className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-4">
                                {[
                                    { label: "On Time", count: 4234, percentage: 77.9, color: "bg-green-500" },
                                    { label: "Late", count: 1198, percentage: 22.1, color: "bg-yellow-500" },
                                ].map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm font-light">
                                            <span className="text-muted-foreground">{item.label}</span>
                                            <span className="text-foreground">{item.count.toLocaleString()} ({item.percentage}%)</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${item.color} transition-all duration-500`}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-3 border-t border-border/20 text-sm font-light">
                                    <div className="flex items-center justify-between">
                                        <span className="text-muted-foreground">Total Attendance</span>
                                        <span className="text-foreground font-medium">5,432</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Year/Level Distribution */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Year/Level Distribution</h3>
                                <button className="px-3 py-1.5 text-xs font-light border border-border/30 rounded-lg hover:bg-muted/20 transition-colors flex items-center gap-2">
                                    <Plus className="h-3 w-3" />
                                    Add Level
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { level: "1st Year", students: 342, percentage: 27.4, color: "bg-blue-500" },
                                    { level: "2nd Year", students: 389, percentage: 31.2, color: "bg-green-500" },
                                    { level: "3rd Year", students: 298, percentage: 23.9, color: "bg-purple-500" },
                                    { level: "4th Year", students: 219, percentage: 17.5, color: "bg-orange-500" },
                                ].map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm font-light">
                                            <span className="text-muted-foreground">{item.level}</span>
                                            <span className="text-foreground">{item.students} ({item.percentage}%)</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${item.color} transition-all duration-500`}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Course Distribution */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Course Distribution</h3>
                                <button className="px-3 py-1.5 text-xs font-light border border-border/30 rounded-lg hover:bg-muted/20 transition-colors flex items-center gap-2">
                                    <Plus className="h-3 w-3" />
                                    Add Course
                                </button>
                            </div>
                            <div className="space-y-4">
                                {[
                                    { course: "Computer Science", students: 342, percentage: 27.4, color: "bg-blue-500" },
                                    { course: "Engineering", students: 289, percentage: 23.2, color: "bg-green-500" },
                                    { course: "Business", students: 256, percentage: 20.5, color: "bg-purple-500" },
                                    { course: "Arts & Sciences", students: 198, percentage: 15.9, color: "bg-orange-500" },
                                    { course: "Medicine", students: 163, percentage: 13.0, color: "bg-pink-500" },
                                ].map((item, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex items-center justify-between text-sm font-light">
                                            <span className="text-muted-foreground">{item.course}</span>
                                            <span className="text-foreground">{item.students} ({item.percentage}%)</span>
                                        </div>
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full ${item.color} transition-all duration-500`}
                                                style={{ width: `${item.percentage}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Event Types Distribution */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Event Types Distribution</h3>
                                <button className="px-3 py-1.5 text-xs font-light border border-border/30 rounded-lg hover:bg-muted/20 transition-colors flex items-center gap-2">
                                    <Plus className="h-3 w-3" />
                                    Add Type
                                </button>
                            </div>
                            <div className="space-y-4">
                                {analyticsData.trends.eventTypes.map((type, index) => {
                                    const colors = [
                                        "bg-blue-500",
                                        "bg-green-500",
                                        "bg-purple-500",
                                        "bg-orange-500",
                                        "bg-gray-500"
                                    ];
                                    return (
                                        <div key={index} className="space-y-2">
                                            <div className="flex items-center justify-between text-sm font-light">
                                                <span className="text-muted-foreground">{type.type}</span>
                                                <span className="text-foreground">{type.count} ({type.percentage}%)</span>
                                            </div>
                                            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                                <div 
                                                    className={`h-full ${colors[index]} transition-all duration-500`}
                                                    style={{ width: `${type.percentage}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Department Performance */}
            <section className="pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-light">Department Performance</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                            {analyticsData.departments.map((dept, index) => (
                                <div 
                                    key={index}
                                    className="p-4 border border-border/30 rounded-lg hover:border-border/50 transition-all hover:shadow-lg bg-card space-y-3"
                                >
                                    <div className="space-y-1">
                                        <h3 className="text-sm font-light">{dept.name}</h3>
                                        <p className="text-xs font-light text-muted-foreground">
                                            {dept.students} students
                                        </p>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-xs font-light">
                                            <span className="text-muted-foreground">Attendance</span>
                                            <span className="text-foreground">{dept.attendanceRate}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all duration-500"
                                                style={{ width: `${dept.attendanceRate}%` }}
                                            />
                                        </div>
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        {dept.events} events hosted
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tables Section */}
            <section className="pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-8">
                        {/* Top Performers */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Top Performers</h3>
                                <Award className="h-4 w-4 text-yellow-500" />
                            </div>
                            <div className="space-y-3">
                                {analyticsData.topPerformers.map((student, index) => (
                                    <div 
                                        key={index}
                                        className="p-3 border border-border/20 rounded-lg hover:border-border/40 transition-colors space-y-2"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-sm font-light">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-light">{student.name}</p>
                                                    <p className="text-xs font-light text-muted-foreground">
                                                        {student.studentId} • {student.department}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-light text-green-600 dark:text-green-400">
                                                    {student.attendanceRate}%
                                                </p>
                                                <p className="text-xs font-light text-muted-foreground">
                                                    {student.eventsAttended} events
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Events Performance */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-light">Recent Event Performance</h3>
                                <Activity className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-3">
                                {analyticsData.recentEvents.map((event, index) => (
                                    <div 
                                        key={index}
                                        className="p-3 border border-border/20 rounded-lg hover:border-border/40 transition-colors space-y-2"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1">
                                                <p className="text-sm font-light">{event.name}</p>
                                                <p className="text-xs font-light text-muted-foreground">
                                                    {new Date(event.date).toLocaleDateString('en-US', {
                                                        month: 'short',
                                                        day: 'numeric',
                                                        year: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-light">{event.attendees}/{event.capacity}</p>
                                                <p className={`text-xs font-light ${
                                                    event.rate >= 90 
                                                        ? 'text-green-600 dark:text-green-400' 
                                                        : event.rate >= 75 
                                                        ? 'text-yellow-600 dark:text-yellow-400' 
                                                        : 'text-red-600 dark:text-red-400'
                                                }`}>
                                                    {event.rate.toFixed(1)}%
                                                </p>
                                            </div>
                                        </div>
                                        <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                            <div 
                                                className={`h-full transition-all duration-500 ${
                                                    event.rate >= 90 
                                                        ? 'bg-gradient-to-r from-green-500 to-green-600' 
                                                        : event.rate >= 75 
                                                        ? 'bg-gradient-to-r from-yellow-500 to-yellow-600' 
                                                        : 'bg-gradient-to-r from-red-500 to-red-600'
                                                }`}
                                                style={{ width: `${event.rate}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* System Metrics */}
            <section className="pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="space-y-6">
                        <h2 className="text-2xl font-light">System Performance</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <HardDrive className="h-5 w-5 text-purple-500" />
                                    <span className="text-xs font-light text-muted-foreground">Storage</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-light">
                                        {analyticsData.systemMetrics.storage.used} {analyticsData.systemMetrics.storage.unit}
                                    </p>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-purple-500"
                                            style={{ width: `${analyticsData.systemMetrics.storage.used}%` }}
                                        />
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        of {analyticsData.systemMetrics.storage.total} {analyticsData.systemMetrics.storage.unit}
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <Server className="h-5 w-5 text-green-500" />
                                    <span className="text-xs font-light text-muted-foreground">Server Load</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-light">
                                        {analyticsData.systemMetrics.serverLoad.current}%
                                    </p>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-green-500"
                                            style={{ width: `${analyticsData.systemMetrics.serverLoad.current}%` }}
                                        />
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        Avg: {analyticsData.systemMetrics.serverLoad.average}% | Peak: {analyticsData.systemMetrics.serverLoad.peak}%
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <Zap className="h-5 w-5 text-blue-500" />
                                    <span className="text-xs font-light text-muted-foreground">API Calls</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-light">
                                        {analyticsData.systemMetrics.apiCalls.today.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                        <ArrowUpRight className="h-3 w-3" />
                                        <span className="text-xs font-light">+{analyticsData.systemMetrics.apiCalls.growth}%</span>
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        Today vs avg ({analyticsData.systemMetrics.apiCalls.average.toLocaleString()})
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 border border-border/30 rounded-lg bg-card space-y-3">
                                <div className="flex items-center justify-between">
                                    <Database className="h-5 w-5 text-orange-500" />
                                    <span className="text-xs font-light text-muted-foreground">DB Queries</span>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-2xl font-light">
                                        {analyticsData.systemMetrics.dbQueries.today.toLocaleString()}
                                    </p>
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                        <ArrowUpRight className="h-3 w-3" />
                                        <span className="text-xs font-light">+{analyticsData.systemMetrics.dbQueries.growth}%</span>
                                    </div>
                                    <p className="text-xs font-light text-muted-foreground">
                                        Today vs avg ({analyticsData.systemMetrics.dbQueries.average.toLocaleString()})
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Additional Insights */}
            <section className="pb-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-6">
                        {/* Quick Stats */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-4">
                            <h3 className="text-lg font-light">Quick Statistics</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between pb-2 border-b border-border/20">
                                    <span className="text-sm font-light text-muted-foreground">Active Users Today</span>
                                    <span className="text-sm font-light">{analyticsData.overview.activeUsers}</span>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-border/20">
                                    <span className="text-sm font-light text-muted-foreground">Total Check-ins</span>
                                    <span className="text-sm font-light">{analyticsData.overview.totalAttendance.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-border/20">
                                    <span className="text-sm font-light text-muted-foreground">Avg Event Duration</span>
                                    <span className="text-sm font-light">{analyticsData.overview.averageEventDuration}h</span>
                                </div>
                                <div className="flex items-center justify-between pb-2 border-b border-border/20">
                                    <span className="text-sm font-light text-muted-foreground">Completed Events</span>
                                    <span className="text-sm font-light">{analyticsData.overview.completedEvents}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-light text-muted-foreground">Upcoming Events</span>
                                    <span className="text-sm font-light">{analyticsData.overview.upcomingEvents}</span>
                                </div>
                            </div>
                        </div>

                        {/* User Status */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-4">
                            <h3 className="text-lg font-light">User Status Overview</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <div className="flex items-center gap-2">
                                            <UserCheck className="h-4 w-4 text-green-500" />
                                            <span className="text-muted-foreground">Active Users</span>
                                        </div>
                                        <span className="text-foreground">{analyticsData.overview.activeUsers}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-green-500"
                                            style={{ width: `${(analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <div className="flex items-center gap-2">
                                            <UserX className="h-4 w-4 text-gray-500" />
                                            <span className="text-muted-foreground">Inactive Users</span>
                                        </div>
                                        <span className="text-foreground">{analyticsData.overview.inactiveUsers}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gray-500"
                                            style={{ width: `${(analyticsData.overview.inactiveUsers / analyticsData.overview.totalUsers) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-border/20">
                                    <div className="flex items-center justify-between text-xs font-light">
                                        <span className="text-muted-foreground">Active Rate</span>
                                        <span className="text-green-600 dark:text-green-400">
                                            {((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100).toFixed(1)}%
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Event Status */}
                        <div className="p-6 border border-border/30 rounded-lg bg-card space-y-4">
                            <h3 className="text-lg font-light">Event Status Overview</h3>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <div className="flex items-center gap-2">
                                            <Activity className="h-4 w-4 text-green-500" />
                                            <span className="text-muted-foreground">Ongoing</span>
                                        </div>
                                        <span className="text-foreground">{analyticsData.overview.ongoingEvents}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-green-500"
                                            style={{ width: `${(analyticsData.overview.ongoingEvents / analyticsData.overview.totalEvents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <div className="flex items-center gap-2">
                                            <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                            <span className="text-muted-foreground">Completed</span>
                                        </div>
                                        <span className="text-foreground">{analyticsData.overview.completedEvents}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-blue-500"
                                            style={{ width: `${(analyticsData.overview.completedEvents / analyticsData.overview.totalEvents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <div className="flex items-center gap-2">
                                            <Clock className="h-4 w-4 text-orange-500" />
                                            <span className="text-muted-foreground">Upcoming</span>
                                        </div>
                                        <span className="text-foreground">{analyticsData.overview.upcomingEvents}</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-orange-500"
                                            style={{ width: `${(analyticsData.overview.upcomingEvents / analyticsData.overview.totalEvents) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}