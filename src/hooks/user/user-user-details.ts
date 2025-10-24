"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { User } from "./use-users";

interface Response {
    success: boolean;
    userDetails: User;
}
export const useUserDetails = (userId:string) => {
    return useQuery<Response, Error>({
        queryKey: ["usersDetails"],
        queryFn: async () => {
            const response = await fetch(`/api/user/${userId}`);
            return await response.json();
        },
    });
};
