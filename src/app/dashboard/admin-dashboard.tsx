"use client";

import AttendanceOverview from "@/components/features/dashboard/admin/attendance-overview";
import CourseDistribution from "@/components/features/dashboard/admin/course-distribution";
import CoursePerformance from "@/components/features/dashboard/admin/course-performance";
import DashboardHeader from "@/components/features/dashboard/admin/dashboard-header";
import EventOverview from "@/components/features/dashboard/admin/event-overview";
import EventTypesDistribution from "@/components/features/dashboard/admin/event-types-distribution";
import QuickStatsAction, {
    QuickActions,
} from "@/components/features/dashboard/admin/quick-stats-action";
import RecentEventPerformance from "@/components/features/dashboard/admin/recent-event-performance";
import StatsCard from "@/components/features/dashboard/admin/stats";
import TopUserPerformance from "@/components/features/dashboard/admin/top-user-performance";
import YearLEvelDistribution from "@/components/features/dashboard/admin/year-level-distribution";
import PageWrapper from "@/components/page-wrapper";

export default function AdminDashboard() {
    return (
        <div className="">
            <DashboardHeader />
            <PageWrapper className="gap-8">
                <StatsCard />
                <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                    <AttendanceOverview />
                    <EventOverview />
                </div>
                <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                    <CourseDistribution />
                    <YearLEvelDistribution />
                    <EventTypesDistribution />
                </div>
                <CoursePerformance />
                <div className="flex flex-col md:flex-row gap-8 md:gap-4">
                    <RecentEventPerformance />
                    <TopUserPerformance />
                </div>
            </PageWrapper>
        </div>
    );
}
