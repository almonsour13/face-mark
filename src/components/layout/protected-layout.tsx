"use client";

import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { stat } from "fs";

interface ProtectedLayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();

    // ✅ Use useEffect for navigation to avoid side effects during render
    // useEffect(() => {
    //     if (status === "unauthenticated" || !session) {
    //         router.replace("/auth/signin");
    //     }
    // }, [status, session, router]);

    // ✅ Optionally show loading or nothing while checking
    if (status === "loading") {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Checking authentication...</p>
            </div>
        );
    }
    if(status === "unauthenticated" || !session){
        router.replace("/auth/signin");
    }

    // ✅ Don’t render children if not authenticated
    if (!session) return null;

    return <>{children}</>;
}
