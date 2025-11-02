import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react"; // ✅ Import signIn
import {
    resendVerificationCode,
    verify,
    verifyEmailToken,
} from "@/lib/api/auth";
import { toast } from "sonner";

type ProcessStatus =
    | "idle"
    | "validating"
    | "verifying"
    | "signing_in"
    | "redirecting"
    | "error"
    | "success";
export const useVerify = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isVerifyingToken, setIsVerifyingToken] = useState(true);
    const [processStatus, setProcessStatus] = useState<ProcessStatus>("idle");

    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(
                () => setResendCooldown(resendCooldown - 1),
                1000
            );
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    useEffect(() => {
        if (!token) {
            router.push("/");
            return;
        }

        const verifyToken = async () => {
            try {
                const response = await verifyEmailToken(token);
                setIsVerifyingToken(true);

                if (response.valid) {
                    setEmail(response.decoded.email);
                    setIsTokenValid(true);

                    if (response.decoded.createdAt) {
                        const tokenCreated = new Date(
                            response.decoded.createdAt
                        );
                        const now = new Date();
                        const diffInSeconds = Math.floor(
                            (now.getTime() - tokenCreated.getTime()) / 1000
                        );
                        const remainingCooldown = Math.max(
                            30 - diffInSeconds,
                            0
                        );
                        setResendCooldown(remainingCooldown);
                    }
                } else {
                    router.push("/");
                }
            } catch (error) {
                console.error("Token verification error:", error);
                router.push("/");
            } finally {
                setIsVerifyingToken(false);
            }
        };

        verifyToken();
    }, [token, router]);

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage("");
        setError("");

        if (!code || code.length !== 6) {
            setError("Please enter a valid 6-digit code");
            setProcessStatus("error");
            return;
        }

        setIsVerifying(true);
        setProcessStatus("validating");

        try {
            setProcessStatus("verifying");
            const response = await verify({ email, code });

            if (response.success) {
                setProcessStatus("success");
                setMessage("Email verified successfully! Signing you in...");
                const password = sessionStorage.getItem("temp_password");

                if (password) {
                    setProcessStatus("signing_in");
                    const signInResult = await signIn("credentials", {
                        email,
                        password,
                        redirect: false,
                    });

                    sessionStorage.removeItem("temp_password");

                    if (signInResult?.ok) {
                        setMessage("Signed in successfully! Redirecting...");
                        setMessage("Signed in successfully!");
                        setTimeout(() => {
                            router.push("/home");
                        }, 1000);
                    } else {
                        setProcessStatus("error");
                        setError(
                            "Verification successful, but sign-in failed. Please login manually."
                        );
                        toast.success("Account created successfully!");
                        setTimeout(() => {
                            router.push("/signin");
                        }, 2000);
                    }
                } else {
                    // ✅ If no password available, redirect to login
                    setProcessStatus("redirecting");
                    setMessage("Email verified successfully! Please login.");
                    setTimeout(() => {
                        router.push(
                            `/signin?email=${encodeURIComponent(email)}`
                        );
                    }, 1500);
                }
            } else {
                setProcessStatus("error");
                setError(response.error);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setProcessStatus("error");
            setError("An error occurred during verification");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!email) {
            setError("Email not found");
            return;
        }

        setResendLoading(true);
        setMessage("");
        setError("");

        try {
            const response = await resendVerificationCode(email);

            if (response.success) {
                setResendCooldown(30);
                setMessage(response.message);
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error("Resend error:", error);
            setError("Failed to resend code");
        } finally {
            setResendLoading(false);
        }
    };

    return {
        email,
        setEmail,
        code,
        setCode,
        message,
        error,
        isVerifying,
        handleVerify,
        handleResend,
        resendLoading,
        resendCooldown,
        token,
        isTokenValid,
        isVerifyingToken,
        processStatus,
    };
};
