import { Course, EventType } from "@/type";
import { create } from "zustand";

interface EventTypesProps {
    eventTypes: EventType[];
    setEventTypes: (eventTypes: EventType[]) => void;
}

export const useEventTypesStore = create<EventTypesProps>((set) => ({
    eventTypes: [],
    setEventTypes: (eventTypes) => set({ eventTypes }),
}));
