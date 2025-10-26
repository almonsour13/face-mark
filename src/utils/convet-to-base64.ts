import { StudentDetails } from "@prisma/client";

interface UserType {
    id: string;
    name: string | null;
    faceImages: {
        imageUrl:  Uint8Array<ArrayBufferLike> | null
    } | null;
    studentDetails: StudentDetails | null;
}

export const convertToBase64 = (
    imageUrl: Uint8Array<ArrayBufferLike> | null
) => {
    if (!imageUrl) return null;
    return `data:image/jpeg;base64,${Buffer.from(imageUrl).toString("base64")}`;
};
