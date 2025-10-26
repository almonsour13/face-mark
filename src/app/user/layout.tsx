import AppLayout from "@/components/layout/app-layout";
import { Suspense } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AppLayout>
            <Suspense>{children}</Suspense>
        </AppLayout>
    );
}
