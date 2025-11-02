"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
    Item,
    ItemContent,
    ItemDescription,
    ItemGroup,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Attendance } from "@/hooks/query/event/use-event-attendace";
import { Badge } from "../ui/badge";
import { levelsValue } from "@/constant";

interface AttendedUsersProps {
    attendance: Attendance[];
    isEvenAttendanceLoading?: boolean;
}

export default function RecentAttendedUsers({
    attendance,
    isEvenAttendanceLoading = false,
}: AttendedUsersProps) {
    const reversedAttendance = [...attendance].reverse();

    if (isEvenAttendanceLoading) {
        return (
            <div className="w-full">
                <ItemGroup className="gap-2  min-h-full">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <Item key={index} variant="outline">
                            <ItemMedia
                                variant="image"
                                className="h-14 w-14 overflow-hidden"
                            >
                                <Skeleton className="h-full w-full rounded-full" />
                            </ItemMedia>
                            <ItemContent>
                                <ItemHeader>
                                    <Skeleton className="h-5 w-32" />
                                    <Skeleton className="h-4 w-16" />
                                </ItemHeader>
                                <Skeleton className="h-4 w-48" />
                            </ItemContent>
                        </Item>
                    ))}
                </ItemGroup>
            </div>
        );
    }

    if (reversedAttendance.length === 0) {
        return (
            <div className="w-full flex items-center justify-center py-8 border border-dashed rounded-lg">
                <p className="text-sm text-muted-foreground">
                    No attendance records yet
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-h-96">
            <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                    {reversedAttendance.map((attendance, index) => {
                        const { name, face } = attendance.user;
                        const { course, level, studentId } =
                            attendance.user.studentDetails || {};

                        return (
                            <motion.div
                                key={attendance.id}
                                initial={{
                                    opacity: 0,
                                    y: -20,
                                    scale: 0.95,
                                }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index < 10 ? index * 0.05 : 0,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <div className="flex gap-4 p-4 rounded-md bg-muted">
                                    <div className="h-24 w-24 rounded overflow-hidden bg-muted flex-shrink-0">
                                        <Image
                                            src={
                                                face?.imageUrl ||
                                                "/placeholder.svg?height=120&width=120"
                                            }
                                            width={120}
                                            height={120}
                                            alt={`${name}'s face`}
                                            className="aspect-square object-cover w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between min-w-0 gap-2">
                                        <div className="flex items-start justify-between gap-4">
                                            <h3 className="text-lg text-foreground truncate leading-tight">
                                                {name}
                                            </h3>
                                            <Badge
                                                variant={
                                                    attendance.type === 1
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className="text-xs"
                                            >
                                                {attendance.type === 1
                                                    ? "In"
                                                    : "Out"}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between gap-4">
                                            <p className="text-sm text-muted-foreground">
                                                {format(
                                                    new Date(
                                                        attendance.createdAt
                                                    ),
                                                    "hh:mm aa"
                                                )}
                                            </p>
                                            <span
                                                className={`text-xs ${
                                                    attendance.status === 1
                                                        ? "text-green-600"
                                                        : "text-orange-600"
                                                }`}
                                            >
                                                {attendance.status === 1
                                                    ? "On Time"
                                                    : "Late"}
                                            </span>
                                        </div>

                                        {(studentId || course || level) && (
                                            <div className="space-y-1">
                                                {studentId && (
                                                    <p className="text-xs text-muted-foreground">
                                                        {studentId}
                                                    </p>
                                                )}
                                                <p className="text-xs text-muted-foreground">
                                                    {[
                                                        course?.name,
                                                        levelsValue[
                                                            level?.name
                                                        ],
                                                    ]
                                                        .filter(Boolean)
                                                        .join(" • ")}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
