"use client";
import {
    Item,
    ItemContent,
    ItemGroup,
    ItemHeader,
    ItemMedia
} from "@/components/ui/item";
import { Skeleton } from "@/components/ui/skeleton";
import { EventAttendance } from "@/store/use-event-attendace-store";
import { AnimatePresence, motion } from "framer-motion";
import EventAttendanceCard from "../card/event-attendance-card";

interface AttendedUsersProps {
    attendance: EventAttendance[];
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
                                <EventAttendanceCard attendance={attendance} className="gap-4"/>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </div>
        </div>
    );
}
