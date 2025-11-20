import Link from "next/link";
import { Button } from "../ui/button";
import { SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet";
import SheetWrapper from "./sheet-wrapper";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CourseDialog from "../dialog/course-dialog";
import { MoreVertical } from "lucide-react";
import { useState } from "react";
import { Card } from "../ui/card";
import EventTypeDialog from "../dialog/event-type-dialog";

interface EventTypeSheetProps {
    children?: React.ReactNode;
    eventStats: {
        eventTypeId: string;
        name: string;
        totalEvents: number;
    }[];
    refetch?: () => void;
}
export default function EventTypeSheet({
    children,
    eventStats,
    refetch,
}: EventTypeSheetProps) {
    const [open, setOpen] = useState(false);
    const totalEvents = eventStats.reduce(
        (total, item) => total + item.totalEvents,
        0
    );

    return (
        <SheetWrapper
            open={open}
            onOpenChange={setOpen}
            triggerButton={children ? children : <Button>Expand Course</Button>}
        >
            <div className="flex p-4 sticky top-0 bg-background">
                <h2 className="text-xl font-light">Course Stats</h2>
            </div>
            <div className="grid gap-2 p-4">
                {eventStats &&
                    eventStats.map((item, index) => {
                        const percentage = (
                            (item.totalEvents / totalEvents) *
                            100
                        ).toFixed(1);
                        return (
                            <Card
                                key={index}
                                className="flex-row  items-center "
                            >
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <span className="text-muted-foreground">
                                            {item.name}
                                        </span>
                                        <span className="text-foreground">
                                            {item.totalEvents} ({percentage}%)
                                        </span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary transition-all duration-500"
                                            style={{
                                                width: `${percentage}%`,
                                            }}
                                        />
                                    </div>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Button
                                            variant="outline"
                                            size="icon-sm"
                                        >
                                            <MoreVertical />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {/* view student */}
                                        <Link
                                            href={`/event?type=${item.name}`}
                                        >
                                            <DropdownMenuItem>
                                                View Event
                                            </DropdownMenuItem>
                                        </Link>
                                        <EventTypeDialog
                                            type="edit"
                                            initialData={{
                                                id: item.eventTypeId,
                                                name: item.name,
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
                            </Card>
                        );
                    })}
            </div>
            <div className="bg-background p-4 sticky bottom-0">
                <EventTypeDialog refetch={refetch}>
                    <Button className="w-full border-t">Add New Event Type</Button>
                </EventTypeDialog>
            </div>
        </SheetWrapper>
    );
}
