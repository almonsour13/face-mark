import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
interface Response{
    sucess: boolean;
    stats:{
        name: string;
        value:number;
    }[]
}
export const useEventAttendanceStatistic = (eventId: string) => {
    return useQuery<Response, Error>({
        queryKey: ["eventAttendanceStatistics", eventId,],
        queryFn: async () => {
            const response = await fetchApi<Response>(`/api/event/${eventId}/attendance/statistics`);
            return response;
        },
    });
};
