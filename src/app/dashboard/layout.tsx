"use client";

import AppLayout from "@/components/layout/app-layout";
import RBACGuard from "@/components/rbac-guard";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <RBACGuard allowedRoles={["admin"]}>
            <AppLayout>{children}</AppLayout>
        </RBACGuard>
    );
}
