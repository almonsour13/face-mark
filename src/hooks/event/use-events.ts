import { useMutation, useQuery } from "@tanstack/react-query";

export interface EventSession {
    id?: string;
    type: number;
    startTime: string;
    endTime: string;
    requiresTimeOut: number;
    allowEarlyTimeIn: number;
    allowEarlyTimeOut: number;
    gracePeriod?: number;
}
interface EventType {
    id: string;
    name: string;
    createdAt: Date;
}
export interface Event {
    id?: string;
    eventTypeId: string;
    name: string;
    description: string;
    location: string | null;
    eventDate: Date;
    status: number;
    eventType?: EventType | null;
    eventSessions: EventSession[];
}
interface Response {
    success: boolean;
    message?: string;
    error?: string;
    newEvent?: Event;
    events?: Event[];
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

            const response = await fetch(`/api/event?${params.toString()}`);
            return await response.json();
        },
    });
};

export const useCreateEvent = () => {
    return useMutation<Response, Error, Event>({
        mutationFn: async (data) => {
            const response = await fetch("/api/event", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return await response.json();
        },
    });
};
