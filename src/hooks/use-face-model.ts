"use client";
import { useEffect, useState } from "react";
import * as faceapi from "face-api.js";
import { ensureTensorFlowReady } from "@/lib/tensorflow-init";
import * as tf from "@tensorflow/tfjs";
import { toast } from "sonner";

export const useFaceModel = () => {
    const [isFaceModelLoading, setIsFaceModelLoading] = useState(true);
    const [isFaceModelLoaded, setIsFaceModelLoaded] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const loadModels = async () => {
            try {
                if (!isMounted) return;
                await tf.ready();

                try {
                    await tf.setBackend("webgl");
                } catch {
                    console.warn("WebGL not available, using CPU backend");
                    await tf.setBackend("cpu");
                }

                setIsFaceModelLoading(true);
                setError(null);

                // Step 1: Ensure TensorFlow.js is ready
                console.log("🔄 Ensuring TensorFlow.js is ready...");
                await ensureTensorFlowReady();

                // Small delay to ensure backend is fully stabilized
                await new Promise((resolve) => setTimeout(resolve, 200));

                if (!isMounted) return;

                // Step 2: Load face-api.js models sequentially
                console.log("🔄 Loading face detection models...");
                await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
                console.log("✅ Tiny Face Detector loaded");

                await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
                console.log("✅ SSD MobileNet loaded");

                await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
                console.log("✅ Face Landmarks loaded");

                await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
                console.log("✅ Face Recognition loaded");

                if (!isMounted) return;
                
                console.log("✅ All models loaded successfully!");
                toast.success("All models loaded successfully!");
                setIsFaceModelLoaded(true);
            } catch (err) {
                if (!isMounted) return;

                const errorMessage =
                    err instanceof Error
                        ? err.message
                        : "Failed to load models";
                console.error("❌ Error loading models:", err);
                toast.error(errorMessage);
                setError(errorMessage);
                setIsFaceModelLoaded(false);
            } finally {
                if (isMounted) {
                    setIsFaceModelLoading(false);
                }
            }
        };

        loadModels();

        // Cleanup
        return () => {
            isMounted = false;
        };
    }, []);

    return {
        isFaceModelLoading,
        isFaceModelLoaded,
        error,
    };
};
