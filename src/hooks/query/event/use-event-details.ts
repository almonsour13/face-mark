import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { EventDetails } from "@/store/use-event-details-store";
interface Response {
    sucess: boolean;
    event: EventDetails;
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
