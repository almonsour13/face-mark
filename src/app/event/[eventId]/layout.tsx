"use client";

import { EventStatsContext } from "@/context/event-details-context";
import { useEventDetails } from "@/hooks/query/event/use-event-details";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const eventId = useParams().eventId as string;
    const { data, isPending } = useEventDetails(eventId);

    const {
        eventDetails,
        setEventDetails,
        isEventDetailsLoading,
        setIsEventDetailsLoading,
    } = useEventDetailsStore();

    useEffect(() => {
        setIsEventDetailsLoading(isPending);
        if (data?.event) {
            setEventDetails(data.event);
        }
    }, [data, isPending, setEventDetails, setIsEventDetailsLoading]);

    const totalAttendees = eventDetails
        ? Math.round(
              eventDetails.eventSessions.reduce(
                  (total, session) => total + session.attendance.length,
                  0
              ) / eventDetails.eventSessions.length
          )
        : 0;
    const totalStudents = data?.totalStudents;
    return (
        <EventStatsContext.Provider value={{ totalAttendees, totalStudents }}>
            {children}
        </EventStatsContext.Provider>
    );
}
