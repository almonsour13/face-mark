"use client";

import { Button } from "@/components/ui/button";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
    Mail,
    AlertCircle,
    CheckCircle2,
    Loader2,
    KeyRound,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { forgotPassword } from "@/lib/api/auth";

type ProcessStatus = "idle" | "sending" | "success" | "redirecting" | "error";

export default function Page() {
    const router = useRouter();
    const [email, setEmail] = useState("almonsoursalida@gmail.com");
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [processStatus, setProcessStatus] = useState<ProcessStatus>("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!email) {
            setError("Please enter your email address");
            setProcessStatus("error");
            return;
        }

        setIsLoading(true);
        setProcessStatus("sending");

        try {
            const response = await forgotPassword(email);

            if (response.success) {
                setProcessStatus("success");
                setMessage(response.message || "Reset code sent successfully!");

                // Redirect if provided
                if (response.redirect) {
                    setTimeout(() => {
                        setProcessStatus("redirecting");
                        router.push(response.redirect);
                    }, 2000);
                }
            } else {
                setProcessStatus("error");
                setError(response.error || "Failed to send reset code");
            }
        } catch (error) {
            console.error("Forgot password error:", error);
            setProcessStatus("error");
            setError("An error occurred. Please try again.");
        } finally {
            if (processStatus === "error") {
                setIsLoading(false);
            }
        }
    };

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        // Clear errors when user starts typing
        if (error || processStatus === "error") {
            setError("");
            setProcessStatus("idle");
        }
    };

    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <form
                    onSubmit={handleSubmit}
                    className="w-full md:max-w-md flex flex-col gap-6 rounded-lg bg-mauted p-8"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <KeyRound className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col gap-2 text-center">
                            <h1 className="text-2xl font-bold">
                                Forgot Password
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email address and we&apos;ll send you
                                a code to reset your password
                            </p>
                        </div>
                    </div>

                    {/* Email Input */}
                    <div className="flex flex-col gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <InputGroup>
                            <InputGroupInput
                                id="email"
                                type="email"
                                name="email"
                                placeholder="johndoe@gmail.com"
                                value={email}
                                onChange={handleEmailChange}
                                disabled={isLoading}
                                required
                            />
                            <InputGroupAddon>
                                <Mail />
                            </InputGroupAddon>
                        </InputGroup>
                        {error && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="text-sm text-green-600 flex items-center gap-1">
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col gap-3">
                        <Button type="submit" disabled={isLoading || !email}>
                            {isLoading ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {processStatus === "sending" &&
                                        "Sending Code..."}
                                    {processStatus === "redirecting" &&
                                        "Redirecting..."}
                                    {processStatus === "success" && "Success!"}
                                    {!processStatus && "Sending..."}
                                </span>
                            ) : (
                                "Send Reset Code"
                            )}
                        </Button>
                        <div className="text-center text-sm text-muted-foreground">
                            Remember your password?{" "}
                            <Link
                                href="/signin"
                                className="text-primary font-medium hover:underline"
                            >
                                Back to Sign In
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
            <div className="flex-1 flex p-8 max-lg:hidden">
                <div className="flex-1 w-full h-full bg-primary rounded-md p-8 border flex flex-col justify-center"></div>
            </div>
        </div>
    );
}
