import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { useUserAttendanceStore } from "@/store/use-user-attendance-store";
import { eventSessionTypeValue } from "@/utils/event-utils";
import { format } from "date-fns";
import { UserAttendanceSkeleton } from "../skeleton-loader";
import {
    Calendar,
    Clock,
    CheckCircle2,
    AlertCircle,
    Scan,
    User,
} from "lucide-react";
import { Badge } from "../ui/badge";
import UserAttendanceCard from "../card/user-attendance-card";

export default function UserAttendancesDisplay() {
    const { userAttendances, isUserAttendanceLoading } =
        useUserAttendanceStore();

    return (
        <div className="w-full flex flex-col gap-2">
            <h2 className="text-lg font-light">Attendance Records</h2>

            {isUserAttendanceLoading ? (
                <UserAttendanceSkeleton />
            ) : userAttendances && userAttendances.length > 0 ? (
                <div className="flex flex-col gap-2">
                    {userAttendances.map((attendance) => <UserAttendanceCard key={attendance.id} attendance={attendance} />)}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border/30 rounded-lg">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-border/30 flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                    <h3 className="text-lg font-light mb-2">
                        No Attendance Yet
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                        This user hasn't attended any events yet.
                    </p>
                </div>
            )}
        </div>
    );
}
