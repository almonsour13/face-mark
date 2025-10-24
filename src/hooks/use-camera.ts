import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useFaceCamera = () => {
    const [cameraError, setCameraError] = useState<string | null>(null);
    const [environment, setEnvironment] = useState<"user" | "environment">(
        "user"
    );
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const [isCameraLoading, setIsCameraLoading] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const startCamera = async (deviceId?: string) => {
        try {
            setIsCameraLoading(true);
            const constraints: MediaStreamConstraints = {
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    ...(deviceId
                        ? { deviceId: { exact: deviceId },
                            facingMode: environment }
                        : { facingMode: environment  }),
                },
                audio: false,
            };
            const stream = await navigator.mediaDevices.getUserMedia(
                constraints
            );
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
                await videoRef.current.play();
                setIsCameraOn(true);
            }
        } catch (error) {
            console.error("Camera error:", error);
            setCameraError(
                "Failed to access camera. Please check permissions."
            );
            toast.error("Failed to access camera. Please check permissions.");
            setIsCameraOn(false);
        } finally {
            setIsCameraLoading(false);
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
        setIsCameraOn(false);
    };
    
    return {
        videoRef,
        canvasRef,
        streamRef,
        startCamera,
        stopCamera,
        isCameraLoading,
        isCameraOn,
        setIsCameraOn,
        cameraError,
        environment,
        setEnvironment,
    };
};
