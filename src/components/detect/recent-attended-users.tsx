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
import { Attendance } from "@/hooks/event/use-event-attendace";
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
            <ItemGroup className="gap-2">
                <AnimatePresence mode="popLayout">
                    {reversedAttendance.map((attendance, index) => {
                        const { name, faceImages } = attendance.user;
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
                                <Item variant="outline" className="p-3">
                                    <ItemMedia
                                        variant="image"
                                        className="h-20 w-20 overflow-hidden"
                                    >
                                        <Image
                                            src={
                                                faceImages?.imageUrl ||
                                                "/placeholder.svg?height=100&width=100" ||
                                                "/placeholder.svg"
                                            }
                                            width={100}
                                            height={100}
                                            alt={`${name}'s face`}
                                            className="aspect-square object-cover rounded-md  "
                                        />
                                    </ItemMedia>
                                    <ItemContent className="">
                                        <ItemHeader>
                                            <ItemTitle className="text-foreground truncate leading-tight">{name}</ItemTitle>
                                            <Badge
                                                variant={
                                                    attendance.type === 1
                                                        ? "default"
                                                        : "destructive"
                                                }
                                                className="text-xs font-medium shrink-0"
                                            >
                                                {attendance.type === 1
                                                    ? "In"
                                                    : "Out"}
                                            </Badge>
                                        </ItemHeader>

                                        <div className="flex w-full items-center justify-between">
                                            <ItemDescription className="text-xs text-muted-foreground font-light">
                                                {format(
                                                    attendance.createdAt,
                                                    "hh:mm aa"
                                                )}
                                            </ItemDescription>
                                        </div>
                                        {(studentId || course || level) && (
                                            <ItemDescription className="text-xs text-muted-foreground font-light">
                                                {[
                                                    course.name,
                                                    levelsValue[level.name],
                                                ]
                                                    .filter(Boolean)
                                                    .join(" • ")}
                                            </ItemDescription>
                                        )}
                                        
                                    </ItemContent>
                                </Item>
                            </motion.div>
                        );
                    })}
                </AnimatePresence>
            </ItemGroup>
        </div>
    );
}
