"use client";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import PageWrapper from "@/components/page-wrapper";
import { useSession } from "next-auth/react";

export default function AdminHomeHeader() {
    useSession();

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
                        System <span className="text-foreground">Overview</span>
                    </h1>
                    <p className="text-lg text-muted-foreground font-light max-w-2xl">
                        Monitor and manage your Face Mark attendance system.
                        Track users, events, and system performance in
                        real-time.
                    </p>
                </div>
            </PageWrapper>
        </>
    );
}
