"use client";

import StudentInformationDialog from "@/components/dialog/student-information-dialog";
import AppLayout from "@/components/layout/app-layout";
import { User } from "@/hooks/query/user/use-users";
import { checkProfileInfo } from "@/lib/api/profile";
import React, { Suspense, useEffect, useState } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const [profileInfo, setProfileInfo] = useState<User | null>(null);

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
        checkStudentInfo();
    }, []);

    return (
        <AppLayout>
            <Suspense>
                <StudentInformationDialog profileInfo={profileInfo} />
                {children}
            </Suspense>
        </AppLayout>
    );
}
