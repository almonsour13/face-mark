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

interface CourseSheetProps {
    children?: React.ReactNode;
    courseStats?: {
        courseId: string;
        name: string;
        code: string;
        totalStudents: number;
    }[];
    refetch?: () => void;
}
export default function CourseSheet({
    children,
    courseStats,
    refetch,
}: CourseSheetProps) {
    const [open, setOpen] = useState(false);
    const totalStudents =
        courseStats?.reduce((total, item) => total + item.totalStudents, 0) ||
        0;

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
                {courseStats &&
                    courseStats.map((item, index) => {
                        const percentage = (
                            (item.totalStudents / totalStudents) *
                            100
                        ).toFixed(1);
                        return (
                            <Card key={index} className="flex-row  items-center ">
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between text-sm font-light">
                                        <span className="text-muted-foreground">
                                            {item.name} ({item.code})
                                        </span>
                                        <span className="text-foreground">
                                            {item.totalStudents} ({percentage}%)
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
                                            href={`/user?course=${item.name}`}
                                        >
                                            <DropdownMenuItem>
                                                View Students
                                            </DropdownMenuItem>
                                        </Link>
                                        <CourseDialog
                                            type="edit"
                                            initialData={{
                                                id: item.courseId,
                                                name: item.name,
                                                code: item.code,
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
                            </Card>
                        );
                    })}
            </div>
            <div className="bg-background p-4 sticky bottom-0">
                <CourseDialog refetch={refetch}>
                    <Button className="w-full border-t">Add New Course</Button>
                </CourseDialog>
            </div>
        </SheetWrapper>
    );
}
