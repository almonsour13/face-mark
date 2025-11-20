import CourseDialog from "@/components/dialog/course-dialog";
import EventTypeDialog from "@/components/dialog/event-type-dialog";
import AddLevelDialog from "@/components/dialog/add-level-dialog";
import CreateEventDialog from "@/components/dialog/create-event-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCoursesStore } from "@/store/use-course-store";
import { useEventTypesStore } from "@/store/use-event-types-store";
import { useLevelStore } from "@/store/use-level-store";
import {
    BookOpen,
    Layers,
    Tag,
    Calendar,
    ArrowRight,
    Plus,
    MoreVertical,
    AlertCircle,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LevelDialog from "@/components/dialog/add-level-dialog";
import { levelsValue } from "@/constant";

export default function QuickStatsAction() {
    return (
        <div className="flex-1 flex flex-col md:flex-row gap-4">
            <QuickStats />
            {/* <QuickActions /> */}
        </div>
    );
}
export const QuickStats = () => {
    const { levels } = useLevelStore();
    const { courses } = useCoursesStore();
    const { eventTypes } = useEventTypesStore();
    return (
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-xl font-light">Quick Stats</h2>
            <Card className="flex-1 grid grid-cols-3 md:grid-cols-1 gap-2 ">
                <Popover>
                    <PopoverTrigger
                        className="h-full"
                        aria-label="View courses"
                    >
                        <div className="h-full flex flex-col cursor-pointer justify-center px-3 gap-2 border rounded-md">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-muted-foreground">
                                    Course
                                </span>
                                <span className="text-lg font-light text-foreground">
                                    {courses.length}
                                </span>
                            </div>
                            <span className="text-xs text-left md:text-right font-light text-muted-foreground">
                                Click to view
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-2">
                        <h1>Courses:</h1>
                        <ScrollArea className="flex flex-col max-h-64 overflow-auto">
                            {courses.length > 0 ? (
                                courses.map((course) => (
                                    <div
                                        key={course.id}
                                        className="flex items-center justify-between p-2 border rounded-md mb-2"
                                    >
                                        <span className="text-sm font-light text-muted-foreground">
                                            {course.name}
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon-sm"
                                                    aria-label={`Actions for ${course.name}`}
                                                >
                                                    <MoreVertical aria-hidden="true" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <CourseDialog
                                                    type="edit"
                                                    initialData={{
                                                        id: course.id,
                                                        name: course.name,
                                                        code: course.code,
                                                    }}
                                                >
                                                    <DropdownMenuItem
                                                        onSelect={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                </CourseDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                    <p className="text-sm text-muted-foreground font-light">
                                        No courses available
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger className="h-full" aria-label="View levels">
                        <div className="h-full flex flex-col cursor-pointer justify-center px-3 gap-2 border rounded-md">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-muted-foreground">
                                    Levels | Year
                                </span>
                                <span className="text-lg font-light text-foreground">
                                    {levels.length}
                                </span>
                            </div>
                            <span className="text-xs text-left md:text-right font-light text-muted-foreground">
                                Click to view
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-2">
                        <h1>Levels | Year:</h1>
                        <ScrollArea className="flex flex-col max-h-64 overflow-auto">
                            {levels.length > 0 ? (
                                levels.map((level) => (
                                    <div
                                        key={level.id}
                                        className="flex items-center justify-between p-2 border rounded-md mb-2"
                                    >
                                        <span className="text-sm font-light text-muted-foreground">
                                            {levelsValue[level.name]}
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon-sm"
                                                    aria-label={`Actions for ${
                                                        levelsValue[level.name]
                                                    }`}
                                                >
                                                    <MoreVertical aria-hidden="true" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <LevelDialog
                                                    type="edit"
                                                    initialData={{
                                                        id: level.id,
                                                        name: level.name,
                                                    }}
                                                >
                                                    <DropdownMenuItem
                                                        onSelect={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                </LevelDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                    <p className="text-sm text-muted-foreground font-light">
                                        No levels available
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger
                        className="h-full"
                        aria-label="View event types"
                    >
                        <div className="h-full flex flex-col cursor-pointer justify-center px-3 py-2 gap-2 border rounded-md">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-light text-muted-foreground">
                                    Event Types
                                </span>
                                <span className="text-lg font-light text-foreground">
                                    {eventTypes.length}
                                </span>
                            </div>
                            <span className="text-xs text-left md:text-right font-light text-muted-foreground">
                                Click to view
                            </span>
                        </div>
                    </PopoverTrigger>
                    <PopoverContent className="space-y-2">
                        <h1>Event Types</h1>
                        <ScrollArea className="flex flex-col max-h-64 overflow-auto">
                            {eventTypes.length > 0 ? (
                                eventTypes.map((type) => (
                                    <div
                                        key={type.id}
                                        className="flex items-center justify-between p-2 border rounded-md mb-2"
                                    >
                                        <span className="text-sm font-light text-muted-foreground">
                                            {type.name}
                                        </span>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    size="icon-sm"
                                                    aria-label={`Actions for ${type.name}`}
                                                >
                                                    <MoreVertical aria-hidden="true" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <EventTypeDialog
                                                    type="edit"
                                                    initialData={{
                                                        id: type.id,
                                                        name: type.name,
                                                    }}
                                                >
                                                    <DropdownMenuItem
                                                        onSelect={(e) =>
                                                            e.preventDefault()
                                                        }
                                                    >
                                                        Edit
                                                    </DropdownMenuItem>
                                                </EventTypeDialog>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                ))
                            ) : (
                                <div className="flex flex-col items-center justify-center py-8 text-center">
                                    <AlertCircle className="h-8 w-8 text-muted-foreground/50 mb-2" />
                                    <p className="text-sm text-muted-foreground font-light">
                                        No event types available
                                    </p>
                                </div>
                            )}
                        </ScrollArea>
                    </PopoverContent>
                </Popover>
            </Card>
        </div>
    );
};
export const QuickActions = () => {
    const quickActions = [
        {
            component: CourseDialog,
            title: "Add Course",
            description: "Create new course",
            icon: BookOpen,
            color: "from-blue-500/10 to-cyan-500/10",
            iconColor: "text-blue-600 dark:text-blue-400",
            type: "add",
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
            component: EventTypeDialog,
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
        <div className="flex-1 flex flex-col gap-2">
            <h2 className="text-lg font-light">Quick Actions</h2>
            <div className="flex-1 grid grid-cols-2 gap-2   ">
                {quickActions.map((action, index) => {
                    const DialogComponent = action.component;
                    const Icon = action.icon;

                    return (
                        <DialogComponent key={index}>
                            <Card className="flex-col justify-center  cursor-pointer group">
                                <div className="flex  gap-4">
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
                                    <div className="">
                                        <h3 className="text-lg text-wrap font-light text-foreground">
                                            {action.title}
                                        </h3>{" "}
                                        <p className="text-xs text-muted-foreground font-light">
                                            {action.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs font-light text-muted-foreground group-hover:text-foreground transition-colors group-hover:gap-3">
                                    <span>Configure</span>
                                    <ArrowRight className="h-3 w-3" />
                                </div>
                            </Card>
                        </DialogComponent>
                    );
                })}
            </div>
        </div>
    );
};
