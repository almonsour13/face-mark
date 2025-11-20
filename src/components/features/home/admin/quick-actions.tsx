"use client";

import AddLevelDialog from "@/components/dialog/add-level-dialog";
import CourseDialog from "@/components/dialog/course-dialog";
import CreateEventDialog from "@/components/dialog/create-event-dialog";
import EventTypeDialog from "@/components/dialog/event-type-dialog";

import { BookOpen, Calendar, Layers, Tag } from "lucide-react";

export default function QuickActions() {
    const quickActions = [
        {
            component: CourseDialog,
            title: "Add Course",
            description: "Create new course",
            icon: BookOpen,
            color: "bg-orange-500/10 border-orange-500/20 hover:bg-orange-500/20",
        },
        {
            component: AddLevelDialog,
            title: "Add Level",
            description: "Create new level",
            icon: Layers,
            color: "bg-purple-500/10 border-purple-500/20 hover:bg-purple-500/20",
        },
        {
            component: EventTypeDialog,
            title: "Add Event Type",
            description: "Create event category",
            icon: Tag,
            color: "bg-green-500/10 border-green-500/20 hover:bg-green-500/20",
        },
        {
            component: CreateEventDialog,
            title: "Add Event",
            description: "Schedule new event",
            icon: Calendar,
            color: "bg-blue-500/10 border-blue-500/20 hover:bg-blue-500/20",
        },
    ];
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-light">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2">
                {quickActions.map((action, index) => {
                    const DialogComponent = action.component;

                    return (
                        <DialogComponent key={index}>
                            <button
                                className={`p-4 rounded-lg border transition-all text-left space-y-2 ${action.color}`}
                            >
                                <action.icon className="h-5 w-5" />
                                <p className="text-xs font-light">
                                    {action.title}
                                </p>
                            </button>
                        </DialogComponent>
                    );
                })}
            </div>
        </div>
    );
}
