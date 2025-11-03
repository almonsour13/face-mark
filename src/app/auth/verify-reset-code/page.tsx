"use client";

import { Button } from "@/components/ui/button";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyResetCode, verifyEmailToken } from "@/lib/api/auth";
import { useVerifyReset } from "@/hooks/auth/use-verify-reset";

export default function Page() {
 const {
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
        isTokenValid,
        isVerifyingToken,
    } =   useVerifyReset();

    if (isVerifyingToken) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <p className="text-muted-foreground">Verifying reset link...</p>
            </div>
        );
    }

    if (!isTokenValid) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-500 mb-2">{error}</p>
                    <p className="text-sm text-muted-foreground">
                        Redirecting to forgot password page...
                    </p>
                </div>
            </div>
        );
    }
    return (
        <div className="min-h-screen w-full flex">
            <div className="flex-1 flex flex-col items-center justify-center">
                <form
                    onSubmit={handleVerify}
                    className="flex items-center flex-col gap-4 rounded-md bg-mauted p-8"
                >
                    <div className="flex items-center flex-col gap-2">
                        <h1 className="text-2xl font-bold">
                            Enter verification code
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            {email
                                ? `Enter the 6-digit code sent to ${email}`
                                : "Enter the 6-digit code sent to your email"}
                        </p>
                    </div>
                    <div className="flex items-center flex-col gap-2">
                        <InputOTP
                            maxLength={6}
                            value={code}
                            onChange={(value) => setCode(value)}
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
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                        {message && (
                            <p className="text-sm text-green-500">{message}</p>
                        )}
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <Button
                            type="submit"
                            disabled={code.length !== 6 || isVerifying}
                        >
                            {isVerifying ? "Verifying..." : "Verify"}
                        </Button>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Didn&apos;t receive the code?{" "}
                            <button
                                type="button"
                                className="text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={handleResend}
                                disabled={resendCooldown > 0 || resendLoading}
                            >
                                {resendCooldown > 0
                                    ? `Resend in ${resendCooldown}s`
                                    : resendLoading
                                    ? "Sending..."
                                    : "Resend Code"}
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
