import { Attendance } from "@/hooks/query/event/use-event-attendace";
import { fetchApi } from ".";

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
        console.log("body: ", userId, eventId, sessionType, attendanceType)
        const response = await fetchApi("/api/attendance", {
            method: "POST",
            body: JSON.stringify({ userId, eventId, sessionType, attendanceType}),
        });
        return response;
    } catch (error) {
        console.error("[v0] Error recording attendance:", error);
        return { success: false, error: String(error) };
    }
};
