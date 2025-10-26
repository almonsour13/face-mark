"use client";

import EventAttendanceTable from "@/components/event-attendance-table";
import HeaderTitle from "@/components/nav-header-title";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import Link from "next/link";

export interface EventSession {
    type: number;
    startTime: string;
    endTime: string;
    requiresTimeOut: number;
    allowEarlyTimeIn: number;
    allowEarlyTimeOut: number;
    gracePeriod?: number;
}
interface EventType {
    id: string;
    name: string;
    createdAt: Date;
}
export interface Event {
    id?: string;
    eventTypeId: string;
    name: string;
    description: string;
    location: string | null;
    eventDate: Date;
    status: number;
    eventType?: EventType | null;
    eventSessions: EventSession[];
}
export default function Page() {
    const { eventDetails, isEventDetailsLoading } = useEventDetailsStore();

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="h-14 px-4 pr-6 flex items-center justify-between">
                    <div className="w-full mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <HeaderTitle>
                                {eventDetails?.name || "Unknown"}
                            </HeaderTitle>
                        </div>
                        <Link href={`/event/${eventDetails?.id}/scan`}>
                            <Button variant="default" size="sm">
                                Scan
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 flex flex-col gap-8">
                {isEventDetailsLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-muted-foreground">
                            Loading event details...
                        </p>
                    </div>
                ) : (
                    eventDetails && (
                        <div className="flex flex-col gap-8">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 flex flex-col gap-4">
                                    <div className="flex flex-wrap items-center gap-2">
                                        {eventDetails.eventType && (
                                            <Badge
                                                variant="secondary"
                                                className="text-xs font-medium"
                                            >
                                                {eventDetails.eventType.name}
                                            </Badge>
                                        )}
                                        <Badge
                                            variant={
                                                eventDetails.status === 1
                                                    ? "default"
                                                    : "secondary"
                                            }
                                            className="text-xs font-medium"
                                        >
                                            {
                                                eventStatusValue[
                                                    eventDetails.status
                                                ]
                                            }
                                        </Badge>
                                    </div>
                                    <h1 className="text-4xl font-bold text-foreground">
                                        {eventDetails.name}
                                    </h1>

                                    <div className="flex gap-4">
                                        <div className="flex items-center gap-3 text-sm">
                                            <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <p className="font-medium">
                                                {format(
                                                    eventDetails.eventDate,
                                                    "MMMM dd, yyyy"
                                                )}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 text-sm">
                                            <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <p className="font-medium">
                                                {eventDetails.location ||
                                                    "No location specified"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            aria-label="More options"
                                        >
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>
                                            View Details
                                            <DropdownMenuShortcut>
                                                ⇧⌘P
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            Edit
                                            <DropdownMenuShortcut>
                                                ⇧⌘E
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">
                                            Delete
                                            <DropdownMenuShortcut>
                                                ⇧⌘D
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>

                            {eventDetails.description && (
                                <div className="flex flex-col gap-2">
                                    <p className="text-base text-foreground">
                                        {eventDetails.description}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                                    Sessions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {eventDetails.eventSessions.map(
                                        (session, index) => (
                                            <div
                                                key={index}
                                                className="p-4 rounded-lg border transition-colors"
                                            >
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex w-full justify-between">
                                                        <span className="font-semibold text-foreground">
                                                            {
                                                                eventSessionTypeValue[
                                                                    session.type
                                                                ]
                                                            }
                                                        </span>
                                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <Clock className="w-4 h-4 flex-shrink-0" />
                                                            <span>
                                                                {
                                                                    session.startTime
                                                                }{" "}
                                                                –{" "}
                                                                {
                                                                    session.endTime
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                    {session.gracePeriod && (
                                                        <div className="text-xs text-muted-foreground">
                                                            Grace period:{" "}
                                                            {
                                                                session.gracePeriod
                                                            }{" "}
                                                            min
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                )}
                <EventAttendanceTable />
            </div>
        </div>
    );
}
