import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUserAttendanceStore } from "@/store/use-user-attendance-store";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { Badge } from "./ui/badge";

export default function UserAttendancesTable() {
    const { userAttendances, isUserAttendanceLoading } =
        useUserAttendanceStore();

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Attendance Records
            </h2>
            {isUserAttendanceLoading ? (
                <div className="">loading</div>
            ) : userAttendances && userAttendances.length > 0 ? (
                <div className="rounded border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Event Name</TableHead>
                                <TableHead>Event Date</TableHead>
                                <TableHead>Session</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Remarks</TableHead>
                                <TableHead>Method</TableHead>
                                <TableHead>Attended At</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userAttendances.map((attendance) => (
                                <TableRow key={attendance.id}>
                                    <TableCell>
                                        {attendance.event.name}
                                    </TableCell>
                                    <TableCell>
                                        {format(
                                            attendance.event.eventDate,
                                            "MMM dd, yyyy h:mm aa"
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {attendance.session &&
                                            eventSessionTypeValue[
                                                attendance.session.type
                                            ]}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                attendance.type === 1
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs"
                                        >
                                            {attendance.type === 1
                                                ? "Time In"
                                                : "Time Out"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                attendance.status === 1
                                                    ? "default"
                                                    : "destructive"
                                            }
                                            className="text-xs"
                                        >
                                            {attendance.status === 1
                                                ? "On Time"
                                                : "Late"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {attendance.method === 1
                                            ? "Face Recognition"
                                            : "Manual"}
                                    </TableCell>
                                    <TableCell>
                                        {format(
                                            attendance.createdAt,
                                            "MMM dd, yyyy h:mm aa"
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="text-white w-full h-full">No Attendance</div>
            )}
        </div>
    );
}
