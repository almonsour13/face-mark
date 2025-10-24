"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

interface StudentDetails {
    course: string;
    level: string;
    studentId: string;
}
interface FaceImage {
    imageUrl: string;
    descriptor: number[];
}
export interface User {
    id: string;
    name: string;
    email: string;
    status: number;
    role: number;
    createdAt: Date;
    updatedAt: Date;
    faceImages: FaceImage;
    studentDetails: StudentDetails;
}
interface Response {
    success: boolean;
    users: User[];
}
export const useUsers = () => {
    return useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await fetch("/api/user");
            return await response.json();
        },
    });
};
