
// RecentEventPerformance.tsx
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEvents } from "@/hooks/query/event/use-events";
import { format } from "date-fns";
import { Activity, Calendar, MapPin, Target, Users, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function RecentEventPerformance() {
    const { data: eventsData, isLoading } = useEvents({
        filters: {
            limit: "5",
            sortBy: "date-desc",
            status: "4",
        },
    });

    const totalStudents = eventsData?.totalStudents ?? 0;

    const getAttendanceColor = (percentage: number) => {
        if (percentage >= 90) return "text-green-600 dark:text-green-400";
        if (percentage >= 75) return "text-yellow-600 dark:text-yellow-400";
        return "text-red-600 dark:text-red-400";
    };

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-xl font-light">Recent Event Performance</h2>
                <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))}
                </div>
            </div>
        );
    }

    if (!eventsData?.events || eventsData.events.length === 0) {
        return (
            <div className="flex-1 flex flex-col gap-4">
                <h2 className="text-xl font-light">Recent Event Performance</h2>
                <Card className="p-12 text-center">
                    <Calendar className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                    <h3 className="text-lg font-light mb-2">No Completed Events</h3>
                    <p className="text-sm text-muted-foreground font-light">
                        Completed events will appear here with their performance metrics
                    </p>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Recent Event Performance</h2>
            <div className="space-y-3">
                {eventsData.events.map((event) => {
                    const totalAttendees = Math.round(
                        event.eventSessions.reduce(
                            (total, session) => total + session.attendance.length,
                            0
                        ) / event.eventSessions.length
                    );
                    const percentage = ((totalAttendees / totalStudents) * 100).toFixed(1);

                    return (
                        <Link key={event.id} href={`/event/${event.id}`} className="block group">
                            <Card className="p-4 hover:border-border/50 transition-all">
                                <div className="flex flex-col gap-4">
                                    {/* Header */}
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <h3 className="text-base font-light group-hover:text-foreground/80 transition-colors">
                                                {event.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-light mt-2">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-3 h-3" />
                                                    <span>{format(event.eventDate, "MMM dd, yyyy")}</span>
                                                </div>
                                                {event.location && (
                                                    <span>• {event.location}</span>
                                                )}
                                                <span>
                                                    • {event.eventSessions.length} session
                                                    {event.eventSessions.length !== 1 ? "s" : ""}
                                                </span>
                                            </div>
                                        </div>
                                        {event.eventType && (
                                            <Badge variant="outline" className="text-xs font-light shrink-0">
                                                {event.eventType.name}
                                            </Badge>
                                        )}
                                    </div>

                                    {/* Attendance Stats */}
                                    <div className="grid grid-cols-3 gap-3">
                                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-muted/30">
                                            <span className="text-xs text-muted-foreground font-light">
                                                Attended
                                            </span>
                                            <span className="text-base font-light">{totalAttendees}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-muted/30">
                                            <span className="text-xs text-muted-foreground font-light">
                                                Expected
                                            </span>
                                            <span className="text-base font-light">{totalStudents}</span>
                                        </div>
                                        <div className="flex flex-col gap-1 p-2 rounded-lg bg-muted/30">
                                            <span className="text-xs text-muted-foreground font-light">
                                                Rate
                                            </span>
                                            <span className={`text-base font-medium ${getAttendanceColor(Number(percentage))}`}>
                                                {percentage}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}