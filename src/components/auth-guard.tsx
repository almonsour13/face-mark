"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface AuthGuardProps {
    children: ReactNode;
    redirectTo?: string; // where to send signed users (default: /dashboard)
}

export default function AuthGuard({
    children,
}: AuthGuardProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.back();
        }
    }, [status, router]);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (status === "authenticated") return null;

    // Not signed in → show auth page
    return <>{children}</>;
}