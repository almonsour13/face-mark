import { loadModels } from "@/lib/face-api";
import { loadImage, Canvas, Image, ImageData } from "canvas";
import { NextResponse } from "next/server";
import * as faceapi from "face-api.js";
import path from "path";

// Configure face-api.js to use node-canvas
export async function POST(req: Request) {
    try {
        // Load face-api models
        await loadModels();

        // Get uploaded image
        const formData = await req.formData();
        const file = formData.get("image") as File;

        if (!file) {
            return NextResponse.json(
                { message: "No image provided" },
                { status: 400 }
            );
        }

        console.log("Processing image:", file.name);

        // Convert uploaded file to image
        const buffer = Buffer.from(await file.arrayBuffer());
        const uploadedImg = await loadImage(buffer);

        // Load reference image
        const referenceImagePath = path.join(
            process.cwd(),
            "public",
            "reference",
            "profile.JPG"
        );
        const referenceImg = await loadImage(referenceImagePath);

        console.log("Images loaded, detecting faces...");

        // Detect faces and get descriptors
        const uploadedDetection = await faceapi
            .detectSingleFace(uploadedImg as any)
            .withFaceLandmarks()
            .withFaceDescriptor();

        const referenceDetection = await faceapi
            .detectSingleFace(referenceImg as any)
            .withFaceLandmarks()
            .withFaceDescriptor();

        // Check if faces were detected
        if (!uploadedDetection) {
            console.log("No face detected in uploaded image");
            return NextResponse.json(
                { message: "No face detected in uploaded image", match: false },
                { status: 200 }
            );
        }

        if (!referenceDetection) {
            console.log("No face detected in reference image");
            return NextResponse.json(
                {
                    message: "No face detected in reference image",
                    match: false,
                },
                { status: 200 }
            );
        }

        // Compare face descriptors
        const distance = faceapi.euclideanDistance(
            uploadedDetection.descriptor,
            referenceDetection.descriptor
        );

        // Threshold for face matching (typically 0.6 or lower means a match)
        const threshold = 0.6;
        const isMatch = distance < threshold;

        console.log("Face comparison distance:", distance);
        console.log("Match result:", isMatch);

        return NextResponse.json({
            match: isMatch,
            confidence: Math.max(0, (1 - distance) * 100).toFixed(2),
            distance: distance.toFixed(4),
            threshold,
            message: isMatch
                ? "Face matched successfully"
                : "Face does not match reference",
        });
    } catch (error: any) {
        console.error("Error in face recognition:", error);
        return NextResponse.json(
            {
                message: "Internal Server Error",
                error: error.message,
                match: false,
            },
            { status: 500 }
        );
    }
}
