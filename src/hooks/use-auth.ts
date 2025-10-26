import { useMutation } from "@tanstack/react-query";
import * as faceapi from "face-api.js";
import { User } from "./user/use-users";

interface SignInData {
    email: string;
    password: string;
}

interface SignUpData {
    name: string;
    email: string;
    password: string;
    studentId: string;
    courseId: string;
    levelId: string;
    faceImage: File | null;
}

interface AuthResponse {
    message: string;
    user?: User;
}

// Helper function to convert File to base64
const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result as string;
            // Remove the data:image/...;base64, prefix
            const base64Data = base64String.split(",")[1];
            resolve(base64Data);
        };
        reader.onerror = (error) => reject(error);
    });
};

export const useSignUpUser = () => {
    return useMutation<AuthResponse, Error, SignUpData>({
        mutationFn: async (data) => {
            const file = data.faceImage;
            if (!file) throw new Error("No face image provided");

            try {
                // Convert file to base64
                const base64Image = await fileToBase64(file);

                // Load image for face detection
                const uploadedImg = await faceapi.bufferToImage(file);

                // Detect face and get descriptor
                const uploadedDesc = await faceapi
                    .detectSingleFace(uploadedImg)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                console.log("Uploaded face descriptor:", uploadedDesc);
                if (!uploadedDesc) {
                    throw new Error(
                        "No face detected in the image. Please upload a clear photo of your face."
                    );
                }

                // Send data to backend
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        studentId: data.studentId,
                        courseId: data.courseId,
                        levelId: data.levelId,
                        faceImage: base64Image, // Send base64 string
                        faceDescriptor: Array.from(uploadedDesc.descriptor), // Convert Float32Array to regular array
                    }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || "Failed to sign up");
                }

                return response.json();
            } catch (error) {
                console.error("Error during sign up:", error);
                throw error;
            }
        },
        onError: (error) => {
            console.error("Sign up error:", error);
        },
    });
};

export const useSignInUser = () => {
    return useMutation<AuthResponse, Error, SignInData>({
        mutationFn: async (data) => {
            const response = await fetch("/api/auth/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to sign in");
            }

            return response.json();
        },
        onError: (error) => {
            console.error("Sign in error:", error);
        },
    });
};
