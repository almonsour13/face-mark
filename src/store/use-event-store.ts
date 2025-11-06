import { Event, EventType, Session } from "@/type";
import { create } from "zustand";

export interface EventWithSessions extends Event {
    eventSessions: Session[];
    eventType: EventType;
}
interface EventStore {
    isEventsLoading: boolean;
    setIsEventsLoading: (isEventsLoading: boolean) => void;
    events: EventWithSessions[];
    setEvents: (events: EventWithSessions[]) => void;
    addNewEvent: (event: EventWithSessions) => void;
    updateEvent: (id: string, event: EventWithSessions) => void;
    addMoreEvents: (events: EventWithSessions[]) => void;
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
    addMoreEvents: (events) =>
        set((state) => ({ events: [...state.events, ...events] })),
}));
