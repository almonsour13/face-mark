import { useEffect, useState } from "react";
import { User } from "./use-users";

export interface Attendance {
    userId: string;
    id: string;
    status: string;
    createdAt: Date;
    user: User;
}
export const useEventAttendance = (eventId: string) => {
    const [eventAttendance, setEventAttendance] = useState<Attendance[] | []>(
        []
    );
    const [isEvenAttendanceLoading, setIsEventAttendanceLoading] = useState(true);

    useEffect(() => {
        if (!eventId) return;
        const fetchEvent = async () => {
            setIsEventAttendanceLoading(true);
            try {
                const response = await fetch(`/api/attendance/${eventId}`);
                const data = await response.json();
                if (data.success) {
                    console.log("Event Attendance Data Fetch Successfully")
                    setEventAttendance(data.attendance);
                }
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsEventAttendanceLoading(false);
            }
        };
        fetchEvent();
    }, [eventId]);


    return { eventAttendance, setEventAttendance, isEvenAttendanceLoading };
};
