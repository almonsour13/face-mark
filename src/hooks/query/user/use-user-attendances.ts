import { fetchApi } from "@/lib/api";
import { UserAttendances } from "@/store/use-user-attendance-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    userAttendances: UserAttendances[];
    hasMore?: boolean;
    nextCursor?: string | null;
}
interface UserUserAttendancesProps {
    userId: string;
    filters: Record<string, string>;
    nextCursor?: string | null;
}
export const useUserAttendances = ({userId, filters, nextCursor,}: UserUserAttendancesProps) => {
    return useQuery<Response, Error>({
        queryKey: ["users-attendance", userId, nextCursor],
        queryFn: async () => {
            
            const params = new URLSearchParams({
                ...filters,
                ...(nextCursor && { nextCursor }), // Only add if search has value
            });
            const response = await fetchApi(`/api/user/${userId}/attendance?${params.toString()}`);
            return response;
        },
    });
};