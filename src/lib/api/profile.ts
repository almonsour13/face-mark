import { getSession } from "next-auth/react";
import { fetchApi } from ".";

export const checkProfileInfo = async () => {
    const session = await getSession();

    if (!session?.accessToken) {
        throw new Error("No access token found");
    }

    const response = await fetchApi("/api/profile/check-profile-info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
    });

    return response;
};
export const updateStudentInfo = async (data: {
    name: string;
    studentId: string;
    courseId: string;
    levelId: string;
    image: string;
    descriptor: number[];
}) => {
    const session = await getSession();

    if (!session?.accessToken) {
        throw new Error("No access token found");
    }

    const response = await fetchApi("/api/profile/update-student-info", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${session.accessToken}`,
        },
        body: JSON.stringify(data),
    });

    return response;
};
