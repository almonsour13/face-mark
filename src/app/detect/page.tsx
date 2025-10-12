"use client";

import { Button } from "@/components/ui/button";
import { Camera, CameraOff } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function Page() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const startCamera = async () => {
        try {
            setIsLoading(true);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: "user",
                },
                audio: false,
            });

            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                await videoRef.current.play();
            }
        } catch (error) {
            console.error("Camera error:", error);
            toast.error("Failed to access camera. Please check permissions.");
            setIsCameraOn(false);
        } finally {
            setIsLoading(false);
        }
    };

    const stopCamera = () => {
        // Stop all tracks in the stream
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((track) => {
                track.stop();
            });
            streamRef.current = null;
        }

        // Clear video source
        if (videoRef.current) {
            videoRef.current.srcObject = null;
            videoRef.current.pause();
        }

        // Clear canvas
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx) {
                ctx.clearRect(
                    0,
                    0,
                    canvasRef.current.width,
                    canvasRef.current.height
                );
            }
        }
    };
    const toggleCamera = async () => {
        if (isCameraOn) {
            stopCamera();
        } else {
            await startCamera();
        }
    };

    return (
        <div className="w-full flex flex-col min-h-screen">
            <div className="h-14 w-full px-4 flex items-center justify-between border-b">
                <div className="w-full mx-auto flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Detect</h1>
                </div>
            </div>
            <div className="flex-1 w-full mx-auto flex gap-4 p-4">
                <div className="border flex-1 bg-muted rounded w-full relative overflow-hidden">
                    {!isCameraOn && !isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <Camera className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-muted-foreground">
                                    Camera is off
                                </p>
                            </div>
                        </div>
                    )}
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                                <p className="text-muted-foreground">
                                    Starting camera...
                                </p>
                            </div>
                        </div>
                    )}
                    <video
                        ref={videoRef}
                        className={`h-full w-full object-cover ${
                            !isCameraOn ? "hidden" : ""
                        }`}
                        playsInline
                        muted
                        autoPlay
                    />
                    <canvas
                        ref={canvasRef}
                        className={`absolute top-0 left-0 w-full h-full ${
                            !isCameraOn ? "hidden" : ""
                        }`}
                    />
                    {/* Hidden canvas for face capture */}
                    <div className="absolute bottom-0 left-0 p-8 flex gap-2">
                        <Button
                            variant={isCameraOn ? "destructive" : "default"}
                            className="rounded-full w-14 h-14"
                        >
                            {isLoading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                            ) : isCameraOn ? (
                                <CameraOff />
                            ) : (
                                <Camera />
                            )}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
