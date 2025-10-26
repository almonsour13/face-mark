import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

interface Params {
    params: { eventId: string };
}

export async function GET(req: NextRequest, { params }: Params) {
    try {
        const { eventId } = await params;

        if (!eventId) {
            return NextResponse.json(
                { error: "eventId is required" },
                { status: 400 }
            );
        }
        const event = await prisma.event.findUnique({
            where: { id: eventId },
            include: { eventType: true, eventSessions: true },
        });

        if (!event) {
        }
        return NextResponse.json({
            success: true,
            event,
        });
    } catch (error) {
        console.error("Error fetching attendance:", error);
        return NextResponse.json(
            { error: "Failed to fetch attendance", details: error },
            { status: 500 }
        );
    }
}
