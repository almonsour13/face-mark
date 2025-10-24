import { Event } from "@/hooks/event/use-events";
import { create } from "zustand";

interface EventDetailsProps {
    isEventDetailsLoading: boolean;
    setIsEventDetailsLoading: (isLoading: boolean) => void;
    eventDetails: Event | null;
    setEventDetails: (eventDEtails: Event) => void;
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
            } as Event,
        })),
}));
