import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const eventTypes = await prisma.eventType.findMany();
        return NextResponse.json({ success: true,eventTypes }, { status: 200 });
    } catch (error) {
        console.error("Error fetching event types:", error);
        return NextResponse.json(
            { error: "Failed to fetch event types", details: error },
            { status: 500 }
        );
    }
}
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name } = body;

        // Validation
        if (!name || name.trim() === "") {
            return NextResponse.json(
                { error: "Event type name is required" },
                { status: 400 }
            );
        }

        // Check if the event type already exists
        const existing = await prisma.eventType.findUnique({
            where: { name },
        });

        if (existing) {
            return NextResponse.json(
                { message: "Event type already exists", eventType: existing },
                { status: 200 }
            );
        }

        // Create new EventType
        const eventType = await prisma.eventType.create({
            data: { name },
        });

        return NextResponse.json({ success: true, eventType }, { status: 201 });
    } catch (error) {
        console.error("Error creating EventType:", error);
        return NextResponse.json(
            { error: "Failed to create event type", details: error },
            { status: 500 }
        );
    }
}
