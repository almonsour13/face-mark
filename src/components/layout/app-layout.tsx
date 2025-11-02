"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./app-side-bar";
import ProtectedLayout from "./protected-layout";
import { useSession } from "next-auth/react";
import { roleValue } from "@/constant";
import AdminAppSidebar from "./admin-app-side-bar";
import { useEffect, useState } from "react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [hasLoaded, setHasLoaded] = useState(false);

    useEffect(() => {
        if (status !== "loading") {
            setHasLoaded(true);
        }
    }, [status]);

    const role = session?.user?.role ? roleValue[session.user.role] : null;

    const SidebarLoading = () => {
        return (
            <aside className="w-64 border-r min-h-screen p-4 flex flex-col justify-between">
                <p className="text-gray-500">Loading...</p>
            </aside>
        );
    };

    return (
        <SidebarProvider>
            <div className="flex h-full w-full">
                <AppSidebar />
                <div className="flex-1">{children}</div>
            </div>
        </SidebarProvider>
    );
}
