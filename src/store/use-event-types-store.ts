import { Course, EventType } from "@/type";
import { create } from "zustand";

interface EventTypesProps {
    eventTypes: EventType[];
    setEventTypes: (eventTypes: EventType[]) => void;
    addNewEventType: (eventType: EventType) => void;
    updateEventType: (id: string, eventType: EventType) => void;
}

export const useEventTypesStore = create<EventTypesProps>((set) => ({
    eventTypes: [],
    setEventTypes: (eventTypes) => set({ eventTypes }),
    addNewEventType: (eventType: EventType) =>
        set((state) => ({ eventTypes: [...state.eventTypes, eventType] })),
    updateEventType: (id, eventType) =>
        set((state) => ({
            eventTypes: state.eventTypes.map((c) => (c.id === id ? eventType : c)),
        })),
}));
