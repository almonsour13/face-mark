// lib/tensorflow-init.ts
// Import this file BEFORE any face-api.js imports

import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import "@tensorflow/tfjs-backend-cpu";

let isInitialized = false;
let initPromise: Promise<void> | null = null;

export async function ensureTensorFlowReady(): Promise<void> {
    // If already initialized, return immediately
    if (isInitialized) {
        return;
    }

    // If initialization is in progress, wait for it
    if (initPromise) {
        return initPromise;
    }

    // Start initialization
    initPromise = (async () => {
        try {
            console.log("🔄 Initializing TensorFlow.js...");

            // Try WebGL backend first
            try {
                await tf.setBackend("webgl");
                await tf.ready();
                console.log("✅ TensorFlow.js WebGL backend ready");
            } catch (webglError) {
                console.warn("⚠️ WebGL backend failed, trying CPU backend");

                // Fallback to CPU
                await tf.setBackend("cpu");
                await tf.ready();
                console.log("✅ TensorFlow.js CPU backend ready");
            }

            const backend = tf.getBackend();
            console.log(`📊 Active TensorFlow backend: ${backend}`);

            // Verify backend is working
            const testTensor = tf.tensor([1, 2, 3]);
            const result = testTensor.square();
            result.dispose();
            testTensor.dispose();
            console.log("✅ TensorFlow backend verified working");

            isInitialized = true;
        } catch (error) {
            console.error("❌ Failed to initialize TensorFlow.js:", error);
            initPromise = null; // Reset so we can retry
            throw error;
        }
    })();

    return initPromise;
}

export function isTensorFlowReady(): boolean {
    return isInitialized;
}

// Auto-initialize on import (optional)
// ensureTensorFlowReady().catch(console.error);
