"use client";

import { createContext, useContext } from "react";

interface EventStatsContextType {
    totalAttendees: number;
    totalStudents?: number;
}

export const EventStatsContext = createContext<EventStatsContextType>({
    totalAttendees: 0,
    totalStudents: 0,
});

export const useEventStats = () => useContext(EventStatsContext);
