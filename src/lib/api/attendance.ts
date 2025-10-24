import { fetchApi } from ".";

interface CreateAttendace {
    eventId: string;
    userId: string;
    sessionType:string;
    attendanceType:string
}
export const createAttendance = async ({
    userId,
    eventId,
    sessionType,
    attendanceType
}: CreateAttendace) => {
    try {
        const response = await fetch("/api/attendance", {
            method: "POST",
            body: JSON.stringify({ userId, eventId, sessionType, attendanceType}),
        });
        const data = await response.json();
        console.log("message:", data.message)
        console.log("error:", data.message)
        return data;
        // if (data.success) {
        //     console.log(
        //         "[v0] Attendance recorded successfully:",
        //         data.attendance
        //     );
        //     return {
        //         success: true,
        //         attendance: data.attendance,
        //         message: data.message,
        //     };
        // } else if (data.alreadyAttended) {
        //     console.log("[v0] User already attended:", data.message);
        //     return {
        //         success: false,
        //         alreadyAttended: true,
        //         attendance: data.attendance,
        //         message: data.message,
        //     };
        // } else {
        //     console.error("[v0] Failed to record attendance:", data.error);
        //     return { success: false, error: data.error };
        // }
    } catch (error) {
        console.error("[v0] Error recording attendance:", error);
        return { success: false, error: String(error) };
    }
};
