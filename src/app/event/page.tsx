"use client";

import AdminEventPage from "@/components/pages/admin-event-page";
import UserEventPage from "@/components/pages/user-event-page";
import { roleValue } from "@/constant";
import { useSession } from "next-auth/react";

export default function Page() {
    const { data: session, status } = useSession();

    if (!session?.user?.role) return;

    const userRole = roleValue[parseInt(session.user.role)];
    console.log(userRole)
    switch (userRole) {
        case "admin":
            return <AdminEventPage />;
        case "student":
            return <UserEventPage />;
        default:
            return <UserEventPage />;
    }
}
