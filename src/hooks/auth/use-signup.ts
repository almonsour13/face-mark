"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SignUpFormData, signUpSchema } from "@/zod/schema";
import { signUpUser } from "@/lib/api/auth";

interface Response {
    success: boolean;
    error?: {
        email?: string;
        password?: string;
        name?: string;
    };
    message?: string;
    type?: string;
    redirect?: string;
}

type ProcessStatus =
    | "idle"
    | "validating"
    | "creating"
    | "processing"
    | "redirecting"
    | "error"
    | "success";

export const useSignUp = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [processStatus, setProcessStatus] = useState<ProcessStatus>("idle");
    const [statusMessage, setStatusMessage] = useState("");

    const [formData, setFormData] = useState<SignUpFormData>({
        name: "Al-Monsour Salida",
        email: "almonsoursalida@gmail.com",
        password: "monsour13",
    });

    const [errors, setErrors] = useState<
        Partial<Record<keyof SignUpFormData, string>>
    >({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (errors[name as keyof SignUpFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
        // Reset status when user starts typing
        if (processStatus === "error") {
            setProcessStatus("idle");
            setStatusMessage("");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Validation phase
        setProcessStatus("validating");
        setStatusMessage("Validating your information...");

        const result = signUpSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof SignUpFormData, string>> =
                {};
            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof SignUpFormData;
                fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors);
            setProcessStatus("error");
            setStatusMessage("Please fix the validation errors");
            setIsLoading(false);
            return;
        }

        try {
            // Account creation phase
            setProcessStatus("creating");
            setStatusMessage("Creating your account...");

            const response = await signUpUser(formData);

            if (!response.success && response.error) {
                setErrors(response.error);
                console.log(response.error);
                setProcessStatus("error");
                setStatusMessage(
                    response.message ||
                        "Failed to create account. Please try again."
                );
                setIsLoading(false);
                return;
            }

            // Processing phase
            setProcessStatus("processing");
            setStatusMessage("Account created successfully!");

            // Store temporary password for auto-login
            sessionStorage.setItem("temp_password", formData.password);

            // Success phase
            setProcessStatus("success");
            setStatusMessage("Welcome! Setting up your account...");

            // Redirect phase
            setTimeout(() => {
                setProcessStatus("redirecting");
                setStatusMessage("Redirecting...");
                if (response.redirect) {
                    router.push(response.redirect);
                } else {
                    router.push("/signin");
                }
            }, 800);
        } catch (error) {
            console.error("Sign up error:", error);
            setErrors({
                email: "An unexpected error occurred. Please try again.",
            });
            setProcessStatus("error");
            setStatusMessage("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return {
        showPassword,
        setShowPassword,
        formData,
        handleChange,
        handleSubmit,
        errors,
        setFormData,
        isLoading,
        processStatus,
        statusMessage,
    };
};
