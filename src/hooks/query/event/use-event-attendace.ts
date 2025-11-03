import { useQuery } from "@tanstack/react-query";
import { User } from "../user/use-users";
import { fetchApi } from "@/lib/api";
import { EventAttendance } from "@/store/use-event-attendace-store";


interface Response{
    sucess: boolean;
    attendance: EventAttendance[];
}
interface useEventAttendanceProps {
    eventId: string;
    sessionType:string;
    level: string;
    attendanceType: string;
    search?: string;
    count?: number
}
export const useEventAttendance = ({eventId, sessionType, level, attendanceType, search, count = 20}: useEventAttendanceProps) => {
    return useQuery<Response, Error>({
        queryKey: ["eventAttendance", eventId, sessionType, level, attendanceType, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                sessionType,
                level,
                attendanceType,
                count: count.toString(),
                ...(search && { search }),
            });
            const response = await fetchApi<Response>(`/api/event/${eventId}/attendance?${params.toString()}`);
            return response;
        },
    });
};
