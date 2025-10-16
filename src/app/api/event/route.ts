import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const events = await prisma.event.findMany({include:{
            eventType: true
        }});
        return NextResponse.json({ success: true, events }, { status: 201 });
    } catch (error: any) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events", details: error.message },
            { status: 500 }
        );
    }
}
export async function POST(req: Request) {
    try {
        // Parse request body
        const body = await req.json();
        const {
            name,
            description,
            startTime,
            endTime,
            eventTypeId,
            createdById,
        } = body;

        // Basic validation
        if (!name || !startTime) {
            return NextResponse.json(
                {
                    error: "Missing required fields (name, startTime, createdById)",
                },
                { status: 400 }
            );
        }

        // Create event in Prisma
        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                startTime: new Date(startTime),
                endTime: endTime ? new Date(endTime) : null,
                eventTypeId,
                createdById,
            },
            include: {
                createdBy: {
                    select: { id: true, name: true, email: true },
                },
                eventType: {
                    select: { id: true, name: true },
                },
            },
        });

        return NextResponse.json(
            { success: true, event: newEvent },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event", details: error.message },
            { status: 500 }
        );
    }
}
