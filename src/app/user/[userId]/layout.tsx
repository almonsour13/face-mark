"use client";
import { useUserAttendances } from "@/hooks/user/use-user-attendances";
import { useUserDetails } from "@/hooks/user/user-user-details";
import { useUserAttendanceStore } from "@/store/use-user-attendance-store";
import { useUserDetailsStore } from "@/store/use-user-details-store";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
    const userId = useParams().userId as string;

    const { data:userDetailsData, isPending:isUserDetailsLoading } = useUserDetails(userId);
    const { setUserDetails, setUserDetailsLoading } = useUserDetailsStore();

    const { data: attendanceData, isPending: isPendingAttendances } = useUserAttendances(userId);
    const { setUserAttendances, setUserAttendanceLoading } = useUserAttendanceStore();

    useEffect(() => {
        setUserAttendanceLoading(isPendingAttendances);
        if(attendanceData?.success){
            setUserAttendances(attendanceData.userAttendances);
        }
    }, [attendanceData, isPendingAttendances, setUserAttendances, setUserAttendanceLoading]);

    useEffect(() => {
        setUserDetailsLoading(isUserDetailsLoading);
        if (userDetailsData?.success) {
            setUserDetails(userDetailsData.userDetails);
        }
    }, [userDetailsData, isUserDetailsLoading, setUserDetails, setUserDetailsLoading]);
    return <>{children}</>;
}
