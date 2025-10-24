import { Event } from "@/hooks/event/use-events";
import { create } from "zustand";

interface EventStore {
    isEventsLoading: boolean;
    setIsEventsLoading: (isEventsLoading: boolean) => void;
    events: Event[];
    setEvents: (events: Event[]) => void;
    addNewEvent: (event: Event) => void;
    updateEvent: (id: string, event: Event) => void;
}
export const useEventStore = create<EventStore>((set) => ({
    isEventsLoading: true,
    setIsEventsLoading: (isEventsLoading) => set({ isEventsLoading }),
    events: [],
    setEvents: (events) => set({ events }),
    addNewEvent: (event) =>
        set((state) => ({ events: [...state.events, event] })),
    updateEvent: (id, event) =>
        set((state) => ({
            events: state.events.map((e) => (e.id === id ? event : e)),
        })),
}));
