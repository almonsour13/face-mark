import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const levels = await prisma.level.findMany();
        return NextResponse.json({ success: true, levels }, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to fetch levels"+error },
            { status: 500 }
        );
    }
}
export async function POST(req: Request) {
    try {
        const { name } = await req.json();

        if (!name) {
            return NextResponse.json(
                { success: false, error: "Level is required" },
                { status: 200 }
            );
        }
        const isLevelExist = await prisma.level.findUnique({
            where: {
                name: name,
            },
        });
        if (isLevelExist) {
            return NextResponse.json(
                { success: false, error: "Level already exist" },
                { status: 200 }
            );
        }
        const newLevel = await prisma.level.create({
            data: {
                name: name,
            },
        });
        return NextResponse.json(
            { success: true, level: newLevel, message: "Level Sucessfully Added" },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, error: "Failed to add level"+error },
            { status: 500 }
        );
    }
}
