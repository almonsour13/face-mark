import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./app-side-bar";
export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <div className="flex h-full w-full items-center justify-center">
                <AppSidebar />
                {children}
            </div>
        </SidebarProvider>
    );
}
