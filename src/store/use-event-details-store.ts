
import { Event, EventType, Session } from "@/type";
import { create } from "zustand";
import { EventWithSessions } from "./use-event-store";

interface EventDetailsProps {
    isEventDetailsLoading: boolean;
    setIsEventDetailsLoading: (isLoading: boolean) => void;
    eventDetails: EventWithSessions | null;
    setEventDetails: (eventDEtails: EventWithSessions) => void;
}

export const useEventDetailsStore = create<EventDetailsProps>((set) => ({
    eventDetails: null,
    isEventDetailsLoading: false,
    setIsEventDetailsLoading: (isLoading) =>
        set(() => ({ isEventDetailsLoading: isLoading })),
    setEventDetails: (eventDetails) =>
        set(() => ({ eventDetails })),

    updateEventDetails: (updatedDetails: Partial<Event>) =>
        set((state) => ({
            eventDetails: {
                ...state.eventDetails,
                ...updatedDetails,
            } as EventWithSessions,
        })),
}));
