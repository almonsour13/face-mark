"use client";

import BackButton from "@/components/back-button";
import EventAttendanceList from "@/components/features/event/event-attendance-list";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import PageWrapper from "@/components/page-wrapper";
import RoleBasedRender from "@/components/role-based-render";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventSessionType, eventStatus, eventStatusColor } from "@/constant";
import { useEventStats } from "@/context/event-details-context";
import { useEventDetails } from "@/hooks/query/event/use-event-details";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { format } from "date-fns";
import {
    Calendar,
    CheckCircle2,
    Clock,
    Heart,
    MapPin,
    MoreHorizontal,
    Target,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
    const eventId = useParams().eventId as string;
    const { totalAttendees, totalStudents } = useEventStats();

    const {
        eventDetails,
        setEventDetails,
        isEventDetailsLoading,
        setIsEventDetailsLoading,
    } = useEventDetailsStore();

    const attendancePercentage = totalStudents
        ? ((totalAttendees / totalStudents) * 100).toFixed(1)
        : "0";
        
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
                                        <Badge variant="outline">
                                            {eventDetails.eventType.name}
                                        </Badge>
                                    )}
                                    <Badge
                                        variant="outline"
                                        className={`text-xs ${
                                            eventStatusColor[
                                                eventDetails.status
                                            ].color
                                        } ${
                                            eventStatusColor[
                                                eventDetails.status
                                            ].bg
                                        }`}
                                    >
                                        {eventStatus[eventDetails.status]}
                                    </Badge>
                                </div>
                                <h1 className="text-4xl lg:text-4xl font-light">
                                    {eventDetails.name}
                                </h1>

                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <p className="text-foreground">
                                            {format(
                                                eventDetails.eventDate,
                                                "MMMM dd, yyyy"
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                        <p className="text-foreground">
                                            {eventDetails.location ||
                                                "No location specified"}
                                        </p>
                                    </div>
                                </div>

                                
                            </div>{eventDetails.description && (
                                    <p className="font-light leading-relaxed max-w-3xl">
                                        {eventDetails.description}
                                    </p>
                                )}
                            {/* event sessions */}
                            <div className="flex flex-col gap-2">
                                <h2 className="text-lg font-light">
                                    Event Sessions <span className="text-muted-foreground">( {eventDetails.eventSessions.length} )</span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                                    {eventDetails.eventSessions.map(
                                        (session, index) => (
                                            <Card
                                                key={index}
                                                className="flex-col gap-1 font-light"
                                            >
                                                <div className="text-base flex-1 flex justify-between">
                                                    <h3 className=" font-light">
                                                        {
                                                            eventSessionType[
                                                                session.type
                                                            ]
                                                        }
                                                    </h3>
                                                    <div className="flex items-center gap-1.5 font-light">
                                                        <span>
                                                            {session.startTime}{" "}
                                                            - {session.endTime}
                                                        </span>
                                                    </div>
                                                </div>{" "}
                                                <RoleBasedRender
                                                    allowedRoles={["admin"]}
                                                >
                                                    {session.attendance.length >
                                                        0 && (
                                                        <div className="flex-1 text-sm flex justify-between">
                                                            <h3 className="text-muted-foreground">
                                                                Attendees
                                                            </h3>
                                                            <div className="flex gap-2">
                                                                <span>
                                                                    {
                                                                        session
                                                                            .attendance
                                                                            .length
                                                                    }
                                                                </span>
                                                                {totalStudents && (
                                                                    <span>
                                                                        (
                                                                        {(
                                                                            (session
                                                                                .attendance
                                                                                .length /
                                                                                totalStudents) *
                                                                            100
                                                                        ).toFixed(
                                                                            0
                                                                        )}
                                                                        %)
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </RoleBasedRender>
                                                <div className="flex-1 text-sm flex justify-between">
                                                    <h3 className=" font-light text-muted-foreground">
                                                        Time Out Required
                                                    </h3>
                                                    <span>
                                                        {session.requiresTimeOut
                                                            ? "Yes"
                                                            : "No"}
                                                    </span>
                                                </div>
                                                <div className="flex-1 text-sm flex justify-between">
                                                    <h3 className=" font-light text-muted-foreground">
                                                        Grace Period
                                                    </h3>
                                                    <span>
                                                        {session.gracePeriod}{" "}
                                                        mins
                                                    </span>
                                                </div>
                                            </Card>
                                        )
                                    )}
                                </div>
                            </div>
                            <RoleBasedRender allowedRoles={["admin"]}>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4">
                                    {totalAttendees > 0 && (
                                        <>
                                            <div className="flex gap-4 items-center">
                                                <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center">
                                                    <Users className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <p className="font-light tracking-wide">
                                                    {totalAttendees} Avg.
                                                    Attendees
                                                </p>
                                            </div>
                                            <div className="flex gap-4 items-center">
                                                <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center">
                                                    <Target className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                                <p className="font-light tracking-wide">
                                                    {attendancePercentage}%
                                                    Attendance Rate
                                                </p>
                                            </div>
                                        </>
                                    )}
                                    <div className="flex gap-4 items-center">
                                        <div className="h-10 w-10 rounded-full bg-card flex items-center justify-center">
                                            <Heart className="h-4 w-4 text-muted-foreground fill-current" />
                                        </div>
                                        <p className="font-light tracking-wide">
                                            95 Interested
                                        </p>
                                    </div>
                                </div>
                            </RoleBasedRender>
                            <div className="flex flex-col-reverse lg:flex-row gap-8">
                                <div className="flex-1">
                                    <EventAttendanceList />
                                </div>
                            </div>
                        </div>
                    )
                )}
            </PageWrapper>
        </div>
    );
}
