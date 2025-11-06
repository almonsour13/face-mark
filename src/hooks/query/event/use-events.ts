import { fetchApi } from "@/lib/api";
import { EventWithSessions } from "@/store/use-event-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    message?: string;
    error?: string;
    newEvent?: EventWithSessions;
    events?: EventWithSessions[];
    hasMore?: boolean;
    nextCursor?: string | null;
}
interface UseEventProps {
    filters: Record<string, string>;
    nextCursor?: string | null;
}

export const useEvents = ({
    filters,
    nextCursor
}: UseEventProps) => {
    return useQuery<Response, Error>({
        queryKey: ["events", nextCursor, filters],
        queryFn: async () => {
            const params = new URLSearchParams({
                ...filters,
                ...(nextCursor && { nextCursor }),
            });

            const response = await fetchApi(`/api/event?${params.toString()}`);
            return response;
        },
    });
};
