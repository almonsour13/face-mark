import { useQuery } from "@tanstack/react-query";
import { Event } from "./use-events";
import { fetchApi } from "@/lib/api";
interface Response {
    sucess: boolean;
    event: Event;
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
