import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// ✅ GET all courses
export async function GET() {
    try {
        const courses = await prisma.course.findMany();
        return NextResponse.json({ success: true, courses }, { status: 200 });
    } catch (error: any) {
        console.error("Error fetching courses:", error);
        return NextResponse.json(
            { success: false, error: "Failed to fetch courses" },
            { status: 500 }
        );
    }
}

// ✅ POST a new course
export async function POST(req: Request) {
    try {
        const { name, code } = await req.json();

        if (!name || name.trim() === "") {
            return NextResponse.json(
                { success: false, error: "Course name is required" },
                { status: 400 }
            );
        }

        // Check if course already exists (case-insensitive)
        const existingCourse = await prisma.course.findFirst({
            where: {
                name
            },
        });

        if (existingCourse) {
            return NextResponse.json(
                { success: false, error: "Course already exists" },
                { status: 409 }
            );
        }

        // Create new course (code is optional)
        const newCourse = await prisma.course.create({
            data: {
                name: name.trim(),
                code: code?.trim() || null,
            },
        });

        return NextResponse.json(
            {
                success: true,
                course: newCourse,
                message: "Course successfully added",
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error adding course:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
