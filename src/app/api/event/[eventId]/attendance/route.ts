import { prisma } from "@/lib/prisma";
import { convertToBase64 } from "@/utils/convet-to-base64";
import { NextRequest, NextResponse } from "next/server";
import { parse } from "path";

interface Params {
    params: { eventId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
    try {
        const { eventId } = await params;
        const { searchParams } = new URL(req.url);

        // Get query parameters
        const sessionType = searchParams.get("sessionType") || "0";
        const level = searchParams.get("level") || "all";
        const attendanceType = searchParams.get("attendanceType") || "0";
        const search = searchParams.get("search") || "";
        const count = parseInt(searchParams.get("count") || "20");

        if (!eventId) {
            return NextResponse.json(
                { error: "eventId is required" },
                { status: 400 }
            );
        }
        const where: any = { eventId: eventId };

        if (sessionType !== "0")
            where.session = { type: parseInt(sessionType) };
        if (level !== "all") where.level = level;
        if (attendanceType !== "0") where.type = parseInt(attendanceType);

        if (search.trim()) {
            where.OR = [
                {
                    user: {
                        name: { contains: search },
                    },
                },
                {
                    user: {
                        studentDetails: {
                            studentId: { contains: search },
                        },
                    },
                },
            ];
        }
        const attendance = await prisma.attendance.findMany({
            where,
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
                session: {
                    select: {
                        type: true,
                    },
                },
            },
            take: count,
        });
        const updatedAttendanceData = attendance.map((att) => ({
            ...att,
            user: {
                ...att.user,
                faceImages: {
                    imageUrl: att.user.faceImages
                        ? convertToBase64(att.user.faceImages.imageUrl)
                        : null,
                },
            },
        }));
        return NextResponse.json({
            success: true,
            attendance: updatedAttendanceData,
        });
    } catch (error: any) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json(
            { error: "Failed to fetch attendance", details: error.message },
            { status: 500 }
        );
    }
}
