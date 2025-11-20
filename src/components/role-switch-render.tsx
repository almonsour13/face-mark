"use client";

import { roleValue } from "@/constant";
import { useSession } from "next-auth/react";
import React, { ReactNode } from "react";

interface RoleSwitchRenderProps {
    render: Record<string, ReactNode>; // e.g., { admin: <AdminView />, user: <UserView /> }
    fallback?: ReactNode; // Optional fallback if role not found
}

export default function RoleSwitchRender({
    render,
    fallback = null,
}: RoleSwitchRenderProps) {
    const { data: session, status } = useSession();

    if (status === "loading") return null;

    // Safely extract the role
    const userRole = session?.user?.role;
    const resolvedRole =
        roleValue[userRole as keyof typeof roleValue] ?? userRole;

    // Determine which component to render
    const ComponentToRender = render[resolvedRole];

    // If no match, show fallback
    if (!ComponentToRender) return <>{fallback}</>;

    return <>{ComponentToRender}</>;
}
