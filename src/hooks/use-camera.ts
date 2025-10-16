import { RefObject, useState } from "react";
import { toast } from "sonner";

interface CameraProps {
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    streamRef: RefObject<MediaStream | null>;
}
export const useCamera = ({ videoRef, canvasRef, streamRef }: CameraProps) => {
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
                        ? { deviceId: { exact: deviceId } }
                        : { facingMode: "user" }),
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
            toast.error("Failed to access camera. Please check permissions.");
            setIsCameraOn(false);
        } finally {
            setIsCameraLoading(false);
        }
        setIsCameraOn(true);
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
        startCamera,
        stopCamera,
        isCameraLoading,
        isCameraOn,
        setIsCameraOn,
    };
};
