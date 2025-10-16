import { prisma } from "@/lib/prisma";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { userId, eventId } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId and userName are required" },
                { status: 400 }
            );
        }
        const existingAttendance = await prisma.attendance.findFirst({
            where: {
                userId: userId,
                eventId: eventId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        studentDetails: true,
                    },
                },
            },
        });
        if (existingAttendance) {
            console.log(
                "[v0] User already has attendance:",
                existingAttendance
            );
            return NextResponse.json(
                {
                    success: false,
                    alreadyAttended: true,
                    attendance: existingAttendance,
                    message: `${existingAttendance.user.name} has already been marked as ${existingAttendance.status}`,
                },
                { status: 200 } // Changed from 409 to 200 so client can process the response properly
            );
        }
        const newAttendance = await prisma.attendance.create({
            data: {
                userId: userId,
                eventId: eventId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        studentDetails: true,
                        faceImages: {
                            select: {
                                imageUrl: true,
                            },
                        },
                    },
                },
            },
        });
        console.log("[v0] Attendance created:", newAttendance);
        const updatedNewAttendace = {
            ...newAttendance,
            user: {
                ...newAttendance.user,
                faceImages: {
                    imageUrl: newAttendance.user.faceImages?.imageUrl
                        ? `data:image/jpeg;base64,${Buffer.from(
                              newAttendance.user.faceImages.imageUrl
                          ).toString("base64")}`
                        : null,
                },
            },
        };
        return NextResponse.json({
            success: true,
            attendance: updatedNewAttendace,
            message: `Attendance recorded for ${newAttendance.user.name}`,
        });
    } catch (error) {
        console.error("[v0] Error creating attendance:", error);
        return NextResponse.json(
            { error: "Failed to create attendance" },
            { status: 500 }
        );
    }
}
