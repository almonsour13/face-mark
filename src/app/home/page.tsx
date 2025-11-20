"use client";

import AdminHomePage from "@/components/features/home/admin/admin-home-page";
import UserHomePage from "@/components/features/home/user/usr-home-page";
import RoleSwitchRender from "@/components/role-switch-render";

export default function Page() {
    return (
        <>
            <RoleSwitchRender
                render={{
                    admin: <AdminHomePage />,
                    user: <UserHomePage />,
                }}
                fallback={<p>No access</p>}
            />
        </>
    );
}
