import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt"; // Make sure to install: npm install bcrypt @types/bcrypt

export async function POST(req: Request) {
    try {
        console.log("🔹 Received POST request to /api/register");

        // Parse request body
        const {
            name,
            email,
            password,
            course,
            year,
            studentId,
            faceImage,
            faceDescriptor,
        } = await req.json(); 

        console.log("📝 Parsed request body:", {
            name,
            email,
            course,
            year,
            studentId,
            hasFaceImage: !!faceImage,
            hasFaceDescriptor: !!faceDescriptor,
        });

        // Validate required fields
        if (!name || !email || !password) {
            console.log("⚠️ Missing required fields");
            return NextResponse.json(
                { message: "Name, email, and password are required" },
                { status: 400 }
            );
        }

        if (!studentId || !course || !year) {
            console.log("⚠️ Missing student details");
            return NextResponse.json(
                { message: "Student ID, course, and year are required" },
                { status: 400 }
            );
        }

        if (!faceImage || !faceDescriptor) {
            console.log("⚠️ Missing face data");
            return NextResponse.json(
                { message: "Face image and descriptor are required" },
                { status: 400 }
            );
        }

        // Check if email already exists
        console.log("🔍 Checking if email already exists...");
        const emailExist = await prisma.user.findFirst({
            where: { email },
        });

        if (emailExist) {
            console.log("❌ Email already exists:", email);
            return NextResponse.json(
                { message: "Email already exists" },
                { status: 400 }
            );
        }

        // Check if student ID already exists
        console.log("🔍 Checking if student ID already exists...");
        const studentIdExist = await prisma.studentDetails.findFirst({
            where: { studentId },
        });

        if (studentIdExist) {
            console.log("❌ Student ID already exists:", studentId);
            return NextResponse.json(
                { message: "Student ID already exists" },
                { status: 400 }
            );
        }

        // Hash the password
        console.log("🔐 Hashing password...");
        const hashedPassword = await bcrypt.hash(password, 10);

        // Convert base64 string to Buffer
        const imageBuffer = Buffer.from(faceImage, "base64");

        // Convert faceDescriptor array to JSON string or store as needed
        const descriptorString = JSON.stringify(faceDescriptor);

        // Create new user with transaction to ensure all data is saved together
        console.log("✅ Creating new user in database...");
        const result = await prisma.$transaction(async (tx) => {
            // Create user
            const user = await tx.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                },
            });

            // Create student details
            await tx.studentDetails.create({
                data: {
                    userId: user.id,
                    course,
                    level: year,
                    studentId,
                },
            });

            // Create face image record
            await tx.faceImage.create({
                data: {
                    userId: user.id,
                    imageUrl: imageBuffer,
                    descriptor: descriptorString,
                },
            });

            return user;
        });

        console.log("🎉 User successfully created:", result.id);

        // Send response (exclude password)
        const { password: _, ...userWithoutPassword } = result;

        return NextResponse.json(
            {
                message: "User registered successfully",
                user: userWithoutPassword,
            },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("🔥 Error during registration:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error.message || "Unknown error occurred",
            },
            { status: 500 }
        );
    }
}
