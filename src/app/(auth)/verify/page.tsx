"use client";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useVerify } from "@/hooks/auth/use-verify";
import { AlertCircle, CheckCircle2, Loader2, Mail, Shield } from "lucide-react";

export default function Page() {
    const {
        email,
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
        processStatus,
    } = useVerify();

    if (!isTokenValid && token) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground">Verifying token...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 flex flex-col items-center justify-center p-4">
                <form
                    onSubmit={handleVerify}
                    className="w-full max-w-md flex flex-col gap-6 rounded-lg bg-mauted p-8"
                >
                    {/* Header */}
                    <div className="flex flex-col items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Shield className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center">
                            <h1 className="text-2xl font-bold">
                                Enter verification code
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                {email
                                    ? `Enter the 6-digit code sent to ${email}`
                                    : "Enter the 6-digit code sent to your email"}
                            </p>
                        </div>
                    </div>

                    {/* OTP Input */}
                    <div className="flex flex-col items-center gap-3">
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value) => {
                                setCode(value);
                                // Clear errors when user starts typing
                                if (error && processStatus === "error") {
                                    // Error will be cleared in the hook
                                }
                            }}
                            disabled={isVerifying}
                        >
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                            </InputOTPGroup>
                        </InputOTP>

                        {error && (
                            <p className="text-sm text-red-500 flex items-center gap-1">
                                <AlertCircle className="h-3 w-3" />
                                {error}
                            </p>
                        )}
                        {message && (
                            <p className="text-sm text-green-600 flex items-center gap-1">
                                <CheckCircle2 className="h-3 w-3" />
                                {message}
                            </p>
                        )}
                    </div>

                    {/* Verify Button */}
                    <div className="w-full flex flex-col gap-2">
                        <Button
                            type="submit"
                            disabled={code.length !== 6 || isVerifying}
                            className="w-full"
                        >
                            {isVerifying ? (
                                <span className="flex items-center gap-2">
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    {processStatus === "validating" &&
                                        "Validating..."}
                                    {processStatus === "verifying" &&
                                        "Verifying..."}
                                    {processStatus === "signing_in" &&
                                        "Signing in..."}
                                    {processStatus === "redirecting" &&
                                        "Redirecting..."}
                                    {processStatus === "success" && "Success!"}
                                    {!processStatus && "Verifying..."}
                                </span>
                            ) : (
                                "Verify Email"
                            )}
                        </Button>
                    </div>

                    {/* Resend Code */}
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                            Didn&apos;t receive the code?{" "}
                            <button
                                type="button"
                                className="text-primary font-medium hover:underline disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                                onClick={handleResend}
                                disabled={
                                    resendCooldown > 0 ||
                                    resendLoading ||
                                    isVerifying
                                }
                            >
                                {resendCooldown > 0 ? (
                                    `Resend in ${resendCooldown}s`
                                ) : resendLoading ? (
                                    <span className="inline-flex items-center gap-1">
                                        <Loader2 className="h-3 w-3 animate-spin" />
                                        Sending...
                                    </span>
                                ) : (
                                    "Resend Code"
                                )}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
            <div className="flex-1 flex p-8 max-lg:hidden">
                <div className="flex-1 w-full h-full bg-primary rounded-md p-8 border flex flex-col justify-center"></div>
            </div>
        </div>
    );
}
