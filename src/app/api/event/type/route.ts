import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    } catch (error: any) {
        console.error("Error creating EventType:", error);
        return NextResponse.json(
            { error: "Failed to create event type", details: error.message },
            { status: 500 }
        );
    }
}
