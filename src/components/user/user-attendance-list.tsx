import {
    Empty,
    EmptyHeader,
    EmptyTitle
} from "@/components/ui/empty";
import { useUserAttendanceStore } from "@/store/use-user-attendance-store";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { UserAttendanceSkeleton } from "../skeleton-loader";
import { Badge } from "../ui/badge";

export default function UserAttendancesDisplay() {
    const { userAttendances, isUserAttendanceLoading } =
        useUserAttendanceStore();

    return (
        <div className="w-full flex flex-col gap-4">
            <h2 className="text-sm font-semibold">Attendance Records</h2>
            {isUserAttendanceLoading ? (
                <UserAttendanceSkeleton />
            ) : userAttendances && userAttendances.length > 0 ? (
                <div className="rounded overflow-hidden">
                    <div className="flex flex-col gap-3">
                        {userAttendances.map((attendance) => {
                            const isOnTime = attendance.status === 1;
                            const isTimeIn = attendance.type === 1;
                            const isFaceRecognition = attendance.method === 1;

                            return (
                                <div className="bg-card border p-4 rounded-md">
                                    <div className="flex flex-col gap-2">
                                        {/* Header with event name and badges */}
                                        <div className="flex justify-between items-start">
                                            <div className="">
                                                <h3 className="text-lg text-foreground leading-tight mb-2">
                                                    {attendance.event.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {format(
                                                        new Date(
                                                            attendance.event.eventDate
                                                        ),
                                                        "MMMM dd, yyyy"
                                                    )}
                                                </p>
                                            </div>

                                            <div className="flex gap-2">
                                                <Badge
                                                    variant={
                                                        isFaceRecognition
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className="text-xs tracking-wide"
                                                >
                                                    {isFaceRecognition
                                                        ? "Face"
                                                        : "Manual"}
                                                </Badge>
                                                <Badge
                                                    variant={
                                                        isTimeIn
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className="text-xs tracking-wide text-white"
                                                >
                                                    {isTimeIn ? "In" : "Out"}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Session and status details */}
                                        <div className="flex justify-between gap-3">
                                            <p className="text-sm text-muted-foreground">
                                                {
                                                    eventSessionTypeValue[
                                                        attendance.session.type
                                                    ]
                                                }
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <span className="text-sm text-muted-foreground">
                                                    {format(
                                                        new Date(
                                                            attendance.createdAt
                                                        ),
                                                        "h:mm aa"
                                                    )}
                                                </span>
                                                <span
                                                    className={`text-sm whitespace-nowrap ${
                                                        isOnTime
                                                            ? "text-green-600"
                                                            : "text-orange-600"
                                                    }`}
                                                >
                                                    {isOnTime
                                                        ? "On Time"
                                                        : "Late"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>No Attendance Yet</EmptyTitle>
                    </EmptyHeader>
                </Empty>
            )}
        </div>
    );
}
