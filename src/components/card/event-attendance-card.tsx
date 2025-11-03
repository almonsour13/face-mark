import { levelsValue } from "@/constant";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";
import { EventAttendance } from "@/store/use-event-attendace-store";

export default function EventAttendanceCard({
    attendance,
    className,
}: {
    attendance: EventAttendance;
    className?: string;
}) {
    const { name, face, studentDetails } = attendance.user;

    const studentId = studentDetails?.studentId;
    const course =
        studentDetails?.course.name + ` (${studentDetails?.course.code})`;
    const level = studentDetails && levelsValue[studentDetails?.level.name];

    return (
        <div
            key={attendance.id}
            className={` flex gap-3 bg-card border rounded-md p-4 ${className}`}
        >
            <div className="h-28 w-28 rounded overflow-hidden bg-muted flex-shrink-0">
                <Image
                    src={
                        face?.imageUrl ||
                        "/placeholder.svg?height=120&width=120"
                    }
                    width={120}
                    height={120}
                    alt={`${name}'s profile`}
                    className="aspect-square object-cover w-full h-full"
                />
            </div>

            {/* Info Section */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                        <Link href={`/user/${attendance.user.id}`} className="hover:underline">
                            <h3 className="text-lg font-light text-foreground truncate">
                            {name}
                        </h3>
                        </Link>
                        <p className="text-xs font-light text-muted-foreground">
                            {studentDetails?.studentId}
                        </p>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                        <Badge variant="outline" className="text-xs">
                            {attendance.method === 1 ? "Face" : "Manual"}
                        </Badge>
                        <Badge
                            variant={
                                attendance.type === 1
                                    ? "default"
                                    : "destructive"
                            }
                            className="text-xs"
                        >
                            {attendance.type === 1 ? "In" : "Out"}
                        </Badge>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                    <span className="text-foreground">
                        {eventSessionTypeValue[attendance.session?.type || 1]}
                    </span>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-foreground">
                            {format(new Date(attendance.createdAt), "hh:mm aa")}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        {attendance.status === 1 ? (
                            <>
                                <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-green-600 dark:text-green-400">
                                    On Time
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-yellow-600 dark:text-yellow-400">
                                    Late
                                </span>
                            </>
                        )}
                    </div>
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-light text-foreground">
                        {course}
                    </p>
                    <p className="text-xs font-light text-muted-foreground">
                        {level}
                    </p>
                </div>
            </div>
        </div>
    );
}
