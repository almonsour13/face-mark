import { fetchApi } from "@/lib/api";
import { getAllAttendance } from "@/lib/api/attendance";
import { EventWithSessions } from "@/store/use-event-store";
import { UserWithDetails } from "@/store/use-user-store";
import { Attendance, Event, Session, User } from "@/type";
import { useQuery } from "@tanstack/react-query";

interface AttendanceWithEventAndUser extends Attendance {
    event: EventWithSessions;
    user: UserWithDetails;
    session: Session;
}
interface Response {
    success: boolean;
    attendance: AttendanceWithEventAndUser[];
    hasMore?: boolean;
    nextCursor?: string | null;
}
interface UseAttendanceProps {
    filters: Record<string, string>;
    nextCursor?: string | null;
}

export const useAttendance = ({ filters, nextCursor }: UseAttendanceProps) => {
    return useQuery<Response, Error>({
        queryKey: ["attendances", nextCursor, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                ...filters,
                ...(nextCursor && { nextCursor }), // Only add if search has value
            });
            const response = await fetchApi(
                `/api/attendance?${params.toString()}`
            );
            return response;
        },
    });
};
