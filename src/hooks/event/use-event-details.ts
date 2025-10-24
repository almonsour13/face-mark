import { useEffect, useState } from "react";
import { Event } from "./use-events";
import { useQuery } from "@tanstack/react-query";
interface Response{
    sucess: boolean;
    event: Event;
}
export const useEventDetails = (eventId: string) => {
     return useQuery<Response, Error>({
        queryKey: ["eventDetails", eventId],
        queryFn: async () => {
            const response = await fetch((`/api/event/${eventId}`));
            return await response.json();
        },
    });
};
