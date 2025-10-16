import { loadModels } from "@/lib/face-api";
import { NextResponse } from "next/server";
import { loadImage } from "canvas";
import * as faceapi from "face-api.js";
export async function POST(req: Request) {
    try {
        await loadModels();
        const formData = await req.formData();
        const file = formData.get("image") as File;
        // one person
        if (!file) {
            return NextResponse.json(
                { message: "No image provided" },
                { status: 400 }
            );
        }
        const buffer = Buffer.from(await file.arrayBuffer());
        const img = await loadImage(buffer);

        // const detection = await faceapi
        //     .detectSingleFace(img)
        //     .withFaceLandmarks()
        //     .withFaceDescriptor();
        // if (!detection)
        //     return NextResponse.json({ recognized: false, message: "No face" });
    } catch (error) {}
}
