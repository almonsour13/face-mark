"use client";

import { useQuery } from "@tanstack/react-query";
import { User } from "./use-users";
import { fetchApi } from "@/lib/api";

interface Response {
    success: boolean;
    userDetails: User;
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
