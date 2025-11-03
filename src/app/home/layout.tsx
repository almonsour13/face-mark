"use client";

import StudentInformationDialog from "@/components/dialog/student-information-dialog";
import AppLayout from "@/components/layout/app-layout";
import { roleValue } from "@/constant";
import { User } from "@/hooks/query/user/use-users";
import { checkProfileInfo } from "@/lib/api/profile";
import { useSession } from "next-auth/react";
import React, { Suspense, useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [profileInfo, setProfileInfo] = useState<User | null>(null);
    const { data: session, status } = useSession();
    const role = session?.user?.role ? roleValue[session.user.role] : null;

    useEffect(() => {
        const checkStudentInfo = async () => {
            try {
                const response = await checkProfileInfo();
                if (
                    !response.success &&
                    !response.isComplete &&
                    response.missing?.studentDetails
                ) {
                    setProfileInfo(response.profile);
                }
            } catch (error) {}
        };
        if ( role && role !== "admin") {
            checkStudentInfo();
        }
    }, [role]);

    return (
        <AppLayout>
            <Suspense>
                <StudentInformationDialog profileInfo={profileInfo} />
                {children}
            </Suspense>
        </AppLayout>
    );
}
