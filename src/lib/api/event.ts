import { Session } from "@/type";
import { fetchApi } from ".";
interface CreateEventProps {
    name: string;
    description: string;
    location: string;
    eventTypeId: string;
    eventSessions: Session[];
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
