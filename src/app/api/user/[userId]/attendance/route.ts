import { prisma } from "@/lib/prisma";
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

        const userAttendances = await prisma.attendance.findMany({
            where: {
                userId: userId,
            },
            include: {
                event: {
                    select: {
                        id: true,
                        name: true,
                        eventDate: true,
                    },
                },
                session: {
                    select: {
                        type: true,
                        startTime: true,
                        endTime: true,
                        createdAt: true,
                    },
                },
            },
        });

        return NextResponse.json({ success: true, userAttendances });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ success: false, error });
    }
}
