"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import {
    Attendance,
    useEventAttendance,
} from "@/hooks/event/use-event-attendace";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import RecentAttendedUsers from "./recent-attended-users";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { Badge } from "../ui/badge";
import { useParams } from "next/navigation";

interface RecentAttendedUsersPanelProps {
    lastUserAttended: Attendance | null;
}
export default function RecentAttendedUsersPanel({
    lastUserAttended,
}: RecentAttendedUsersPanelProps) {
    const eventId = useParams().eventId as string;

    const [showLastAttendee, setShowLastAttendee] = useState(true);
    const { isEventAttendanceLoading, eventAttendance, setEventAttendance, setEventAttendanceLoading } =
        useEventAttendanceStore();

    const { data: eventAttendanceData, isPending: isLoading } = useEventAttendance({
        eventId,
        sessionType: "0",
        level: "all",
        attendanceType: "0",
    });

    useEffect(() => {
        setEventAttendanceLoading(isLoading)
        if (eventAttendanceData?.attendance) {
            setEventAttendance(eventAttendanceData.attendance);
        }
    }, [eventAttendanceData, isLoading, setEventAttendance, setEventAttendanceLoading]);

    return (
        <div className="w-full lg:w-sm bg-card border rounded-md p-4 py-2 flex flex-col gap-4 lg:max-h-full overflow-y-auto relative">
            {showLastAttendee && (
                <div className="flex flex-col w-full gap-2 shrink-0 relative">
                    <div className="flex h-9 items-center justify-between">
                        <h2 className="font-semibold">Last Attendee</h2>
                    </div>
                    <Card className="py-4 gap-2 bg-muted">
                        {isEventAttendanceLoading ? (
                            <CardContent className="flex gap-4 px-4  py-0">
                                <Skeleton className="h-24 w-24 rounded" />
                            </CardContent>
                        ) : (
                            <CardContent className="flex gap-4 px-4  py-0">
                                {lastUserAttended ? (
                                    <>
                                        <Avatar className="h-24 w-24 shrink-0 rounded">
                                            <AvatarImage
                                                className="object-cover rounded"
                                                src={
                                                    lastUserAttended.user
                                                        .faceImages.imageUrl ||
                                                    "/placeholder.svg" ||
                                                    "/placeholder.svg"
                                                }
                                                alt={lastUserAttended.user.name}
                                            />
                                            <AvatarFallback>
                                                {lastUserAttended.user.name
                                                    .split(" ")
                                                    .map((n: string) => n[0])
                                                    .join("")
                                                    .toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col items-start justify-center min-w-0 gap-1">
                                            <CardTitle className="tex-2xl truncate">
                                                {lastUserAttended.user.name}
                                            </CardTitle>
                                            <div className="w-full flex items-center justify-between">
                                                <p className="text-sm text-muted-foreground">
                                                    {format(
                                                        lastUserAttended.createdAt,
                                                        "hh:mm aa"
                                                    )}
                                                </p>
                                                <Badge
                                                    variant={
                                                        lastUserAttended.type ===
                                                        1
                                                            ? "default"
                                                            : "destructive"
                                                    }
                                                    className="text-xs"
                                                >
                                                    {lastUserAttended.type === 1
                                                        ? "Time In"
                                                        : "Time Out"}
                                                </Badge>
                                            </div>
                                            {lastUserAttended.user
                                                .studentDetails && (
                                                <p className="text-xs text-muted-foreground truncate">
                                                    {[
                                                        lastUserAttended.user
                                                            .studentDetails
                                                            .course,
                                                        lastUserAttended.user
                                                            .studentDetails
                                                            .level,
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </p>
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <div className="flex items-center justify-center w-full py-4">
                                        <p className="text-sm text-muted-foreground">
                                            No attendance yet
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        )}
                    </Card>
                </div>
            )}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowLastAttendee(!showLastAttendee)}
                title={
                    showLastAttendee
                        ? "Hide Last Attendee"
                        : "Show Last Attendee"
                }
                className="absolute  top-2 right-4"
            >
                {showLastAttendee ? <ArrowUp /> : <ArrowDown />}
            </Button>
            <div className="flex flex-col gap-2 min-h-0 flex-1">
                <div className="flex h-9 items-center justify-between">
                    <h2 className="font-semibold shrink-0">
                        Recent Attendance
                    </h2>
                </div>
                <ScrollArea className="flex-1 min-h-0">
                    <RecentAttendedUsers
                        attendance={eventAttendance}
                        isEvenAttendanceLoading={isEventAttendanceLoading}
                    />
                </ScrollArea>
            </div>
        </div>
    );
}
