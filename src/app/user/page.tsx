"use client";

import { useUsers } from "@/hooks/query/user/use-users";
import { userUserStore } from "@/store/use-user-store";
import { useEffect, useMemo, useState } from "react";

import UserCard from "@/components/card/user-card";
import UserFilter from "@/components/filter/user-filter";
import { SidebarTriggerButton } from "@/components/layout/app-side-bar";
import Header from "@/components/layout/nav-header";
import HeaderTitle from "@/components/layout/nav-header-title";
import LoadMoreWrapper from "@/components/load-more-wrapper";
import PageWrapper from "@/components/page-wrapper";
import { UsersCardSkeleton } from "@/components/skeleton-loader";
import { useUrlFilter } from "@/hooks/use-url-filters";

export default function Page() {
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { filters } = useUrlFilter();

    const { data: userData } = useUsers({ filters, nextCursor });
    const { users, setUsers, addMoreUsers, isUsersLoading, setUsersLoading } =
        userUserStore();

    const filterKey = useMemo(() => JSON.stringify(filters), [filters]);

    useEffect(() => {
        setNextCursor(null);
        setUsers([]);
        setHasMore(false);
        setUsersLoading(true);
        setIsLoadingMore(false);
    }, [filterKey, setUsers]);

    useEffect(() => {
        if (!userData?.users) return;

        if (nextCursor === null) {
            setUsers(userData.users);
            setUsersLoading(false);
        } else {
            addMoreUsers(userData.users);
        }
        setHasMore(userData.hasMore || false);
        setIsLoadingMore(false);
    }, [userData, nextCursor, setUsers, setUsersLoading, addMoreUsers]);

    const handleLoadMore = () => {
        if (!userData?.hasMore || isLoadingMore) {
            return;
        }
        setIsLoadingMore(true);
        setTimeout(() => {
            if (!userData?.nextCursor) return;
            setNextCursor(userData.nextCursor);
        }, 500);
    };
    
    return (
        <div className="w-full flex flex-col h-screen">
            <Header title="User">
                <div className="w-full mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <SidebarTriggerButton />
                        <HeaderTitle>User</HeaderTitle>
                    </div>
                </div>
            </Header>
            <PageWrapper>
                <div className="flex flex-col-reverse md:flex-row gap-6">
                    <div className="flex-1 flex flex-col gap-4">
                        <UserFilter />
                        {isUsersLoading ? (
                            <UsersCardSkeleton />
                        ) : users && users.length > 0 ? (
                            <>
                                <LoadMoreWrapper
                                    hasMore={hasMore}
                                    isLoading={isLoadingMore}
                                    loadMore={handleLoadMore}
                                    loadingStateMessage="loading more users..."
                                >
                                    <div className="flex flex-col gap-2">
                                        {users.map((user) => (
                                            <UserCard
                                                key={user.id}
                                                user={user}
                                            />
                                        ))}
                                    </div>
                                </LoadMoreWrapper>
                            </>
                        ) : (
                            <div className="text-center text-muted-foreground py-12 font-light">
                                <p className="text-sm">No users found.</p>
                            </div>
                        )}
                    </div>
                </div>
            </PageWrapper>
        </div>
    );
}
