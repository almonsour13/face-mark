"use client";
import AppLayout from "@/components/layout/app-layout";
import RBACGuard from "@/components/rbac-guard";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <RBACGuard allowedRoles={["admin"]}>
                <Suspense>{children}</Suspense>
            </RBACGuard>
        </AppLayout>
    );
}
