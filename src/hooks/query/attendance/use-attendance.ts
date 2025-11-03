import { fetchApi } from "@/lib/api";
import { getAllAttendance } from "@/lib/api/attendance";
import { useQuery } from "@tanstack/react-query";
import { Attendance } from "../event/use-event-attendace";
import { Event } from "../event/use-events";

interface a extends Attendance {
   event:Event
}
interface Response {
    success : boolean;
    attendance: a[]
}

export const useAttendance = () => {
    return useQuery<Response, Error>({
        queryKey: ["attendances"],
        queryFn: async () => {
            const response = await getAllAttendance();
            console.log("response:", response);
            return response;
        },
    });
};
