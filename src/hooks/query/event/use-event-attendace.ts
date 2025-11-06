import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { EventAttendance } from "@/store/use-event-attendace-store";

interface Response {
    sucess: boolean;
    attendance: EventAttendance[];
    hasMore?: boolean;
    nextCursor?: string | null;
}
interface useEventAttendanceProps {
    eventId: string;
    filters?: Record<string, string>;
    nextCursor?: string | null;
}
export const useEventAttendance = ({
    eventId,
    filters,
    nextCursor,
}: useEventAttendanceProps) => {
    return useQuery<Response, Error>({
        queryKey: ["eventAttendance", eventId, eventId, nextCursor],
        queryFn: async () => {
            const params = new URLSearchParams({
                ...filters,
                ...(nextCursor && { nextCursor }),
            });
            const response = await fetchApi<Response>(
                `/api/event/${eventId}/attendance?${params.toString()}`
            );
            console.log(response)
            return response;
        },
    });
};
