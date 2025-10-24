import { FaceImage, StudentDetails } from "@prisma/client";

interface UserType {
    id: string;
    name: string | null;
    faceImages: {
        imageUrl:  Uint8Array<ArrayBufferLike> | null
    } | null;
    studentDetails: StudentDetails | null;
}
interface Attendance {
    userId: string;
    id: string;
    status: number;
    type: number;
    createdAt: Date;
    user: UserType | null;
}
export const updatedUserAttendanceFaceImage = (attendance: Attendance) => {};
export const convertToBase64 = (
    imageUrl: Uint8Array<ArrayBufferLike> | null
) => {
    if (!imageUrl) return null;
    return `data:image/jpeg;base64,${Buffer.from(imageUrl).toString("base64")}`;
};
