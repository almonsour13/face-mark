import { prisma } from "@/lib/prisma";
import {
    convertToBase64
} from "@/utils/convet-to-base64";
import { type NextRequest, NextResponse } from "next/server";

function parseTimeString(
    eventDate: string | Date,
    timeStr: string | null
): Date {
    if (!timeStr) return new Date();
    const baseDate = new Date(eventDate);
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);

    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;

    baseDate.setHours(hours, minutes, 0, 0);
    return baseDate;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, eventId, sessionType, attendanceType } = body;
        console.log("🔹 Received POST request to /api/attendance");
        console.log("body:", body);
        // attendanceType: 0 = auto, 1 = time in, 2 = time out

        if (!userId || !eventId || sessionType === undefined) {
            return NextResponse.json(
                { error: "userId, eventId, and sessionType are required" },
                { status: 400 }
            );
        }

        // Fetch event
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            select: { eventDate: true },
        });

        if (!event) {
            return NextResponse.json(
                { error: "Event not found" },
                { status: 404 }
            );
        }
        console.log("event:", event);

        // Fetch session
        const session = await prisma.session.findFirst({
            where: { eventId, type: parseInt(sessionType) },
            select: {
                id: true,
                startTime: true,
                endTime: true,
                requiresTimeOut: true,
                allowEarlyIn: true,
                allowEarlyOut: true,
                gracePeriod: true,
            },
        });

        if (!session) {
            return NextResponse.json(
                { error: "Session not found for this event" },
                { status: 404 }
            );
        }
        console.log("session:", session);

        const {
            id: sessionId,
            startTime,
            endTime,
            requiresTimeOut,
            allowEarlyIn,
            allowEarlyOut,
            gracePeriod,
        } = session;

        const now = parseTimeString(event.eventDate, startTime);
        const start = parseTimeString(event.eventDate, startTime);
        const end = parseTimeString(event.eventDate, endTime);

        console.log("🕓 Time Info:", {
            now: now.toLocaleString(),
            start: start.toLocaleString(),
            end: end.toLocaleString(),
            gracePeriod: session.gracePeriod,
            allowEarlyIn: session.allowEarlyIn,
            allowEarlyOut: session.allowEarlyOut,
        });

        // Check existing attendance
        const existingTimeIn = await prisma.attendance.findFirst({
            where: { userId, eventId, sessionId, type: 1 },
        });

        const existingTimeOut = await prisma.attendance.findFirst({
            where: { userId, eventId, sessionId, type: 2 },
        });

        // 🟡 Case 1: Already completed both
        if (existingTimeIn && existingTimeOut) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "You have already completed attendance for this session",
                    type: "already-complete",
                },
                { status: 200 }
            );
        }

        // 🧩 Decide action based on attendanceType
        let actionType = parseInt(attendanceType);

        if (actionType === 0) {
            // Auto mode
            if (!existingTimeIn) actionType = 1; // no time in → time in
            else if (requiresTimeOut && !existingTimeOut)
                actionType = 2; // has time in → time out
            else
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Attendance already completed for this session",
                        type: "already-complete",
                    },
                    { status: 200 }
                );
        }
        console.log("Action type:", actionType);

        // 🟢 TIME IN
        if (actionType === 1) {
            if (existingTimeIn) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "You already time in for this session",
                        type: "already-time-in",
                    },
                    { status: 200 }
                );
            }

            const minInTime = new Date(
                start.getTime() - (allowEarlyIn ?? 0) * 60000
            );
            const maxInTime = new Date(
                start.getTime() + (gracePeriod ?? 0) * 60000
            );

            if (now < minInTime) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Too early to time in for this session. Session starts at ${startTime}`,
                        type: "too-early-in",
                    },
                    { status: 200 }
                );
            }

            if (now > end) {
                return NextResponse.json(
                    {
                        success: false,
                        message:
                            "Too late to time in. Session has already ended",
                        type: "too-late-in",
                    },
                    { status: 200 }
                );
            }

            const isLate = now > maxInTime;
            console.log(
                "maxInTime:",
                maxInTime.getTime(),
                "now:",
                now.getTime(),
                "isLate:",
                isLate
            );
            const newTimeIn = await prisma.attendance.create({
                data: {
                    userId,
                    eventId,
                    sessionId,
                    type: 1,
                    status: isLate ? 2 : 1, // 1 = On time, 2 = Late
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            studentDetails: {
                                select: {
                                    studentId: true,
                                    course: {
                                        select: {
                                            name: true,
                                            code: true,
                                        },
                                    },
                                    level:{
                                        select:{
                                            name:true
                                        }
                                    }
                                },
                            },
                            faceImages: {
                                select: {
                                    imageUrl: true,
                                },
                            },
                        },
                    },
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    message: isLate
                        ? "Time in successfully (Late)"
                        : "Time in successfully",
                    type: "time-in",
                    attendance: {
                        ...newTimeIn,
                        user: {
                            ...newTimeIn.user,
                            faceImages: {
                                ...newTimeIn.user.faceImages,
                                imageUrl: newTimeIn.user.faceImages
                                    ? convertToBase64(
                                          newTimeIn.user.faceImages.imageUrl
                                      )
                                    : null,
                            },
                        },
                    },
                },
                { status: 200 }
            );
        }

        // 🔵 TIME OUT
        if (actionType === 2) {
            if (!requiresTimeOut) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "This session does not require time out",
                        type: "no-timeout-required",
                    },
                    { status: 200 }
                );
            }

            if (!existingTimeIn) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "Cannot time out without time in first",
                        type: "no-time-in-found",
                    },
                    { status: 200 }
                );
            }

            if (existingTimeOut) {
                return NextResponse.json(
                    {
                        success: false,
                        message: "You already time out for this session",
                        type: "already-time-out",
                    },
                    { status: 200 }
                );
            }

            const minOutTime = new Date(
                end.getTime() - (allowEarlyOut ?? 0) * 60000
            );

            if (now < minOutTime) {
                return NextResponse.json(
                    {
                        success: false,
                        message: `Too early to time out for this session. Session end time: ${endTime}`,
                        type: "too-early-out",
                    },
                    { status: 200 }
                );
            }

            const newTimeOut = await prisma.attendance.create({
                data: {
                    userId,
                    eventId,
                    sessionId,
                    type: 2,
                    status: 1,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            studentDetails: {
                                select: {
                                    studentId: true,
                                    course: {
                                        select: {
                                            name: true,
                                            code: true,
                                        },
                                    },
                                    level:{
                                        select:{
                                            name:true
                                        }
                                    }
                                },
                            },
                            faceImages: {
                                select: {
                                    imageUrl: true,
                                },
                            },
                        },
                    },
                },
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Time out successfully",
                    type: "time-out",
                    attendance: {
                        ...newTimeOut,
                        user: {
                            ...newTimeOut.user,
                            faceImages: {
                                ...newTimeOut.user.faceImages,
                                imageUrl: newTimeOut.user.faceImages
                                    ? convertToBase64(
                                          newTimeOut.user.faceImages.imageUrl
                                      )
                                    : null,
                            },
                        },
                    },
                },
                { status: 200 }
            );
        }

        // 🟠 Fallback (shouldn’t reach here)
        return NextResponse.json(
            {
                success: false,
                message: "Invalid attendance type or logic condition",
                type: "invalid-type",
            },
            { status: 400 }
        );
    } catch (error) {
        console.error("[v0] Error creating attendance:", error);
        return NextResponse.json(
            { error: "Failed to create attendance" },
            { status: 500 }
        );
    }
}
