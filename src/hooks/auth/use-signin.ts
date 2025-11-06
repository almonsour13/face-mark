import { SignInFormData, signInSchema } from "@/zod/schema";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type ProcessStatus =
    | "idle"
    | "validating"
    | "authenticating"
    | "redirecting"
    | "error"
    | "success";

export const useSignin = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [processStatus, setProcessStatus] = useState<ProcessStatus>("idle");

    const [formData, setFormData] = useState<SignInFormData>({
        email: "admin@gmail.com",
        password: "admin123",
    });
    
    const [errors, setErrors] = useState<
        Partial<Record<keyof SignInFormData, string>>
    >({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (errors[name as keyof SignInFormData]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
        // Reset status when user starts typing
        if (processStatus === "error") {
            setProcessStatus("idle");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);

        // Validation phase
        setProcessStatus("validating");

        const result = signInSchema.safeParse(formData);
        if (!result.success) {
            const fieldErrors: Partial<Record<keyof SignInFormData, string>> =
                {};
            result.error.issues.forEach((issue) => {
                const fieldName = issue.path[0] as keyof SignInFormData;
                fieldErrors[fieldName] = issue.message;
            });
            setErrors(fieldErrors);
            setProcessStatus("error");
            setIsLoading(false);
            return;
            
        }

        try {
            setProcessStatus("authenticating");

            const response = (await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
                // callbackUrl:"/home"
            })) as {
                ok: boolean;
                error?: string;
            };
            console.log(response);

            if (!response.ok && response.error) {
                const parsedError = JSON.parse(response.error);
                setErrors(parsedError);
                setProcessStatus("error");
                return;
            }

            // Success phase
            setProcessStatus("success");
            toast.success("Signed in successfully!");

            // // Redirect phase
            // setTimeout(() => {
            //     setProcessStatus("redirecting");
            //     router.push("/home");
            // }, 500);
        } catch (error) {
            console.error("Sign in error:", error);
            setErrors({
                email: "An unexpected error occurred. Please try again.",
            });
            setProcessStatus("error");
        } finally {
            // // Only set loading to false if we're in error state
            // // Otherwise keep it true during redirect
            // if (processStatus === "error") {
                setIsLoading(false);
            // }
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
    };
};
