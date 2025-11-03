"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchApi } from "@/lib/api";
import { UserWithDetails } from "@/store/use-user-store";

interface Response {
    success: boolean;
    userDetails: UserWithDetails;
}
export const useUserDetails = (userId:string) => {
    return useQuery<Response, Error>({
        queryKey: ["usersDetails"],
        queryFn: async () => {
            const response = await fetchApi(`/api/user/${userId}`);
            return response;
        },
    });
};
