"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import { roleValue } from "@/constant";
import { unauthorized } from "next/navigation";

interface RoleBasedRenderProps {
    allowedRoles: string[];
    children: ReactNode;
    showUnauthorized?: boolean;
}

export default function RoleBasedRender({
    allowedRoles,
    children,
    showUnauthorized = false,
}: RoleBasedRenderProps) {
    const { data: session, status } = useSession(); 
    if (status === "loading") return null;

    const role = session && session.user.role && roleValue[session.user.role];
    if (role && !allowedRoles.includes(role)) {
       return null;
    }

    return <>{children}</>
}
