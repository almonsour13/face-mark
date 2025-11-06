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
import StatisticsCard from "@/components/statistics-card";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { format } from "date-fns";
import { Calendar, Clock, MapPin, MoreHorizontal, Scan } from "lucide-react";
import Link from "next/link";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import RoleBasedRender from "@/components/role-based-render";
import { useEventAttendanceStatistic } from "@/hooks/query/event/use-event-attendace-statistic";
import { useParams } from "next/navigation";
import BackButton from "@/components/back-button";
import { eventSessionType, eventStatus } from "@/constant";
import { Card } from "@/components/ui/card";

export default function Page() {
    const eventId = useParams().eventId as string;
    const { eventDetails, isEventDetailsLoading } = useEventDetailsStore();
    const {
        data: eventAttendanceStatistic,
        error,
        isLoading,
    } = useEventAttendanceStatistic(eventId);

    const statistics = [
        { name: "Total Attendees", value: 45 },
        { name: "On Time", value: 38 },
        { name: "Late", value: 7 },
        { name: "Absent", value: 12 },
    ];

    return (
        <div className="w-full">
            <Header title="Event Details">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BackButton />
                        <HeaderTitle>
                            {eventDetails?.name || "Unknown"}
                        </HeaderTitle>
                    </div>
                    <RoleBasedRender allowedRoles={["admin"]}>
                    <div className="flex gap-2">
                        <Link href={`/event/${eventDetails?.id}/scan`}>
                            <Button variant="default" size="sm">
                                Scan
                            </Button>
                        </Link>{" "}
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
                    </RoleBasedRender>
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
                        <div className="flex flex-col gap-8">
                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex flex-wrap items-center gap-2">
                                    {eventDetails.eventType && (
                                        <Badge
                                            variant="outline"
                                        >
                                            {eventDetails.eventType.name}
                                        </Badge>
                                    )}
                                    <Badge
                                        variant="outline"
                                    >
                                        {eventStatus[eventDetails.status]}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl lg:text-4xl font-light">
                                    {eventDetails.name}
                                </h1>

                                <div className="flex gap-3">
                                    <div className="flex items-center gap-2 text-sm">
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

                                {eventDetails.description && (
                                    <p className="text-muted-foreground font-light leading-relaxed max-w-3xl">
                                        {eventDetails.description}
                                    </p>
                                )}
                            </div>
                                {/* event sessions */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-light">
                                    Event Sessions
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {eventDetails.eventSessions.map(
                                        (session, index) => (
                                            <Card
                                                key={index}
                                            >
                                                <div className="flex flex-col gap-2">
                                                    <div className="flex w-full justify-between items-center">
                                                        <h3 className="text-lg font-light">
                                                            {
                                                                eventSessionType[
                                                                    session.type
                                                                ]
                                                            }
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                                            <Clock className="h-3 w-3" />
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
                                                    <div className="space-y-2">
                                                        {session.gracePeriod && (
                                                            <div className="flex items-center justify-between text-xs font-light">
                                                                <span className="text-muted-foreground">
                                                                    Grace Period
                                                                </span>
                                                                <span className="text-foreground">
                                                                    {
                                                                        session.gracePeriod
                                                                    }{" "}
                                                                    minutes
                                                                </span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center justify-between text-xs font-light">
                                                            <span className="text-muted-foreground">
                                                                Time Out
                                                                Required
                                                            </span>
                                                            <span className="text-foreground">
                                                                {session.requiresTimeOut
                                                                    ? "Yes"
                                                                    : "No"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    )}
                                </div>
                            </div>
                            <RoleBasedRender allowedRoles={["admin"]}>
                                <div className="flex flex-col-reverse lg:flex-row gap-8">
                                    <div className="flex-1">
                                        <EventAttendanceList />
                                    </div>
                                    <div className="w-full lg:w-80">
                                        <StatisticsCard
                                            statistics={
                                                eventAttendanceStatistic?.stats ||
                                                statistics
                                            }
                                            title="Attendance Statistics"
                                        />
                                    </div>
                                </div>
                            </RoleBasedRender>
                            <RoleBasedRender allowedRoles={["user"]}>
                                <div className="">
                                    you attendace of this event
                                </div>
                            </RoleBasedRender>
                        </div>
                    )
                )}
            </PageWrapper>
        </div>
    );
}
