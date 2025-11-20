"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { levelsValue } from "@/constant";
import {
    EventAttendance
} from "@/store/use-event-attendace-store";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../ui/badge";
import RecentAttendedUsers from "./recent-attended-users";

interface RecentAttendedUsersPanelProps {
    lastUserAttended: EventAttendance | null;
}

export default function RecentAttendedUsersPanel({
    lastUserAttended,
}: RecentAttendedUsersPanelProps) {

    const [showLastAttendee, setShowLastAttendee] = useState(false);
    return (
        <div className="w-full lg:w-md bg-card p-4 rounded-md flex flex-col gap-4 lg:max-h-full relative overflow-hidden">
            {showLastAttendee && (
                <div className="flex flex-col w-full gap-2 shrink-0 relative">
                    <div className="flex h-9 items-center justify-between">
                        <h2 className="text-sm font-semibold">Last Attendee</h2>
                    </div>
                    <Card className="py-4 gap-2">
                        {lastUserAttended === null ? (
                            <CardContent className="flex gap-4 px-4 py-0">
                                <Skeleton className="h-24 w-24 rounded" />
                            </CardContent>
                        ) : (
                            <CardContent className="flex gap-4 px-4 py-0">
                                {lastUserAttended ? (
                                    <>
                                        <Avatar className="h-24 w-24 shrink-0 rounded">
                                            <AvatarImage
                                                className="object-cover rounded"
                                                src={
                                                    lastUserAttended.user.face
                                                        ?.imageUrl ||
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
                                            <CardTitle className="text-2xl truncate">
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
                                                            .course.name,
                                                        levelsValue[
                                                            lastUserAttended
                                                                .user
                                                                .studentDetails
                                                                .level.name
                                                        ],
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
            <div className="flex-1 flex flex-col min-h-0 gap-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-light">Recent Attendance</h2>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowLastAttendee(!showLastAttendee)}
                        title={
                            showLastAttendee
                                ? "Hide Last Attendee"
                                : "Show Last Attendee"
                        }
                        className="hidden"
                    >
                        {showLastAttendee ? <ArrowUp /> : <ArrowDown />}
                    </Button>
                </div>
                <RecentAttendedUsers />
            </div>
        </div>
    );
}
