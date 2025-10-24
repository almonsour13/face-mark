"use client";

import { useEventAttendance } from "@/hooks/event/use-event-attendace";
import { useEventDetails } from "@/hooks/event/use-event-details";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { useEventDetailsStore } from "@/store/use-event-details-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const eventId = useParams().eventId as string;
    const { data: eventDetailsData, isPending: isEventDetailsLoading } =
        useEventDetails(eventId);
    const { setEventDetails, setIsEventDetailsLoading } =
        useEventDetailsStore();

    useEffect(() => {
        setIsEventDetailsLoading(isEventDetailsLoading);
        if (eventDetailsData?.event) {
            setEventDetails(eventDetailsData.event);
        }
    }, [
        eventDetailsData,
        isEventDetailsLoading,
        setEventDetails,
        setIsEventDetailsLoading,
    ]);

    return <>{children}</>;
}
