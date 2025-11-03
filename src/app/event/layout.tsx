"use client";

import AppLayout from "@/components/layout/app-layout";
import RBACGuard from "@/components/rbac-guard";
import React, { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <RBACGuard allowedRoles={["admin", "user"]}>
                <Suspense>{children}</Suspense>
            </RBACGuard>
        </AppLayout>
    );
}
