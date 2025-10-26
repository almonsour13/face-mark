import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

// ============================================
// 📘 GET: Fetch All Events with Filters
// ============================================
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        // Get query parameters
        const type = searchParams.get("type") || "all";
        const status = searchParams.get("status") || "0";
        const sortBy = searchParams.get("sortBy") || "date-desc";
        const count = parseInt(searchParams.get("count") || "20");
        const search = searchParams.get("search") || "";

        // Build where clause
        const where: Prisma.EventWhereInput = {};

        // Filter by type
        // if (type !== "all") where.eventTypeId = parseInt(type);

        // Filter by status
        if (status !== "0") where.status = parseInt(status);

        if (search.trim()) {
            where.OR = [
                {
                    name: { contains: search },
                },
                {
                    description: { contains: search },
                },
                {
                    location: { contains: search },
                },
                {
                    eventType: {
                        is: {
                            name: {
                                contains: search,
                            },
                        },
                    },
                },
            ];
        }

        let orderBy: Record<string, "asc" | "desc"> = {};
        switch (sortBy) {
            case "date-asc":
                orderBy = { eventDate: "asc" };
                break;
            case "date-desc":
                orderBy = { eventDate: "desc" };
                break;
            case "name-asc":
                orderBy = { name: "asc" };
                break;
            case "name-desc":
                orderBy = { name: "desc" };
                break;
            default:
                orderBy = { eventDate: "desc" };
        }

        const events = await prisma.event.findMany({
            where,
            include: {
                eventType: true,
                eventSessions: true,
            },
            orderBy,
            take: count,
        });

        return NextResponse.json(
            {
                success: true,
                message: events.length
                    ? "Events fetched successfully."
                    : "No events found.",
                count: events.length,
                filters: {
                    type,
                    status,
                    sortBy,
                },
                timestamp: new Date().toISOString(),
                events,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("❌ Error fetching events:", error);

        return NextResponse.json(
            {
                success: false,
                message: "An unexpected error occurred while fetching events.",
                details: error,
            },
            { status: 500 }
        );
    }
}

// ============================================
// 📘 POST: Create a New Event
// ============================================
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {
            name,
            description,
            location,
            eventTypeId,
            eventDate,
            status,
            eventSessions,
        } = body;
        console.log(body);
        if (!name || name.trim() === "") {
            return NextResponse.json(
                {
                    success: false,
                    message: "Event name is required.",
                    timestamp: new Date().toISOString(),
                },
                { status: 400 }
            );
        }
        if (
            !eventSessions ||
            !Array.isArray(eventSessions) ||
            eventSessions.length === 0
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "At least one event session is required.",
                    timestamp: new Date().toISOString(),
                },
                { status: 400 }
            );
        }
        const newEvent = await prisma.event.create({
            data: {
                name,
                description,
                eventTypeId: eventTypeId || null,
                location,
                eventDate,
                status: parseInt(status) ?? 1,
                eventSessions: {
                    create: eventSessions.map((session) => ({
                        type: parseInt(session.type),
                        startTime: session.startTime,
                        endTime: session.endTime,
                        requiresTimeOut: parseInt(session.requiresTimeOut),
                        allowEarlyIn: parseInt(session.allowEarlyTimeIn),
                        allowEarlyOut: parseInt(session.allowEarlyTimeOut),
                        gracePeriod: parseInt(session.gracePeriod) || 40,
                    })),
                },
            },
            include: {
                eventType: true,
                eventSessions: {
                    orderBy: { startTime: "asc" },
                },
            },
        });
        console.log("New event created:", newEvent);
        return NextResponse.json(
            {
                success: true,
                message: "Event created successfully.",
                timestamp: new Date().toISOString(),
                newEvent: newEvent,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("❌ Error creating event:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to create event due to an internal error.",
                details: error,
                timestamp: new Date().toISOString(),
            },
            { status: 500 }
        );
    }
}
