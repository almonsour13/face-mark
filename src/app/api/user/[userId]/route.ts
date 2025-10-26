import { prisma } from "@/lib/prisma";
import { convertToBase64 } from "@/utils/convet-to-base64";
import { NextResponse } from "next/server";
export async function GET(
    req: Request,
    { params }: { params: Promise<{ userId: string }> }
) {
    try {
        const { userId } = await params;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                studentDetails: true,
                faceImages: {
                    select: {
                        imageUrl: true,
                    },
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                userDetails: {
                    ...user,
                    faceImages: {
                        ...user.faceImages,
                        imageUrl: user.faceImages?.imageUrl
                            ? convertToBase64(user.faceImages.imageUrl)
                            : null,
                    },
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { error: "Failed to fetch user" },
            { status: 500 }
        );
    }
}
