"use client";

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
    studentDetails?: StudentDetails;
}
export const useUsers = () => {
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    useEffect(() => {
        const fetchUsers = async () => {
            setIsUsersLoading(true);
            try {
                const response = await fetch("/api/faces");
                const data = await response.json();
                console.log("data:", data);
                const parsedUsers = data.users.map((u: any) => ({
                    ...u,
                    faceImages: {
                        ...u.faceImages,
                        descriptor: Array.isArray(u.faceImages.descriptor)
                            ? u.faceImages.descriptor
                            : JSON.parse(u.faceImages.descriptor), // convert string → array if needed
                    },
                }));

                setUsers(parsedUsers);
            } catch (error) {
                console.error("Error fetching users:", error);
            } finally {
                setIsUsersLoading(false);
            }
        };
        fetchUsers();
    }, []);

    return { users, isUsersLoading };
};
