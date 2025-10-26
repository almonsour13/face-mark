import { Attendance } from "@/hooks/event/use-event-attendace";

interface CreateAttendace {
    eventId: string;
    userId: string;
    sessionType:string;
    attendanceType:string
}
interface CreateAttendaceResponse {
    success: boolean;
    error?: string;
    message?: string;
    type?: string;
    attendance?: Attendance
}
export const createAttendance = async ({
    userId,
    eventId,
    sessionType,
    attendanceType
}: CreateAttendace): Promise<CreateAttendaceResponse> => {
    try {
        const response = await fetch("/api/attendance", {
            method: "POST",
            body: JSON.stringify({ userId, eventId, sessionType, attendanceType}),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("[v0] Error recording attendance:", error);
        return { success: false, error: String(error) };
    }
};
