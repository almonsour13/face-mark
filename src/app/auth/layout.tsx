"use client";

import AuthGuard from "@/components/auth-guard";
import { ReactNode, Suspense } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <AuthGuard>
            <Suspense>{children}</Suspense>
        </AuthGuard>
    );
}
