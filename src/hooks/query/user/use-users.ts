"use client";

import { fetchApi } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

interface Course{
    id: string;
    name: string;
    code: string;
}
interface Level{
    id: string;
    name: string;
}
interface StudentDetails {
    course: Course;
    level: Level;
    studentId: string;
}
interface FaceImage {
    imageUrl: string;
}
export interface User {
    id: string;
    name: string;
    email: string;
    status: number;
    role: number;
    createdAt: Date;
    updatedAt: Date;
    face?: FaceImage;
    studentDetails?: StudentDetails;
}
interface Response {
    success: boolean;
    users: User[];
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
