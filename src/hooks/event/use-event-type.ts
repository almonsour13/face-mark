import { useQuery } from "@tanstack/react-query";
interface EventType {
    id: string;
    name: string
}
interface Response {
    success: boolean;
    eventTypes: EventType[]
}
export const useEventTypes = () => {
    return useQuery<Response, Error>({
        queryKey: ["eventTypes"],
        queryFn: async () => {
            const response = await fetch("/api/event/type");
            return await response.json();
        },
    })
};