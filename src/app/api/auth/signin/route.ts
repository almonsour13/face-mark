import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log("🔹 Received POST request to /api/auth/signin");

        // Parse request body
        const { email, password } = await req.json();
        console.log("📝 Parsed request body:", { email, password });

        // Validate required fields
        if (!email || !password) {
            console.log("⚠️ Missing required fields");
            return NextResponse.json(
                { message: "All fields are required" },
                { status: 400 }
            );
        }

        // Check if user exists
        console.log("🔍 Checking if email exists...");
        const user = await prisma.user.findFirst({
            where: { email },
        });

        if (!user) {
            console.log("❌ No account found for this email:", email);
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Compare password
        console.log("🔐 Comparing passwords...");
        const isPasswordValid = password === user.password;

        if (!isPasswordValid) {
            console.log("❌ Incorrect password for:", email);
            return NextResponse.json(
                { message: "Invalid email or password" },
                { status: 401 }
            );
        }

        // Optionally: generate a JWT or session token here
        console.log("✅ Login successful for:", user.email);

        // Respond with success
        return NextResponse.json(
            {
                message: "Login successful",
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                },
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("🔥 Error during sign-in:", error);
        return NextResponse.json(
            { message: "Internal Server Error", error: error },
            { status: 500 }
        );
    }
}
