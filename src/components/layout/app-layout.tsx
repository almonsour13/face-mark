"use client";

import { AppSidebarProvider } from "@/context/app-sidebar-context";
import AppSidebar from "./app-side-bar";
import ProtectedLayout from "./protected-layout";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <ProtectedLayout>
            <AppSidebarProvider>
                <div className="flex h-full w-full">
                    <AppSidebar />
                    <div className="flex-1">{children}</div>
                </div>
            </AppSidebarProvider>
        </ProtectedLayout>
    );
}
