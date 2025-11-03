import { Badge } from "@/components//ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventSessionTypeValue, eventStatusValue } from "@/utils/event-utils";
import { format } from "date-fns";
import {
    ArrowLeftFromLine,
    ArrowRightFromLine,
    Calendar,
    Check,
    CheckCircle,
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
import { useState } from "react";
import { EventWithSessions } from "@/store/use-event-store";

export function EventCard({ event }: { event: EventWithSessions }) {
    const [interseted, setInterseted] = useState(false);

    const handleInterseted = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setInterseted(!interseted);
    };
    return (
        <Link
            key={event.id}
            href={`/event/${event.id}`}
            className="break-inside-avoid block mb-4"
        >
            <div className="bg-card border p-4 rounded-md hover:bg-muted/30 transition-colors flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <div className="w-full flex items-start justify-between gap-4">
                        <h2 className="text-xl font-normal text-foreground leading-tight flex-1">
                            {event.name}
                        </h2>
                        <div className="flex items-center gap-2 shrink-0">
                            {event.eventType && (
                                <Badge
                                    variant="outline"
                                    className="text-xs font-medium uppercase tracking-wide"
                                >
                                    {event.eventType.name}
                                </Badge>
                            )}
                            <Badge
                                variant="outline"
                                className="text-xs font-medium uppercase tracking-wide"
                            >
                                {eventStatusValue[event.status]}
                            </Badge>
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
                                    <RoleBasedRender allowedRoles={["admin"]}>
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
                        <div
                            key={index}
                            className="px-3 py-2 rounded bg-green-600/10s flex items-center justify-between text-xs border border-border/50 bg-muted/20"
                        >
                            <span className="font-light text-foreground">
                                {eventSessionTypeValue[session.type]}
                            </span>
                            <RoleBasedRender allowedRoles={["admin"]}>
                                <div className="flex gap-2">
                                    {/* in */}
                                    <div className="flex items-center gap-2">
                                        <ArrowRightFromLine className="h-3 w-3 text-green-600 dark:text-green-400" />
                                        <span className="text-foreground">
                                            100
                                        </span>
                                    </div>
                                    <span className="text-muted-foreground">
                                        |
                                    </span>
                                    {/* out */}
                                    <div className="flex items-center gap-2">
                                        <ArrowLeftFromLine className="h-3 w-3 text-orange-600" />
                                        <span className="text-foreground">
                                            95
                                        </span>
                                    </div>
                                </div>
                            </RoleBasedRender>
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    <span>
                                        {session.startTime} ~ {session.endTime}
                                    </span>
                                </div>
                                <CheckCircle className="w-3 h-3 text-green-600" />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="">
                    <RoleBasedRender allowedRoles={["user", ""]}>
                        <div className="flex items-center justify-between">
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
                                    onClick={handleInterseted}
                                >
                                    <Heart
                                        className={`${
                                            interseted && "fill-current"
                                        }`}
                                    />
                                </Button>
                            </div>
                        </div>
                    </RoleBasedRender>
                    <RoleBasedRender allowedRoles={["admin"]}>
                        <div className="flex items-center justify-between gap-4 text-xs font-light">
                            <div className="flex items-center gap-2">
                                <Users className="h-3 w-3 text-muted-foreground" />
                                <span className="text-foreground">
                                    100 attendees
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Target className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-green-600 dark:text-green-400">
                                    95% attendance
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Heart className="h-3 w-3 fill-current" />
                                <span className="text-foreground">
                                    95 Interested
                                </span>
                            </div>
                        </div>
                    </RoleBasedRender>
                </div>
            </div>
        </Link>
    );
}
