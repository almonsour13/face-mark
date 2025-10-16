import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { eventId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
    try {
        const { eventId } = params;

        if (!eventId) {
            return NextResponse.json(
                { error: "eventId is required" },
                { status: 400 }
            );
        }
        const attendance = await prisma.attendance.findMany({
            where: {
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
        const updatedAttendanceData = attendance.map((att) => ({
            ...att,
            user: {
                ...att.user,
                faceImages: {
                    imageUrl: att.user.faceImages?.imageUrl
                        ? `data:image/jpeg;base64,${Buffer.from(
                              att.user.faceImages.imageUrl
                          ).toString("base64")}`
                        : null,
                },
            },
        }));
        return NextResponse.json({
            success: true,
            attendance:updatedAttendanceData,
        });
    } catch (error: any) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json(
            { error: "Failed to fetch attendance", details: error.message },
            { status: 500 }
        );
    }
}
