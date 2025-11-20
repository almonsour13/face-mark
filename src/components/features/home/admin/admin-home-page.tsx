import PageWrapper from "@/components/page-wrapper";
import Stats from "@/components/features/home/admin/stats";
import RecentEvents from "@/components/features/home/admin/recent-events";
import QuickActions from "@/components/features/home/admin/quick-actions";
import RecentAttendance from "@/components/features/home/admin/recent-attendance";
import AdminHomeHeader from "@/components/features/home/admin/header";

export default function AdminHomePage() {
    return (
        <div className="min-h-screen ">
            <AdminHomeHeader />
            <PageWrapper className="gap-8">
                <Stats />
                <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
                    <RecentEvents />
                    <div className="flex-1 flex flex-col gap-8 md:gap-4">
                        <QuickActions />
                        <RecentAttendance />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}
