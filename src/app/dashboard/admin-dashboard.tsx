"use client";

import AttendanceOverview from "@/components/features/dashboard/admin/attendance-overview";
import CourseLevelStats from "@/components/features/dashboard/admin/course-level-stats";
import DashboardHeader from "@/components/features/dashboard/admin/dashboard-header";
import QuickStatsAction from "@/components/features/dashboard/admin/quick-stats-action";
import RecentUsers from "@/components/features/dashboard/admin/recent-user";
import StatsCard from "@/components/features/dashboard/admin/stats-card";
import PageWrapper from "@/components/page-wrapper";

export default function AdminDashboard() {
    return (
        <div className="">
            <DashboardHeader />
            <PageWrapper className="gap-8">
                <StatsCard />
                <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                    <AttendanceOverview />
                    <QuickStatsAction />
                </div>
                <div className="flex flex-col-reverse md:flex-row gap-8 md:gap-4">
                    <RecentUsers />
                    <CourseLevelStats />
                </div>
            </PageWrapper>
        </div>
    );
}
