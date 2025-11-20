
import { Calendar, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { UserAttendances } from "@/store/use-user-attendance-store";
import { eventSessionType } from "@/constant";
import { Card } from "../ui/card";
import Link from "next/link";

export default function UserAttendanceCard({
    attendance,
}: {
    attendance: UserAttendances;
}) {
    const isOnTime = attendance.status === 1;
    const isTimeIn = attendance.type === 1;
    const isFaceRecognition = attendance.method === 1;

    return (
        <Card
            key={attendance.id}
        >
            <div className="flex flex-col gap-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-4">
                        <Link
                               href={`/event/${attendance.event.id}`}
                                className="text-xl font-light text-foreground hover:text-muted-foreground transition-colors leading-tight group inline-flex items-center gap-2"
                            >
                                {attendance.event.name}
                            </Link>
                        <div className="flex items-center gap-2 text-xs font-light text-muted-foreground">
                            <Calendar className="h-3 w-3" />
                            <span className="text-foreground">
                                {format(
                                    new Date(attendance.event?.eventDate),
                                    "MMMM dd, yyyy"
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                        <Badge variant="outline" className="text-xs">
                            {isFaceRecognition ? "Face" : "Manual"}
                        </Badge>

                        <Badge
                            variant={isTimeIn ? "default" : "destructive"}
                            className="text-xs"
                        >
                            {isTimeIn ? "In" : "Out"}
                        </Badge>
                    </div>
                </div>

                {/* Details */}
                <div className="flex flex-wrap gap-4 text-xs font-light text-muted-foreground">
                    <span className="text-foreground">
                        {eventSessionType[attendance.session.type]}
                    </span>
                    <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        <span className="text-foreground">
                            {format(new Date(attendance.createdAt), "h:mm aa")}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        {isOnTime ? (
                            <>
                                <CheckCircle2 className="h-3 w-3 text-green-600 dark:text-green-400" />
                                <span className="text-green-600 dark:text-green-400 font-light">
                                    On Time
                                </span>
                            </>
                        ) : (
                            <>
                                <AlertCircle className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                                <span className="text-yellow-600 dark:text-yellow-400 font-light">
                                    Late
                                </span>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}
