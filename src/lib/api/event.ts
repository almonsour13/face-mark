import { EventSession } from "@/hooks/query/event/use-events";
import { fetchApi } from ".";
interface CreateEventProps {
    name: string;
    description: string;
    location: string;
    eventType: string;
    eventSessions: EventSession[];
    eventDate: Date;
    status: number;
}
export const createEvent = async (data: CreateEventProps) => {
    const response = await fetchApi("/api/event", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return response;
};
