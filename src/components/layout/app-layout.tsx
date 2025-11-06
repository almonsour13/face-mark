"use client";

import { AppSidebarProvider } from "@/context/app-sidebar-context";
import AppSidebar from "./app-side-bar";
import ProtectedLayout from "./protected-layout";
import { useLevel } from "@/hooks/query/use-level";
import { useLevelStore } from "@/store/use-level-store";
import { useEffect } from "react";
import { useCourses } from "@/hooks/query/use-courses";
import { useCoursesStore } from "@/store/use-couse-store";
import { useEventTypes } from "@/hooks/query/event/use-event-type";
import { useEventTypesStore } from "@/store/use-event-types-store";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const { data: levelData, isLoading: isLevelLoading } = useLevel();
    const { setLevels } = useLevelStore();

    const { data: coursesData, isLoading: isCourseSLoading } = useCourses();
    const { setCourses } = useCoursesStore();

    const { data: eventTypesData, isLoading: isEventTypesLoading } =
        useEventTypes();
    const { setEventTypes } = useEventTypesStore();

    useEffect(() => {
        if (!levelData?.levels) return;
        setLevels(levelData.levels);
    }, [levelData, setLevels]);

    useEffect(() => {
        if (!coursesData?.courses) return;
        setCourses(coursesData.courses);
    }, [coursesData, setCourses]);

    useEffect(() => {
        if (!eventTypesData?.eventTypes) return;
        setEventTypes(eventTypesData.eventTypes);
    }, [eventTypesData, setEventTypes]);
    
    return (
        <ProtectedLayout>
            <AppSidebarProvider>
                <div className="flex h-full w-full">
                    <AppSidebar />
                    <div className="flex-1">{children}</div>
                </div>
            </AppSidebarProvider>
        </ProtectedLayout>
    );
}
