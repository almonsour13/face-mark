import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import PageWrapper from "@/components/page-wrapper";
import { Sparkles } from "lucide-react";
import { useSession } from "next-auth/react";

export default function DashboardHeader() {
    useSession();
    
    return (
        <>
            <Header>
                <div className="">
                    <SidebarTriggerButton />
                </div>
            </Header>
            <PageWrapper>
                <div className="space-y-2">
                    <h1 className="text-4xl lg:text-5xl font-light text-foreground">
                        Dashboard
                    </h1>
                    <p className="text-lg text-muted-foreground font-light">
                        Face recognition-powered attendance overview and system
                        management
                    </p>
                </div>
            </PageWrapper>
        </>
    );
}
