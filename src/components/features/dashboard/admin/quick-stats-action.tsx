import AddCourseDialog from "@/components/dialog/add-course-dialog";
import AddEventTypeDialog from "@/components/dialog/add-event-type";
import AddLevelDialog from "@/components/dialog/add-level-dialog";
import CreateEventDialog from "@/components/dialog/create-event-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCoursesStore } from "@/store/use-couse-store";
import { useEventTypesStore } from "@/store/use-event-types-store";
import { useLevelStore } from "@/store/use-level-store";
import {
    BookOpen,
    Layers,
    Tag,
    Calendar,
    ArrowRight,
    Plus,
} from "lucide-react";

export default function QuickStatsAction() {
    const { levels } = useLevelStore();
    const { courses } = useCoursesStore();
    const { eventTypes } = useEventTypesStore();

    const quickStats = [
        {
            name: "Courses",
            value: courses.length,
        },
        {
            name: "Levels | Year",
            value: levels.length,
        },
        {
            name: "Event Types",
            value: eventTypes.length,
        },
    ];

    const quickActions = [
        {
            component: AddCourseDialog,
            title: "Add Course",
            description: "Create new course",
            icon: BookOpen,
            color: "from-blue-500/10 to-cyan-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
            component: AddLevelDialog,
            title: "Add Level",
            description: "Create new level",
            icon: Layers,
            color: "from-purple-500/10 to-pink-500/10",
            iconColor: "text-purple-600 dark:text-purple-400",
        },
        {
            component: AddEventTypeDialog,
            title: "Add Event Type",
            description: "Create event category",
            icon: Tag,
            color: "from-green-500/10 to-emerald-500/10",
            iconColor: "text-green-600 dark:text-green-400",
        },
        {
            component: CreateEventDialog,
            title: "Add Event",
            description: "Schedule new event",
            icon: Calendar,
            color: "from-orange-500/10 to-yellow-500/10",
            iconColor: "text-orange-600 dark:text-orange-400",
        },
    ];

    return (
        <div className="flex-1 flex flex-col md:flex-row gap-4">
            {/* Quick Stats */}
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Quick Stats</h2>
                <Card className="flex-1 grid grid-cols-3 md:grid-cols-1 gap-2 ">
                    {quickStats.map((stat) => (
                        <div className="flex items-center justify-between p-3 border rounded-md">
                            <span className="text-sm  font-light text-muted-foreground">
                                {stat.name}
                            </span>
                            <span className="text-lg font-light text-foreground">
                                {stat.value}
                            </span>
                        </div>
                    ))}
                </Card>
            </div>

            {/* Quick Actions */}
            <div className="flex-1 flex flex-col gap-2">
                <h2 className="text-xl font-light">Quick Actions</h2>
                <div className="flex-1 grid grid-cols-2 gap-2   ">
                    {quickActions.map((action, index) => {
                        const DialogComponent = action.component;
                        const Icon = action.icon;

                        return (
                            <DialogComponent key={index}>
                                <Card className="flex-row md:flex-col items-center md:items-start justify-center  cursor-pointer group">
                                    <div
                                        className={`h-12 w-12 relative rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon
                                            className={`h-6 w-6 ${action.iconColor}`}
                                        />
                                        <div
                                            className={`absolute -bottom-2 -right-2 h-5 w-5 flex items-center justify-center rounded-full  bg-gradient-to-b ${action.color}`}
                                        >
                                            <Plus
                                                className={`h-3.5 w-3.5 text-center ${action.iconColor}`}
                                            />
                                        </div>
                                    </div>
                                    <h3 className="text-base text-wrap font-light text-foreground">
                                        {action.title}
                                    </h3>
                                </Card>
                            </DialogComponent>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
