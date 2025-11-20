"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { fetchApi } from "@/lib/api";
import { EventWithSessions } from "@/store/use-event-store";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Calendar, Clock, MapPin, Users } from "lucide-react";
import Link from "next/link";
import { EventSkeleton } from "../skeleton";

interface Response {
    sucess: boolean;
    message: string;
    events: EventWithSessions[];
}
export default function RecentEvents() {
    const { data: admiEvents, isLoading: isEventLoading } = useQuery<Response>({
        queryKey: ["admin-recent-event"],
        queryFn: async () => {
            const response = await fetchApi("/api/event?limit=5&status=2");
            return response;
        },
    });
    return (
        <div className="flex-2 flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-light">Upcoming Events</h2>
                <Link
                    href="/event"
                    className="text-sm font-light text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 hover:gap-3"
                >
                    View all Events
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </div>
            {isEventLoading ? (
                <EventSkeleton />
            ) : (
                <div className="space-y-2">
                    {admiEvents && admiEvents.events.length > 0 ? (
                        admiEvents.events.map((event: any) => (
                            <Link
                                key={event.id}
                                href={`/event/${event.id}`}
                                className="block group"
                            >
                                <Card>
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="space-y-2 flex-1">
                                            <h3 className="text-lg font-light group-hover:text-foreground transition-colors">
                                                {event.name}
                                            </h3>
                                            <div className="flex flex-wrap gap-3 text-xs text-muted-foreground font-light">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 w-3" />
                                                    <span className="text-foreground">
                                                        {new Date(
                                                            event.eventDate
                                                        ).toLocaleDateString(
                                                            "en-US",
                                                            {
                                                                month: "short",
                                                                day: "numeric",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </span>
                                                </div>
                                                {event.eventSessions &&
                                                    event.eventSessions.length >
                                                        0 && (
                                                        <div className="flex items-center gap-2">
                                                            <Clock className="h-3 w-3" />
                                                            <span className="text-foreground">
                                                                {
                                                                    event
                                                                        .eventSessions[0]
                                                                        .startTime
                                                                }{" "}
                                                                -{" "}
                                                                {
                                                                    event
                                                                        .eventSessions[0]
                                                                        .endTime
                                                                }
                                                            </span>
                                                        </div>
                                                    )}
                                                {event.location && (
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="h-3 w-3" />
                                                        <span className="text-foreground">
                                                            {event.location}
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {event.eventType && (
                                            <Badge
                                                variant="outline"
                                                className="text-xs font-light"
                                            >
                                                {event.eventType.name}
                                            </Badge>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-between pt-2 border-t border-border/20">
                                        <div className="flex items-center gap-4 text-xs font-light text-muted-foreground">
                                            <span>
                                                {event.eventSessions?.length ||
                                                    0}{" "}
                                                session(s)
                                            </span>
                                            {event.attendees && (
                                                <>
                                                    <span>•</span>
                                                    <div className="flex items-center gap-1">
                                                        <Users className="h-3 w-3" />
                                                        <span>
                                                            {event.attendees}{" "}
                                                            attending
                                                        </span>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                        <span className="text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors flex items-center gap-2 group-hover:gap-3">
                                            View details
                                            <ArrowRight className="h-3 w-3" />
                                        </span>
                                    </div>
                                </Card>
                            </Link>
                        ))
                    ) : (
                        <div className="py-12 text-center border border-dashed border-border/30 rounded-lg">
                            <Calendar className="h-12 w-12 text-muted-foreground/20 mx-auto mb-4" />
                            <h3 className="text-lg font-light mb-2">
                                No Upcoming Events
                            </h3>
                            <p className="text-sm font-light text-muted-foreground">
                                Check back later for new events
                            </p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
