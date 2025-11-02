"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { roleValue } from "@/constant";
import { unauthorized } from "next/navigation";

interface RoleBasedRenderProps {
    roleComponents: Record<string, ReactNode>; // { admin: <AdminPage />, user: <UserPage /> }
    fallback?: ReactNode; // Optional fallback for unknown roles
    loading?: ReactNode; // Optional custom loading UI
}

export default function RoleBasedRender({
    roleComponents,
    loading = (
        <div className="flex items-center justify-center min-h-screen text-gray-500">
            Loading...
        </div>
    ),
}: RoleBasedRenderProps) {
    const { data: session, status } = useSession(); 
    if (status === "loading") return loading;

    const role = session && session.user.role && roleValue[session.user.role];

    // ✅ Return component based on role
    if (role && roleComponents[role]) {
        return <>{roleComponents[role]}</>;
    }

    // 🚫 No matching role
    throw unauthorized();
}
