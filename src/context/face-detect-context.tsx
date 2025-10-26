"use client";

import { useFaceCamera } from "@/hooks/use-camera";
import { useFaceModel } from "@/hooks/use-face-model";
import * as faceapi from "face-api.js";
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState
} from "react";

interface FaceDetectionContextType {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
    faceCount: number;
    isFaceModelLoading: boolean;
    isFaceModelLoaded: boolean;
    startCamera: (deviceId?: string) => Promise<void>;
    stopCamera: () => void;
    isCameraLoading: boolean;
    isCameraOn: boolean;
    cameraError: string | null;
    environment:"user" | "environment";
    setEnvironment: React.Dispatch<React.SetStateAction<"user" | "environment">>
    detections:
        | faceapi.WithFaceDescriptor<
              faceapi.WithFaceLandmarks<
                  {
                      detection: faceapi.FaceDetection;
                  },
                  faceapi.FaceLandmarks68
              >
          >[]
        | null;
    resizedDetections:
        | faceapi.WithFaceDescriptor<
              faceapi.WithFaceLandmarks<
                  {
                      detection: faceapi.FaceDetection;
                  },
                  faceapi.FaceLandmarks68
              >
          >[]
        | null;
}
const FaceDetectionContext = createContext<
    FaceDetectionContextType | undefined
>(undefined);

export function FaceDetectionProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [faceCount, setFaceCount] = useState(0);
    const { isFaceModelLoading, isFaceModelLoaded } = useFaceModel();
    const {
        videoRef,
        canvasRef,
        startCamera,
        stopCamera,
        isCameraLoading,
        isCameraOn,
        cameraError,
        environment,
        setEnvironment
    } = useFaceCamera();

    const animationFrameRef = useRef<number | null>(null); // Reference to the animation frame
    const isDetectingRef = useRef(false); // Flag to track if detection is in progress

    
    useEffect(() => {
        if(isFaceModelLoading && !isFaceModelLoaded) return;
        (async () => {
            stopCamera(); // 🔴 Stop previous camera first
            await startCamera(); // 🟢 Then start new camera with updated environment
        })();
    }, [environment, isFaceModelLoading, isFaceModelLoaded, startCamera, stopCamera]);

    const [detections, setDetections] = useState<
        faceapi.WithFaceDescriptor<
            faceapi.WithFaceLandmarks<
                {
                    detection: faceapi.FaceDetection;
                },
                faceapi.FaceLandmarks68
            >
        >[]
    >([]);
    const [resizedDetections, setResizedDetections] = useState<
        | faceapi.WithFaceDescriptor<
              faceapi.WithFaceLandmarks<
                  {
                      detection: faceapi.FaceDetection;
                  },
                  faceapi.FaceLandmarks68
              >
          >[]
        | null
    >(null);

    

    const startDetection = useCallback(() => {
        if (
            !videoRef.current ||
            !canvasRef.current ||
            !isFaceModelLoaded ||
            !isCameraOn ||
            isDetectingRef.current
        ) {
            return;
        }
        isDetectingRef.current = true;
        const detectFaces = async () => {
            if (!videoRef.current || !canvasRef.current || !isCameraOn) {
                isDetectingRef.current = false;
                return;
            }

            try {
                const video = videoRef.current;
                const canvas = canvasRef.current;

                const detections = await faceapi
                    .detectAllFaces(
                        video,
                        new faceapi.TinyFaceDetectorOptions({
                            inputSize: 224,
                            scoreThreshold: 0.5,
                        })
                    )
                    .withFaceLandmarks()
                    .withFaceDescriptors();

                const displaySize = {
                    width: video.videoWidth,
                    height: video.videoHeight,
                };

                faceapi.matchDimensions(canvas, displaySize);
                const resizedDetections = faceapi.resizeResults(
                    detections,
                    displaySize
                );
                setDetections(detections);
                setResizedDetections(resizedDetections);
                setFaceCount(detections.length);
            } catch (error) {
                console.error("Error detecting faces:", error);
            }
            animationFrameRef.current = requestAnimationFrame(detectFaces);
        };
        detectFaces();
    },[videoRef, canvasRef, isFaceModelLoaded, isCameraOn]);
useEffect(() => {
        if ( isFaceModelLoaded && isCameraOn) {
            startDetection();
        }

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
                animationFrameRef.current = null;
            }
            isDetectingRef.current = false;
        };
    }, [isFaceModelLoaded, isCameraOn, startDetection]);
    return (
        <FaceDetectionContext.Provider
            value={{
                videoRef,
                canvasRef,
                faceCount,
                isFaceModelLoading,
                isFaceModelLoaded,
                startCamera,
                stopCamera,
                isCameraLoading,
                isCameraOn,
                environment,
                setEnvironment,
                cameraError,
                detections,
                resizedDetections,
            }}
        >
            {children}
        </FaceDetectionContext.Provider>
    );
}
export function useFaceDetectionContext() {
    const context = useContext(FaceDetectionContext);
    if (!context) {
        throw new Error(
            "useFaceDetection must be used within a FaceDetectionProvider"
        );
    }
    return context;
}
