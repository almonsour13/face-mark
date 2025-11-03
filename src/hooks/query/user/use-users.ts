"use client";

import { fetchApi } from "@/lib/api";
import { UserWithDetails } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    users: UserWithDetails[];
}
interface UseUserProps {
    course?: string;
    level?: string;
    search?: string;
    count?: number;
}
export const useUsers = ({course, level, search, count }: UseUserProps) => {
    return useQuery<Response, Error>({
        queryKey: ["users", course, level, search, count],
        queryFn: async () => {
             const params = new URLSearchParams({
                ...count && { count: count.toString() },
                ...(course && { course }),
                ...(level && { level }),
                ...(search && { search }), // Only add if search has value
            });
            const response = await fetchApi(`/api/user?${params.toString()}`);
            return response;
        },
    });
};
