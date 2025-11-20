import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import PageWrapper from "@/components/page-wrapper";
import { useSession } from "next-auth/react";

export default function UserHomeHeader() {
    const { data: session } = useSession();
    return (
        <>
            <Header className="border-b-0" title="Home">
                <div className="">
                    <SidebarTriggerButton />
                </div>
            </Header>
            <PageWrapper>
                <div className="space-y-3">
                    <h1 className="text-4xl lg:text-5xl font-light">
                        Welcome back,{" "}
                        <span className="text-foreground">
                            {session?.user?.name || "User"}
                        </span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-light max-w-2xl">
                        Your facial recognition-powered attendance system. Track
                        events, monitor attendance, and never miss a session.
                    </p>
                </div>
            </PageWrapper>
        </>
    );
}
