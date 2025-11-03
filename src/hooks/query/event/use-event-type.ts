import { fetchApi } from "@/lib/api";
import { EventType } from "@/type";
import { useQuery } from "@tanstack/react-query";


interface Response {
    success: boolean;
    eventTypes: EventType[]
}
export const useEventTypes = () => {
    return useQuery<Response, Error>({
        queryKey: ["eventTypes"],
        queryFn: async () => {
            const response = await fetchApi("/api/event/type");
            return response;
        },
    })
};