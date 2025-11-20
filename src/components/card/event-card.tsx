import { Badge } from "@/components//ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";
import {
    ArrowLeftFromLine,
    ArrowRightFromLine,
    Calendar,
    Check,
    CheckCircle,
    CheckCircle2,
    Clock,
    Clock4,
    Dot,
    Heart,
    MapPin,
    MoreHorizontal,
    Target,
    ThumbsUp,
    Users,
} from "lucide-react";
import Link from "next/link";
import RoleBasedRender from "../role-based-render";
import { useState, useTransition } from "react";
import { EventWithSessions } from "@/store/use-event-store";
import { eventSessionType, eventStatus, eventStatusColor } from "@/constant";
import { Card } from "../ui/card";

export function EventCard({
    event,
    totalStudents,
}: {
    event: EventWithSessions;
    totalStudents: number;
}) {
    const [interested, setInterested] = useState(false);
    const [isPending, startTransition] = useTransition();

    const handleInterested = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        startTransition(() => {
            setInterested(!interested);
        });
    };

    const totalAttendees = Math.round(
        event.eventSessions.reduce(
            (total, session) => total + session.attendance.length,
            0
        ) / event.eventSessions.length
    );

    return (
        <Link
            key={event.id}
            href={`/event/${event.id}`}
            className="break-inside-avoid block mb-4a"
        >
            <Card className={`h-full flex flex-col gap-4`}>
                <div className="flex flex-col gap-3">
                    <div className="w-full flex flex-col gap-1">
                        <div className="flex gap-2 justify-between items-center">
                            <div className="flex gap-2">
                                {event.eventType && (
                                    <Badge
                                        variant="outline"
                                        className="text-xs font-light"
                                    >
                                        {event.eventType.name}
                                    </Badge>
                                )}
                                <Badge
                                    variant="outline"
                                    className={`text-xs font-light ${
                                        eventStatusColor[event.status].color
                                    } ${eventStatusColor[event.status].bg}`}
                                >
                                    {eventStatus[event.status]}
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            role="button"
                                            aria-label="More"
                                            variant="ghost"
                                            size="icon-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                            }}
                                        >
                                            <MoreHorizontal className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                        onClick={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                    >
                                        <DropdownMenuItem>
                                            View Details
                                            <DropdownMenuShortcut>
                                                ⇧⌘P
                                            </DropdownMenuShortcut>
                                        </DropdownMenuItem>
                                        <RoleBasedRender
                                            allowedRoles={["admin"]}
                                        >
                                            <DropdownMenuItem>
                                                Edit
                                                <DropdownMenuShortcut>
                                                    ⇧⌘P
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                Delete
                                                <DropdownMenuShortcut>
                                                    ⇧⌘P
                                                </DropdownMenuShortcut>
                                            </DropdownMenuItem>
                                        </RoleBasedRender>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <h2 className="text-xl font-light text-foreground leading-tight">
                            {event.name}
                        </h2>
                    </div>
                    <div className="flex flex-wrap gap-4 text-xs text-muted-foreground font-light">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 shrink-0" />
                            <span className="text-foreground font-light">
                                {format(event.eventDate, "MMM dd, yyyy")}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0" />
                            <span className="text-foreground font-light">
                                {event.location || "No location specified"}
                            </span>
                        </div>
                    </div>
                </div>
                {event.description && (
                    <div className="text-sm text-foreground font-light leading-relaxed">
                        <p className="line-clamp-2">{event.description}</p>
                    </div>
                )}
                <div className="flex flex-col gap-2">
                    {event.eventSessions.map((session, index) => (
                        <Card
                            key={index}
                            className="px-3 py-2 rounded flex-row justify-between text-xs"
                        >
                            <span className="font-light text-foreground">
                                {eventSessionType[session.type]}
                            </span>
                            <div className="flex gap-4">
                                <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-muted-foreground" />
                                    <span className="text-foreground">
                                        {session.startTime} ~ {session.endTime}
                                    </span>
                                </div>
                                {(event.status === 3 || event.status === 4) && (
                                    <RoleBasedRender allowedRoles={["admin"]}>
                                        <div className="flex items-center gap-2">
                                            <Users className="h-3 w-3 text-muted-foreground" />
                                            <span className="text-foreground">
                                                {session.attendance.length}
                                            </span>
                                            <span className="text-foreground">
                                                (
                                                {(
                                                    (session.attendance.length /
                                                        totalStudents) *
                                                    100
                                                ).toFixed(0)}
                                                %)
                                            </span>
                                            {session.attendance.length > 0 && (
                                                <CheckCircle2 className="w-3.5 h-3.5 text-green-600 dark:text-green-400" />
                                            )}
                                        </div>
                                    </RoleBasedRender>
                                )}
                            </div>
                        </Card>
                    ))}
                </div>
                <RoleBasedRender allowedRoles={["user", ""]}>
                    <div className="flex items-center justify-between pt-2 border-border/50 border-t">
                        <span className="text-sm font-light text-muted-foraeground">
                            Interested in this event?
                        </span>
                        <div className="flex  items-center gap-2">
                            <span className="text-xs font-light text-muted-foraeground">
                                95
                            </span>
                            <Button
                                variant="ghost"
                                size="icon-sm"
                                className="p-0.5"
                                onClick={handleInterested}
                            >
                                <Heart
                                    className={`${
                                        interested && "fill-current"
                                    }`}
                                />
                            </Button>
                        </div>
                    </div>
                </RoleBasedRender>
                {event.status === 4 && (
                    <RoleBasedRender allowedRoles={["admin"]}>
                        <div className="flex items-center justify-between gap-4 text-xs font-light border-t pt-2 border-border/50">
                            <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="text-foreground">
                                    {totalAttendees} avg. attendees
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-3 w-3 " />
                                <span>
                                    {(
                                        (totalAttendees / totalStudents) *
                                        100
                                    ).toFixed(0)}
                                    % attendance
                                </span>
                            </div>

                            {/* <div className="flex items-center gap-2">
                                <Heart className="h-3 w-3 fill-current" />
                                <span className="text-foreground">
                                    95 Interested
                                </span>
                            </div> */}
                        </div>
                    </RoleBasedRender>
                )}
            </Card>
        </Link>
    );
}
