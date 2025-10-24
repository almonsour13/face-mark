import { useEffect, useState } from "react";
import { User } from "../user/use-users";
import { useQuery } from "@tanstack/react-query";

export interface Attendance {
    userId: string;
    id: string;
    status: number;
    type: number;
    method: number;
    createdAt: Date;
    user: User;
}
interface Response{
    sucess: boolean;
    attendance: Attendance[];
}
interface useEventAttendanceProps {
    eventId: string;
    sessionType:string;
    level: string;
    attendanceType: string;
    search?: string;
    count?: number
}
export const useEventAttendance = ({eventId, sessionType, level, attendanceType, search, count = 20}: useEventAttendanceProps) => {
    return useQuery<Response, Error>({
        queryKey: ["eventAttendance", eventId, sessionType, level, attendanceType, search],
        queryFn: async () => {
            const params = new URLSearchParams({
                sessionType,
                level,
                attendanceType,
                count: count.toString(),
                ...(search && { search }),
            });
            const response = await fetch(`/api/event/${eventId}/attendance?${params.toString()}`);
            return await response.json();
        },
    });
};
