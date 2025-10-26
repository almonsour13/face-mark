import { useQuery } from "@tanstack/react-query";
import { Event } from "./use-events";
interface Response{
    sucess: boolean;
    event: Event;
}
export const useEventDetails = (eventId: string) => {
     return useQuery<Response, Error>({
        queryKey: ["eventDetails", eventId],
        queryFn: async () => {
            const response = await fetch((`/api/event/${eventId}`));
            return await response.json();
        },
    });
};
