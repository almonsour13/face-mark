import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const faces = await prisma.user.findMany({
            select: {
                id: true,
                name:true,
                faceImages: {
                    select: {
                        descriptor: true,
                    },
                },
                studentDetails:{
                    select: {
                        course: {
                            select: {
                                name: true,
                                code:true
                            },
                        },
                        level: {
                            select: {
                                name: true,
                            },
                        },
                    },
                }
            },
        });
        const updatedFaces =
            faces &&
            faces.map((face) => {
                return {
                    id: face.id,
                    name:face.name,
                    course: face.studentDetails?.course?.name,
                    code:face.studentDetails?.course.code,
                    level: face.studentDetails?.level?.name,
                    descriptor: face.faceImages?.descriptor,
                };
            });
        return NextResponse.json(
            { success: true, faces: updatedFaces },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching faces:", error);
        return NextResponse.json(
            { error: "Failed to fetch faces", details: error },
            { status: 500 }
        );
    }
}
