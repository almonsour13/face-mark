
import { Session } from "inspector";
import { create } from "zustand";

export interface EventDetails extends Event{
    eventSessions: Session[];
}
interface EventDetailsProps {
    isEventDetailsLoading: boolean;
    setIsEventDetailsLoading: (isLoading: boolean) => void;
    eventDetails: EventDetails | null;
    setEventDetails: (eventDEtails: EventDetails) => void;
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
            } as EventDetails,
        })),
}));
