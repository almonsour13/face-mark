import { eventSessionType, levelsValue } from "@/constant";
import { AttendanceWithEventAndUser } from "@/store/use-attendance-store";
import { format } from "date-fns";
import { AlertCircle, CheckCircle2, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";

export const AdminAttendanceCard = ({
    attendance,
}: {
    attendance: AttendanceWithEventAndUser;
}) => {
    const { name, face, studentDetails } = attendance.user;

    const studentId = studentDetails?.studentId;
    const course =
        studentDetails?.course.name + ` (${studentDetails?.course.code})`;
    const level = studentDetails && levelsValue[studentDetails?.level.name];
    return (
        <Card className={`flex-row`}>
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
                    <div className="flex flex-col gap-1">
                        <Link
                            href={`/user/${attendance.user.id}`}
                            className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors"
                        >
                            {attendance.user.name}
                        </Link>

                        <div className="">
                            <p className="text-xs font-light text-muted-foreground">
                                {[studentId, course, level]
                                    .filter(Boolean)
                                    .join(" | ")}
                            </p>
                        </div>
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
                <Link
                    href={`/event/${attendance.event.id}`}
                    className="text-xs font-light text-foreground hover:text-muted-foreground transition-colors leading-tight group inline-flex items-center gap-2"
                >
                    {attendance.event.name}
                </Link>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                    <span className="text-foreground">
                        {eventSessionType[attendance.session?.type || 1]}
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
            </div>
        </Card>
    );
};
