import { useUserAttendanceStore } from "@/store/use-user-attendance-store";
import { Calendar } from "lucide-react";
import UserAttendanceCard from "../../card/user-attendance-card";
import { UserAttendanceSkeleton } from "../../skeleton-loader";
import LoadMoreWrapper from "../../load-more-wrapper";
import { useUserAttendances } from "@/hooks/query/user/use-user-attendances";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import UserAttendancesFilter from "@/components/filter/user-attendances-filter";
import { useUrlFilter } from "@/hooks/use-url-filters";

export default function UserAttendancesDisplay() {
    const userId = useParams().userId as string;
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();

    const { data: userAttendancesData, isPending } = useUserAttendances({
        userId,
        filters,
        nextCursor,
    });

    const {
        userAttendances,
        setUserAttendances,
        isUserAttendanceLoading,
        setUserAttendanceLoading,
        addMoreUserAttendances,
    } = useUserAttendanceStore();

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setUserAttendances([]);
        setHasMore(false);
        setUserAttendanceLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setUserAttendances]);

    useEffect(() => {
        if (!userAttendancesData?.userAttendances) return;

        if (nextCursor === null) {
            setUserAttendances(userAttendancesData.userAttendances);
            setUserAttendanceLoading(false);
        } else {
            addMoreUserAttendances(userAttendancesData?.userAttendances);
        }
        setHasMore(userAttendancesData.hasMore || false);
        setIsLoadingMore(false);
    }, [
        userAttendancesData,
        nextCursor,
        setUserAttendances,
        setUserAttendanceLoading,
        addMoreUserAttendances,
    ]);

    const handleLoadMore = () => {
        if (
            !userAttendancesData?.hasMore ||
            isLoadingMore
        ) {
            return;
        }
        setIsLoadingMore(true);
        setTimeout(() => {
            if(!userAttendancesData?.nextCursor) return;
            setNextCursor(userAttendancesData.nextCursor);
        }, 500)
    };

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-light">Attendance Records</h2>
                <UserAttendancesFilter />
            </div>
            {isUserAttendanceLoading ? (
                <UserAttendanceSkeleton />
            ) : userAttendances && userAttendances.length > 0 ? (
                <LoadMoreWrapper
                    hasMore={hasMore}
                    isLoading={isLoadingMore}
                    loadMore={handleLoadMore}
                    loadingStateMessage="loading more user attendance..."
                >
                    <div className="flex flex-col gap-2">
                        {userAttendances.map((attendance) => (
                            <UserAttendanceCard
                                key={attendance.id}
                                attendance={attendance}
                            />
                        ))}
                    </div>
                </LoadMoreWrapper>
            ) : (
                <div className="flex flex-col items-center justify-center py-16 border border-dashed border-border/30 rounded-lg">
                    <div className="h-16 w-16 rounded-full border-2 border-dashed border-border/30 flex items-center justify-center mb-4">
                        <Calendar className="h-8 w-8 text-muted-foreground/20" />
                    </div>
                    <h3 className="text-lg font-light mb-2">
                        No Attendance Yet
                    </h3>
                    <p className="text-sm text-muted-foreground font-light">
                        This user hasn't attended any events yet.
                    </p>
                </div>
            )}
        </div>
    );
}
