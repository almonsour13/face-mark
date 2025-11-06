"use client";

import { fetchApi } from "@/lib/api";
import { UserWithDetails } from "@/store/use-user-store";
import { useQuery } from "@tanstack/react-query";

interface Response {
    success: boolean;
    users: UserWithDetails[];
    hasMore?: boolean;
    nextCursor?: string | null;
}
interface UseUserProps {
    filters: Record<string, string>;
    nextCursor?: string | null;
}
export const useUsers = ({filters, nextCursor}: UseUserProps) => {
    return useQuery<Response, Error>({
        queryKey: ["users", nextCursor, filters],
        queryFn: async () => {
             const params = new URLSearchParams({
                ...filters,
                ...(nextCursor && { nextCursor }),
            });
            const response = await fetchApi(`/api/user?${params.toString()}`);
            return response;
        },
    });
};
