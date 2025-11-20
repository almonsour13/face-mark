"use client";

import { AdminAttendanceCard } from "@/components/card/attendance-card";
import UserAttendanceCard from "@/components/card/user-attendance-card";
import AttendanceFilter from "@/components/filter/attendance-filter";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import LoadMoreWrapper from "@/components/load-more-wrapper";
import PageWrapper from "@/components/page-wrapper";
import RoleSwitchRender from "@/components/role-switch-render";
import { AttendanceSkeleton } from "@/components/skeleton-loader";
import { useAttendance } from "@/hooks/query/attendance/use-attendance";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { useAttendanceStore } from "@/store/use-attendance-store";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();
    const { data, isLoading } = useAttendance({
        filters,
        nextCursor,
    });

    const {
        attendances,
        setAttendances,
        isAttendanceLoading,
        setIsAttendanceLoading,
        addMoreAttendance,
    } = useAttendanceStore();

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setAttendances([]);
        setHasMore(false);
        setIsAttendanceLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setAttendances]);

    useEffect(() => {
        if (!data?.attendance) return;

        if (nextCursor === null) {
            setAttendances(data?.attendance);
            setIsAttendanceLoading(false);
        } else {
            addMoreAttendance(data?.attendance);
        }
        setHasMore(data.hasMore || false);
        setIsLoadingMore(false);
    }, [
        data,
        nextCursor,
        setAttendances,
        setIsAttendanceLoading,
        addMoreAttendance,
    ]);
    const handleLoadMore = () => {
        if (!data?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);

        setTimeout(() => {
            if (!data?.nextCursor) return;
            setNextCursor(data.nextCursor);
        }, 500);
    };

    return (
        <div className="w-full min-h-screen flex flex-col flex-1">
            <Header title="Attendance">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>Attendance</HeaderTitle>
                    </div>
                </div>
            </Header>
            <PageWrapper>
                <AttendanceFilter />
                {isAttendanceLoading ? (
                    <AttendanceSkeleton />
                ) : attendances && attendances.length > 0 ? (
                    <>
                        <LoadMoreWrapper
                            hasMore={hasMore}
                            isLoading={isLoadingMore}
                            loadMore={handleLoadMore}
                            loadingStateMessage="loading more attendance..."
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 flex-col">
                                {attendances.map((attendance, index) => (
                                    <RoleSwitchRender
                                        render={{
                                            admin: (
                                                <AdminAttendanceCard
                                                    attendance={attendance}
                                                />
                                            ),
                                            user: (
                                                <UserAttendanceCard
                                                    attendance={attendance}
                                                />
                                            ),
                                        }}
                                        fallback={<p>No access</p>}
                                    />
                                ))}
                            </div>
                        </LoadMoreWrapper>
                    </>
                ) : (
                    <div className="">no attendance</div>
                )}
            </PageWrapper>
        </div>
    );
}
