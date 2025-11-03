import { z } from "zod";

/**
 * 🧩 Event Session Schema
 * Represents each session under an event (Morning, Afternoon, Evening)
 */
export const eventSessionSchema = z.object({
    type: z.number().min(1).max(3), // 1=Morning, 2=Afternoon, 3=Evening
    startTime: z.string().nonempty("Start time is required"),
    endTime: z.string().nonempty("End time is required"),
    requiresTimeOut: z.number().int().min(0).max(1).default(1),
    allowEarlyTimeIn: z.number().int().min(0).max(1).default(0),
    allowEarlyTimeOut: z.number().int().min(0).max(1).default(0),
    gracePeriod: z.number().int().min(30).default(30),
});

/**
 * 🗓️ Main Event Schema
 * Matches your CreateEventDialog formData + eventSessions
 */
export const createEventSchema = z.object({
    name: z.string().min(3, "Event name must be at least 3 characters long"),
    description: z.string().nullable(),
    location: z.string().min(1, "Location is required"),
    eventType: z.string().nonempty("Event type is required"),
    eventDate: z.date({
        error: (issue) =>
            issue.input === undefined ? "Required" : "Invalid date",
    }),
    status: z.number().int().min(0).max(2).default(1), // e.g. 0 = cancelled, 1 = active
    // eventSessions: z
    //     .array(eventSessionSchema)
    //     .min(1, "At least one session is required"),
});

// ✅ Export types for TypeScript safety
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type EventSessionInput = z.infer<typeof eventSessionSchema>;
