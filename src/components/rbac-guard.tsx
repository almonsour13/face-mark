"use client";

import { roleValue } from "@/constant";
import { useSession } from "next-auth/react";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

interface RBACGuardProps {
    allowedRoles: string[];
    children: ReactNode;
}

export default function RBACGuard({ allowedRoles, children }: RBACGuardProps) {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <p className="text-gray-500">Loading...</p>
            </div>
        );
    }

    if (!session) {
        throw notFound();
    }

    if (session.user.role && !allowedRoles.includes(roleValue[session.user.role])) {
        throw notFound();
    }

    // ✅ access granted
    return <>{children}</>;
}
