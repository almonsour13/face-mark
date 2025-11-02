"use client";

import { useSession } from "next-auth/react";
import { ReactNode } from "react";
import AccessDenied from "../access-deniend";

interface ProtectedLayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { data: session, status } = useSession();

    // Don't show loading - middleware handles auth
    if (status === "unauthenticated") {
        return <AccessDenied />;
    }

    return <>{children}</>;
}
