import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                faceImages: {
                    select: {
                        imageUrl: true,
                        descriptor: true,
                    },
                },
                studentDetails: {
                    select: {
                        course: true,
                        level: true,
                        studentId: true,
                    },
                },
            },
        });
        const updatedUsersData = users.map((user) => ({
            ...user,
            faceImages: {
                ...user.faceImages,
                imageUrl: user.faceImages?.imageUrl
                    ? `data:image/jpeg;base64,${Buffer.from(
                          user.faceImages.imageUrl
                      ).toString("base64")}`
                    : null,
            },
        }));

        return NextResponse.json({ users: updatedUsersData });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
