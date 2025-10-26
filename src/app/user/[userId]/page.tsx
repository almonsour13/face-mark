"use client";

import HeaderTitle from "@/components/nav-header-title";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { SidebarTrigger } from "@/components/ui/sidebar";
import UserAttendanceDisplay from "@/components/user-attendance-display";
import { levelsValue } from "@/constant";
import { useUserDetailsStore } from "@/store/use-user-details-store";
import { BookOpen, Layers, Mail } from "lucide-react";

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

    return (
        <div className="w-full min-h-screen bg-background">
            <div className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
                <div className="h-14 px-6 flex items-center justify-between">
                    <div className="w-full mx-auto flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <SidebarTrigger />
                            <HeaderTitle>
                                {userDetails?.name || "User Details"}
                            </HeaderTitle>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex-1 p-4 md:p-6 flex  flex-col gap-4">
                {isUserDetailsLoading ? (
                    <div className="flex items-center justify-center h-96">
                        <p className="text-muted-foreground">
                            Loading user details...
                        </p>
                    </div>
                ) : (
                    userDetails && (
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage
                                        src={
                                            userDetails.faceImages?.imageUrl ||
                                            "/placeholder.svg"
                                        }
                                        alt={userDetails.name}
                                    />
                                    <AvatarFallback className="text-lg font-semibold">
                                        {getInitials(userDetails.name)}
                                    </AvatarFallback>
                                </Avatar>

                                <div className="flex-1 flex flex-col gap-3">
                                    <div>
                                        <h1 className="text-3xl font-bold text-foreground">
                                            {userDetails.name}
                                        </h1>
                                        <p className="text-muted-foreground flex items-center gap-2 mt-1">
                                            <Mail className="w-4 h-4" />
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
                                            {statusValue[userDetails.status]}
                                        </Badge>
                                        <Badge
                                            variant="outline"
                                            className="text-xs font-medium"
                                        >
                                            {roleValue[userDetails.role]}
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {userDetails.studentDetails && (
                                <div className="py-4">
                                    <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
                                        Student Information
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="p-4 border rounded-md">
                                            <div className="flex items-start gap-3">
                                                <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                        Student ID
                                                    </p>
                                                    <p className="font-semibold text-foreground mt-1">
                                                        {
                                                            userDetails
                                                                .studentDetails
                                                                .studentId
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 border rounded-md">
                                            <div className="flex items-start gap-3">
                                                <BookOpen className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                        Course
                                                    </p>
                                                    <p className="font-semibold text-foreground mt-1">
                                                        {
                                                            userDetails
                                                                .studentDetails
                                                                .course.name
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-4 border rounded-md">
                                            <div className="flex items-start gap-3">
                                                <Layers className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                                                <div>
                                                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                                                        Level
                                                    </p>
                                                    <p className="font-semibold text-foreground mt-1">
                                                        {
                                                            levelsValue[
                                                                userDetails
                                                                    .studentDetails
                                                                    .level.name
                                                            ]
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )
                )}
                <UserAttendanceDisplay />
            </div>
        </div>
    );
}
