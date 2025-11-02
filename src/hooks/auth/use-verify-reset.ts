import { verifyEmailToken, verifyResetCode } from "@/lib/api/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useVerifyReset = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const [email, setEmail] = useState("");
    const [code, setCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [isTokenValid, setIsTokenValid] = useState(false);
    const [isVerifyingToken, setIsVerifyingToken] = useState(true);

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
            router.push("/forgot-password");
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
                    router.push("/forgot-password");
                }
            } catch (error) {
                console.error("Token verification error:", error);
                router.push("/forgot-password");
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
            return;
        }

        setIsVerifying(true);

        try {
            const response = await verifyResetCode({ email, code });

            if (response.success) {
                setMessage(response.message);
                setTimeout(() => {
                    router.push(response.redirect);
                }, 1000);
            } else {
                setError(response.error);
            }
        } catch (error) {
            console.error("Verification error:", error);
            setError("An error occurred during verification");
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {};

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
    };
};
