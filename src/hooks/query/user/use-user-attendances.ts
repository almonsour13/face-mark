import { fetchApi } from "@/lib/api";
import { UserAttendances } from "@/store/use-user-attendance-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    userAttendances: UserAttendances[]
}
export const useUserAttendances = (userId: string) => {
    return useQuery<Response, Error>({
        queryKey: ["users-attendance", userId],
        queryFn: async () => {
            const response = await fetchApi(`/api/user/${userId}/attendance`);
            console.log("response:", response)
            return response;
        },
    });
};