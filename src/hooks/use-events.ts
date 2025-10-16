import { set } from "date-fns";
import { useEffect, useState } from "react";

interface EventType {
    id: string;
    name: string;
    createdAt: Date;
}
export interface Event {
    id: string;
    eventTypeId: string;
    name: string;
    description: string;
    startTime: Date;
    endTime: Date;
    createdAt: Date;
    updatedAt: Date;
    eventType: EventType;
}
export const useEvent = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [isEventsLoading, setIsEventsLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            setIsEventsLoading(true);
            try {
                const response = await fetch("/api/event");
                const data = await response.json();
                if (data.success) {
                    console.log("Event Data Fetch Successfully:", data.events)
                    setEvents(data.events);
                }
            } catch (error) {
                console.error("Error fetching events:", error);
            } finally {
                setIsEventsLoading(false);
            }
        };
        fetchEvents();
    }, []);
    
    return {
        events,
        setEvents,
        isEventsLoading,
    };
};
