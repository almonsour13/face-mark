
// EventTypesDistribution.tsx
import EventTypeDialog from "@/components/dialog/event-type-dialog";
import EventTypeSheet from "@/components/sheet/event-type-sheet";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Plus, Calendar, Target } from "lucide-react";

interface EventTypesResponse {
    success: boolean;
    eventStats: {
        eventTypeId: string;
        name: string;
        totalEvents: number;
    }[];
}

export default function EventTypesDistribution() {
    const { data, isLoading, refetch } = useQuery<EventTypesResponse>({
        queryKey: ["dashboard-event-types-distribution"],
        queryFn: async () => await fetchApi("/api/dashboard/stats/event-types"),
    });

    const eventTypesData = data?.eventStats
        ? [...data.eventStats].sort((a, b) => b.totalEvents - a.totalEvents)
        : [];

    const totalEvents = eventTypesData.reduce((total, item) => total + item.totalEvents, 0);

    if (isLoading) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Event Types</h2>
                    <Skeleton className="h-8 w-24" />
                </div>
                <Card className="md:aspect-square p-6">
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <Skeleton key={i} className="h-16 w-full" />
                        ))}
                    </div>
                </Card>
            </div>
        );
    }

    if (eventTypesData.length === 0) {
        return (
            <div className="flex-1 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-light">Event Types</h2>
                    <EventTypeDialog>
                        <Button variant="outline" size="sm">
                            <Plus className="w-3 h-3 mr-1.5" /> Type
                        </Button>
                    </EventTypeDialog>
                </div>
                <Card className="md:aspect-square p-12">
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <Calendar className="h-12 w-12 text-muted-foreground/20 mb-4" />
                        <h3 className="text-base font-light mb-2">No Event Types</h3>
                        <p className="text-sm text-muted-foreground font-light mb-4">
                            Create event types to categorize events
                        </p>
                        <EventTypeDialog>
                            <Button variant="outline" size="sm">
                                <Plus className="w-3 h-3 mr-1.5" /> Add Type
                            </Button>
                        </EventTypeDialog>
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex-1 flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-light">Event Types</h2>
                <EventTypeDialog>
                    <Button variant="outline" size="sm">
                        <Plus className="w-3 h-3 mr-1.5" /> Type
                    </Button>
                </EventTypeDialog>
            </div>

            <EventTypeSheet eventStats={eventTypesData} refetch={refetch}>
                <Card className="gap-2 md:aspect-square cursor-pointer hover:border-border/50 transition-colors">
                    <div className="space-y-2 flex-1">
                        {eventTypesData.slice(0, 4).map((item, index) => {
                            const percentage = totalEvents > 0
                                ? ((item.totalEvents / totalEvents) * 100).toFixed(1)
                                : "0";

                            return (
                                <div key={item.eventTypeId} className="p-3 border  rounded-lg hover:bg-muted/20 transition-colors space-y-2">
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-sm font-light text-muted-foreground">
                                            {item.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 text-xs">
                                        <div className="flex items-center gap-1.5">
                                            <Target className="h-3 w-3 text-muted-foreground" />
                                            <span className="font-light">{item.totalEvents} events</span>
                                        </div>
                                        <span className="font-medium">{percentage}%</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-purple-500 to-purple-600 transition-all duration-500"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="pt-2 border-t  flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                            <span className="font-light text-muted-foreground">
                                {eventTypesData.length} type{eventTypesData.length !== 1 ? "s" : ""}
                            </span>
                            {eventTypesData.length > 4 && (
                                <span className="px-2 py-0.5 rounded-full bg-muted font-light">
                                    +{eventTypesData.length - 4} more
                                </span>
                            )}
                        </div>
                        <span className="font-light text-muted-foreground hover:text-foreground transition-colors">
                            View all →
                        </span>
                    </div>
                </Card>
            </EventTypeSheet>
        </div>
    );
}