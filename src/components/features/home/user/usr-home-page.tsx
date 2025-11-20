import PageWrapper from "@/components/page-wrapper";
import UserHomeHeader from "./header";
import Stats from "./stats";
import RecentEvents from "./recent-events";
import RecentAttendance from "./recent-attendance";

export default function UserHomePage() {
    return (
        <div className="min-h-screen ">
            <UserHomeHeader />
            <PageWrapper className="gap-8">
                <Stats />
                <div className="w-full flex flex-col md:flex-row gap-8 md:gap-4">
                    <RecentEvents />
                    <div className="flex-1 flex flex-col gap-8 md:gap-4">
                        <RecentAttendance />
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}
