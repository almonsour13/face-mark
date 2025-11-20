"use client";

import {
    Empty,
    EmptyDescription,
    EmptyHeader,
    EmptyTitle,
} from "@/components/ui/empty";
import { useEventAttendance } from "@/hooks/query/event/use-event-attendace";
import { useUrlFilter } from "@/hooks/use-url-filters";
import { useEventAttendanceStore } from "@/store/use-event-attendace-store";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
    AdminEventAttendanceCard,
    UserEventAttendanceCard,
} from "../../card/event-attendance-card";
import AttendanceFilter from "../../filter/attendance-filter";
import LoadMoreWrapper from "../../load-more-wrapper";
import RoleSwitchRender from "../../role-switch-render";
import { EventAttendanceSkeleton } from "../../skeleton-loader";
import { EventAttendanceWrapper } from "@/components/event-attendance-wrapper";

export default function EventAttendanceList() {
    const { AttendanceWrapper, eventAttendance, isEventAttendanceLoading } =
        EventAttendanceWrapper();

    return (
        <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <h2 className="text-lg font-light">Attendance Records</h2>
                <AttendanceFilter />
            </div>

            {/* Table Content */}
            {isEventAttendanceLoading ? (
                <EventAttendanceSkeleton />
            ) : eventAttendance && eventAttendance.length > 0 ? (
                <AttendanceWrapper>
                    <div className="flex flex-col gap-2">
                        {eventAttendance.map((attendance, index) => (
                            <RoleSwitchRender
                                key={index}
                                render={{
                                    admin: (
                                        <AdminEventAttendanceCard
                                            attendance={attendance}
                                        />
                                    ),
                                    user: (
                                        <UserEventAttendanceCard
                                            attendance={attendance}
                                        />
                                    ),
                                }}
                                fallback={<p>No access</p>}
                            />
                        ))}
                    </div>
                </AttendanceWrapper>
            ) : (
                <Empty className="border border-dashed">
                    <EmptyHeader>
                        <EmptyTitle>No Attendance Yet</EmptyTitle>
                        <EmptyDescription>
                            Event doesn&apos;t have any attendance yet.
                        </EmptyDescription>
                    </EmptyHeader>
                </Empty>
            )}
        </div>
    );
}
