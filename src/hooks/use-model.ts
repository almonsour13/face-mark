"use client";

import * as blazeface from "@tensorflow-models/blazeface";
import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";
import { toast } from "sonner";

// Model hook integrated directly
export const useModel = () => {
    const [isModelLoading, setIsModelLoading] = useState(true);
    const [model, setModel] = useState<blazeface.BlazeFaceModel | null>(null);

    useEffect(() => {
        const loadModel = async () => {
            try {
                setIsModelLoading(true);
                await tf.ready();

                try {
                    await tf.setBackend("webgl");
                } catch {
                    console.warn("WebGL not available, using CPU backend");
                    await tf.setBackend("cpu");
                }

                console.log("TensorFlow.js backend:", tf.getBackend());
                const loadedModel = await blazeface.load();
                setModel(loadedModel);
                toast.success("Face detection model loaded!");
            } catch (error) {
                console.error("Model loading error:", error);
                toast.error("Failed to load face detection model");
            } finally {
                setIsModelLoading(false);
            }
        };
        loadModel();
    }, []);

    return { model, isModelLoading };
};
