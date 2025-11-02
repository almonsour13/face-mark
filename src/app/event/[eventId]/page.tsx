"use client";

import EventAttendanceList from "@/components/event/event-attendance-list";
import Header from "@/components/layout/nav-header";
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
import StatisticsCard from "@/components/statistics-card";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";

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

    const statistics = [
        { statName: "Total Attendees", value: 45 },
        { statName: "On Time", value: 38 },
        { statName: "Late", value: 7 },
        { statName: "Absent", value: 12 },
    ];

    return (
        <div className="w-full">
            <Header title="Event Details">
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
            </Header>

            <PageWrapper>
                {isEventDetailsLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-muted-foreground">
                            Loading event details...
                        </p>
                    </div>
                ) : (
                    eventDetails && (
                        <>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex flex-wrap items-center gap-2">
                                            {eventDetails.eventType && (
                                                <Badge
                                                    variant="secondary"
                                                    className="text-xs font-medium"
                                                >
                                                    {
                                                        eventDetails.eventType
                                                            .name
                                                    }
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
                                        <h1 className="text-3xl md:text-4xl font-medium text-foreground">
                                            {eventDetails.name}
                                        </h1>

                                        <div className="flex gap-3">
                                            <div className="flex items-center gap-3 text-sm">
                                                <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                <p className="text-foreground">
                                                    {format(
                                                        eventDetails.eventDate,
                                                        "MMMM dd, yyyy"
                                                    )}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm">
                                                <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                                <p className="text-foreground">
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
                                        <span className="text-sm text-foreground">
                                            {eventDetails.description}
                                        </span>
                                    </div>
                                )}

                                <div className="flex flex-col gap-4">
                                    <h2 className="text-sm font-semibold">
                                        Sessions
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {eventDetails.eventSessions.map(
                                            (session, index) => (
                                                <div
                                                    key={index}
                                                    className="p-4 rounded-md border bg-card"
                                                >
                                                    <div className="flex flex-col gap-2">
                                                        <div className="flex w-full justify-between items-start">
                                                            <span className="text-foreground">
                                                                {
                                                                    eventSessionTypeValue[
                                                                        session
                                                                            .type
                                                                    ]
                                                                }
                                                            </span>
                                                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
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
                                                            <div className="text-xs text-muted-foreground font-light">
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

                            <div className="flex flex-col-reverse lg:flex-row gap-4">
                                <div className="flex-1">
                                    <EventAttendanceList />
                                </div>
                                <div className="w-full lg:w-80">
                                    <StatisticsCard
                                        statistics={statistics}
                                        title="Attendance Statistics"
                                    />
                                </div>
                            </div>
                        </>
                    )
                )}
            </PageWrapper>
        </div>
    );
}
