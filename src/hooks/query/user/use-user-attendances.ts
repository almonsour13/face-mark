import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface Session{
    type: number
}
interface Event{
    id: string
    name: string
    eventDate: Date
}
export interface UserAttendances{
    id: string;
    status: number;
    method: number;
    type: number;
    startTime: string;
    endTime: string;
    createdAt: Date;
    session: Session;
    event: Event
}
interface Response {
    success: boolean;
    userAttendances: UserAttendances[]
}
export const useUserAttendances = (userId: string) => {
    return useQuery<Response, Error>({
        queryKey: ["users-attendance", userId],
        queryFn: async () => {
            const response = await fetchApi(`/api/user/${userId}/attendance`);
            return response;
        },
    });
};