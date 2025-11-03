import { fetchApi } from "@/lib/api";
import { EventWithSessions } from "@/store/use-event-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    message?: string;
    error?: string;
    newEvent?: EventWithSessions;
    events?: EventWithSessions[];
}
interface UseEventProps {
    type: string;
    status: string;
    sortBy: string;
    search?: string;
    count?: number;
}

export const useEvents = ({
    type,
    status,
    sortBy,
    search = "",
    count = 20,
}: UseEventProps) => {
    return useQuery<Response, Error>({
        queryKey: ["events", type, status, sortBy, search, count],
        queryFn: async () => {
            const params = new URLSearchParams({
                type,
                status,
                sortBy,
                count: count.toString(),
                ...(search && { search }), // Only add if search has value
            });

            const response = await fetchApi(`/api/event?${params.toString()}`);
            return response;
        },
    });
};
