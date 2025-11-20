"use client";

import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import UserAttendanceDisplay from "@/components/features/user/user-attendance-list";
import StatisticsCard from "@/components/statistics-card";
import { levelsValue } from "@/constant";
import { useUserDetailsStore } from "@/store/use-user-details-store";
import { CheckCircle2, Mail, MoreHorizontal, Shield } from "lucide-react";
import PageWrapper from "@/components/page-wrapper";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import BackButton from "@/components/back-button";

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
        ` (${userDetails?.studentDetails?.course.code})`;
    const level =
        userDetails?.studentDetails &&
        levelsValue[userDetails.studentDetails?.level.name];

    return (
        <div className="w-full min-h-screen">
            <Header>
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BackButton />
                        <HeaderTitle>
                            {userDetails?.name || "User Details"}
                        </HeaderTitle>
                    </div>
                    <Button
                        variant="outline"
                        size="icon"
                        className="flex-shrink-0 bg-transparent"
                    >
                        <MoreHorizontal className="w-5 h-5" />
                    </Button>
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
                        <div className="flex flex-col gap-8">
                            <div className="flex items-start justify-between w-full">
                                <div className="flex gap-6 items-start md:items-center flex-1">
                                    <div className="relative">
                                        <Avatar className="w-32 h-32 rounded-lg border-2 border-border/30">
                                            <AvatarImage
                                                src={
                                                    userDetails.face
                                                        ?.imageUrl ||
                                                    "/placeholder.svg"
                                                }
                                                className="object-cover"
                                                alt={userDetails.name}
                                            />
                                            <AvatarFallback className="text-2xl font-light rounded-lg">
                                                {getInitials(userDetails.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        {userDetails.face && (
                                            <div className="absolute -bottom-2 -right-2 h-10 w-10 rounded-full bg-green-500 flex items-center justify-center border-4 border-background">
                                                <Shield className="h-5 w-5 text-white" />
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <h1 className="text-4xl lg:text-4xl font-light">
                                            {userDetails.name}
                                        </h1>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                                            <p className="text-foreground">
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
                                                className="texta-xs font-medium"
                                            >
                                                {
                                                    statusValue[
                                                        userDetails.status
                                                    ]
                                                }
                                            </Badge>
                                            <Badge
                                                variant="outline"
                                                className="texta-xs font-medium"
                                            >
                                                {roleValue[userDetails.role]}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
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

                            <div className="flex flex-col-reverse lg:flex-row gap-8">
                                <div className="flex-1">
                                    <UserAttendanceDisplay />
                                </div>
                                {/* <div className="w-full lg:w-80">
                                    <StatisticsCard statistics={statistics} />
                                </div> */}
                            </div>
                        </div>
                    )
                )}
            </PageWrapper>
        </div>
    );
}
