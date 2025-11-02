"use client";

import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserAttendanceDisplay from "@/components/user/user-attendance-list";
import StatisticsCard from "@/components/statistics-card";
import { levelsValue } from "@/constant";
import { useUserDetailsStore } from "@/store/use-user-details-store";
import { Mail, MoreHorizontal } from "lucide-react";
import PageWrapper from "@/components/page-wrapper";

const roleValue: Record<number, string> = {
    1: "Student",
    2: "Instructor",
    3: "Admin",
};

const statusValue: Record<number, string> = {
    2: "Inactive",
    1: "Active",
    3: "Suspended",
};

export default function Page() {
    const { userDetails, isUserDetailsLoading } = useUserDetailsStore();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase();
    };

    const studentId = userDetails?.studentDetails?.studentId;
    const course =
        userDetails?.studentDetails?.course.name +
        ` (${userDetails?.studentDetails.course.code})`;
    const level =
        userDetails?.studentDetails &&
        levelsValue[userDetails.studentDetails?.level.name];

    const statistics = [
        { statName: "Total Attendance", value: 20 },
        { statName: "Total Event Attended", value: 20 },
        { statName: "On Time", value: 20 },
        { statName: "Late", value: 20 },
    ];

    return (
        <div className="w-full min-h-screen">
            <Header>
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger />
                        <HeaderTitle>
                            {userDetails?.name || "User Details"}
                        </HeaderTitle>
                    </div>
                </div>
            </Header>

            <PageWrapper>
                {isUserDetailsLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-muted-foreground">
                            Loading user details...
                        </p>
                    </div>
                ) : (
                    userDetails && (
                        <>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-start justify-between w-full">
                                    <div className="flex gap-6 items-start md:items-center flex-1">
                                        <Avatar className="w-24 md:w-32 h-24 md:h-32 rounded-md flex-shrink-0">
                                            <AvatarImage
                                                src={
                                                    userDetails.face
                                                        ?.imageUrl ||
                                                    "/placeholder.svg"
                                                }
                                                className="object-cover"
                                                alt={userDetails.name}
                                            />
                                            <AvatarFallback className="text-lg font-semibold">
                                                {getInitials(userDetails.name)}
                                            </AvatarFallback>
                                        </Avatar>

                                        <div className="flex-1 flex flex-col gap-2">
                                            <div className="flex flex-col gap-1">
                                                <h1 className="text-3xl md:text-4xl font-medium text-foreground">
                                                    {userDetails.name}
                                                </h1>
                                                <p className="text-sm text-muted-foreground flex items-center gap-2">
                                                    {userDetails.email}
                                                </p>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-2">
                                                <Badge
                                                    variant={
                                                        userDetails.status === 1
                                                            ? "default"
                                                            : "secondary"
                                                    }
                                                    className="text-xs font-medium"
                                                >
                                                    {
                                                        statusValue[
                                                            userDetails.status
                                                        ]
                                                    }
                                                </Badge>
                                                <Badge
                                                    variant="outline"
                                                    className="text-xs font-medium"
                                                >
                                                    {
                                                        roleValue[
                                                            userDetails.role
                                                        ]
                                                    }
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        className="flex-shrink-0 bg-transparent"
                                    >
                                        <MoreHorizontal className="w-5 h-5" />
                                    </Button>
                                </div>

                                {userDetails.studentDetails && (
                                    <div className="flex flex-col gap-1">
                                        {/* <span className="text-xs">
                                            Student Information
                                        </span> */}
                                        <span className="text-sm text-muted-foreground">
                                            {[studentId, course, level]
                                                .filter(Boolean)
                                                .join(" • ")}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col-reverse lg:flex-row gap-4">
                                <div className="flex-1">
                                    <UserAttendanceDisplay />
                                </div>
                                <div className="w-full lg:w-80">
                                    <StatisticsCard statistics={statistics} />
                                </div>
                            </div>
                        </>
                    )
                )}
            </PageWrapper>
        </div>
    );
}
