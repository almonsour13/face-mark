import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const course = searchParams.get("course");
        const level = searchParams.get("level");
        const search = searchParams.get("search") || "";
        const count = parseInt(searchParams.get("count") || "20");
        console.log("course:", course);
        console.log("level:", level);
        console.log("search:", search);

        // Build where clause
        const where: any = {};

        // Add studentDetails filters
        if (course && course !== "all") {
            where.studentDetails = {
                course: {
                    name: course,
                },
            };
        } 
        if (level && level !== "all") {
            where.studentDetails = {
                level: {
                    name: level,
                },
            };
        }

        // Add search filters
        if (search.trim()) {
            where.OR = [
                { name: { contains: search, mode: "insensitive" } },
                { email: { contains: search, mode: "insensitive" } },
                {
                    studentDetails: {
                        studentId: { contains: search, mode: "insensitive" },
                    },
                },
            ];
        }
        console.log("where:", where);
        const users = await prisma.user.findMany({
            where,
            take: count,
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                status: true,
                createdAt: true,
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
            faceImages: user.faceImages
                ? {
                      descriptor: user.faceImages.descriptor,
                      imageUrl: user.faceImages.imageUrl
                          ? `data:image/jpeg;base64,${Buffer.from(
                                user.faceImages.imageUrl
                            ).toString("base64")}`
                          : null,
                  }
                : null,
        }));

        return NextResponse.json({ success: true, users: updatedUsersData });
    } catch (error) {
        console.error("Error fetching users:", error);
        return NextResponse.json(
            { error: "Failed to fetch users" },
            { status: 500 }
        );
    }
}
