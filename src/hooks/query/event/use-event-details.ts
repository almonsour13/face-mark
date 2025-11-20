import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { EventWithSessions } from "@/store/use-event-store";
interface Response {
    sucess: boolean;
    event: EventWithSessions;
    totalStudents?: number;
}
export const useEventDetails = (eventId: string) => {
    return useQuery<Response, Error>({
        queryKey: ["eventDetails", eventId],
        queryFn: async () => {
            const response = await fetchApi(`/api/event/${eventId}`);
            return response;
        },
    });
};
